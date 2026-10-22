import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import NoticeBar from "./components/NoticeBar";
import { lazy, Suspense, useEffect } from "react";
import Home from "./pages/Home";

// Home stays in the main bundle (prerendered landing page, LCP).
// Every other page is split into its own chunk and fetched on navigation.
const loadExperiences = () => import("./pages/Experiences");
const loadExperienceDetail = () => import("./pages/ExperienceDetail");
const loadAvailability = () => import("./pages/Availability");

const Experiences = lazy(loadExperiences);
const ExperienceDetail = lazy(loadExperienceDetail);
const Availability = lazy(loadAvailability);
const Location = lazy(() => import("./pages/Location"));
const About = lazy(() => import("./pages/About"));
const FAQs = lazy(() => import("./pages/FAQs"));
const CancellationPolicy = lazy(() => import("./pages/CancellationPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const PaymentCanceled = lazy(() => import("./pages/PaymentCanceled"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RequestReceived = lazy(() => import("./pages/RequestReceived"));

// Warm the chunks behind the main booking CTAs ("Explore Experiences",
// "Check Availability") on the visitor's first interaction, or after a
// generous delay, so they open instantly without competing with first paint.
function PrefetchKeyRoutes() {
  useEffect(() => {
    let done = false;
    const events = ["pointerdown", "touchstart", "scroll", "keydown", "mouseover"] as const;
    const run = () => {
      if (done) return;
      done = true;
      events.forEach((e) => window.removeEventListener(e, run));
      clearTimeout(timer);
      loadExperiences();
      loadExperienceDetail();
      loadAvailability();
    };
    events.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
    const timer = window.setTimeout(run, 8000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, run));
      clearTimeout(timer);
    };
  }, []);
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <NoticeBar />
            <Header />
            <main className="flex-1">
              <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/experiences/:slug" element={<ExperienceDetail />} />
                <Route path="/availability" element={<Availability />} />
                <Route path="/request-received" element={<RequestReceived />} />
                <Route path="/location" element={<Location />} />
                <Route path="/about" element={<About />} />
                <Route path="/about-safety" element={<About />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/cancellation-policy" element={<CancellationPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/payment-canceled" element={<PaymentCanceled />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </main>
            <Footer />
            <WhatsAppButton />
            <PrefetchKeyRoutes />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
