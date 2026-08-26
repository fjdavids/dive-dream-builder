// Prerender: renders the built home page in headless Chrome and writes the
// fully rendered HTML back to dist/index.html so crawlers see real content
// (H1, H2, paragraphs, internal links, canonical) before any JS runs.
//
// Runs automatically via the "postbuild" npm script. The build FAILS if the
// prerendered HTML is missing the required content.

import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import puppeteer from "puppeteer";

const DIST = resolve("dist");
const PORT = 4319;
const ROUTE = "/";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};

function serve(file, res) {
  readFile(file)
    .then((buf) => {
      res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
      res.end(buf);
    })
    .catch(() => {
      res.writeHead(500);
      res.end("read error");
    });
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let file = normalize(join(DIST, urlPath));
  if (!file.startsWith(DIST)) {
    res.writeHead(403);
    res.end();
    return;
  }
  if (existsSync(file) && statSync(file).isFile()) return serve(file, res);
  // SPA fallback
  serve(join(DIST, "index.html"), res);
});

function fail(msg) {
  console.error(`\nPRERENDER FAILED: ${msg}\n`);
  process.exitCode = 1;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    fail("dist/index.html does not exist. Run `vite build` first.");
    return;
  }

  await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
  console.log(`[prerender] static server on http://127.0.0.1:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1800 });

    // Only allow requests to the local server — external SDKs/fonts are
    // irrelevant for prerendering and can hang the render.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (url.startsWith(`http://127.0.0.1:${PORT}`) || url.startsWith("data:")) {
        req.continue();
      } else {
        req.abort();
      }
    });

    page.on("pageerror", (err) => console.warn("[prerender] page error:", err.message));

    await page.goto(`http://127.0.0.1:${PORT}${ROUTE}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Wait until React has mounted real content, then let Helmet settle.
    await page.waitForSelector("h1", { timeout: 30000 });
    await page.waitForSelector('a[href^="/"]', { timeout: 30000 });
    await sleep(1500);

    let html = await page.content();
    if (!/^<!doctype html>/i.test(html)) html = `<!doctype html>\n${html}`;

    // ---- Validation: build must fail if the home content is missing ----
    const visibleText = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ");
    const words = visibleText.split(/\s+/).filter(Boolean).length;
    const sizeKb = Buffer.byteLength(html, "utf8") / 1024;
    const internalLinks = (html.match(/href="\/[^"]*"/g) || []).length;

    const problems = [];
    if (!/<h1[\s>]/i.test(html)) problems.push("no <h1> found");
    if (!/<h2[\s>]/i.test(html)) problems.push("no <h2> found");
    if (!/rel="canonical"[^>]*href="https:\/\/divelife\.mx\/"/i.test(html))
      problems.push('canonical <link rel="canonical" href="https://divelife.mx/"> missing');
    if (!/<p[\s>]/i.test(html)) problems.push("no <p> paragraphs found");
    if (internalLinks < 5) problems.push(`only ${internalLinks} internal links (need >= 5)`);
    if (words < 200) problems.push(`only ${words} words in HTML (need >= 200)`);
    if (sizeKb < 8) problems.push(`HTML is only ${sizeKb.toFixed(2)} kB (empty Vite shell)`);
    if (/<div id="root">\s*<\/div>/.test(html)) problems.push("#root is still empty");

    console.log(`[prerender] size: ${sizeKb.toFixed(2)} kB, words: ${words}, internal links: ${internalLinks}`);

    if (problems.length > 0) {
      for (const p of problems) console.error(`[prerender] FAIL: ${p}`);
      fail("prerendered HTML did not pass content validation");
      return;
    }

    await writeFile(join(DIST, "index.html"), html, "utf8");
    console.log("[prerender] dist/index.html written with fully rendered home page");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("[prerender] unexpected error:", err);
  process.exitCode = 1;
  server.close();
});
