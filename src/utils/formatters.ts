import { CURRENCY_RATES } from '../data/mockData';
import { CurrencyCode } from '../types';

export function formatCurrency(amountUsd: number, currencyCode: CurrencyCode = 'USD'): string {
  const currency = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.USD;
  const converted = amountUsd * currency.rate;

  if (currencyCode === 'JPY') {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${currency.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function generateWhatsAppTradeLink(details: {
  division: string;
  item?: string;
  country?: string;
  incoterm?: string;
  notes?: string;
}): string {
  const text = encodeURIComponent(
    `Hello KS Associates Trade Desk,\n\nI am contacting you regarding your ${details.division}.\n` +
    (details.item ? `Inquiry Item: ${details.item}\n` : '') +
    (details.country ? `Destination Country: ${details.country}\n` : '') +
    (details.incoterm ? `Preferred Incoterm: ${details.incoterm}\n` : '') +
    (details.notes ? `Requirement Details: ${details.notes}\n` : '') +
    `\nPlease provide FOB/CIF quotation, standard packaging specifications, and lead time.`
  );
  // International format direct WhatsApp number
  return `https://wa.me/919840001234?text=${text}`;
}
