export type PayPalParams = {
  business: string;      // seller email
  item_name: string;     // service title
  amount: number;        // MXN
  currency_code?: 'MXN';
  quantity?: number;     // default 1
  custom?: string;       // service slug | locale
  return_url?: string;   // /thank-you
  cancel_url?: string;   // /payment-canceled
};

export function buildPayPalLink(p: PayPalParams) {
  const base = 'https://www.paypal.com/cgi-bin/webscr';
  const q = new URLSearchParams({
    cmd: '_xclick',
    business: p.business,
    item_name: p.item_name,
    amount: p.amount.toFixed(2),
    currency_code: p.currency_code ?? 'MXN',
    quantity: String(p.quantity ?? 1),
    no_shipping: '1',
    rm: '2',
    charset: 'utf-8',
    return: p.return_url ?? window.location.origin + '/thank-you',
    cancel_return: p.cancel_url ?? window.location.origin + '/payment-canceled',
    custom: p.custom ?? ''
  });
  return `${base}?${q.toString()}`;
}
