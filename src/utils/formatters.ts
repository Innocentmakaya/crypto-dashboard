import type { Currency } from '../types/crypto';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  zar: 'R',
  usd: '$',
  btc: '₿',
};

export const formatPrice = (price: number, currency: Currency): string => {
  const symbol = CURRENCY_SYMBOLS[currency];

  if (currency === 'btc') {
    return `${symbol}${price.toFixed(8)}`;
  }

  return `${symbol}${price.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatMarketCap = (value: number, currency: Currency): string => {
  const symbol = CURRENCY_SYMBOLS[currency];

  if (value >= 1_000_000_000_000) {
    return `${symbol}${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `${symbol}${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${symbol}${(value / 1_000_000).toFixed(2)}M`;
  }
  return `${symbol}${value.toLocaleString('en-ZA')}`;
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatSupply = (value: number | null): string => {
  if (value === null) return '∞';
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  return value.toLocaleString('en-ZA');
};