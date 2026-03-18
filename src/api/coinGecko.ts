import axios from 'axios';
import type { Coin, CoinDetail, HistoricalDataPoint, Currency, TimeRange } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY,
  },
});

export const fetchTopCoins = async (currency: Currency, page = 1, perPage = 10): Promise<Coin[]> => {
  const { data } = await api.get('/coins/markets', {
    params: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: false,
      price_change_percentage: '24h',
    },
  });
  return data;
};

export const fetchCoinDetail = async (id: string, currency: Currency): Promise<CoinDetail> => {
  const { data } = await api.get(`/coins/${id}`, {
    params: { localization: false, tickers: false, community_data: false },
  });

  return {
    id: data.id,
    symbol: data.symbol,
    name: data.name,
    image: data.image.large,
    current_price: data.market_data.current_price[currency],
    market_cap: data.market_data.market_cap[currency],
    market_cap_rank: data.market_cap_rank,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    total_volume: data.market_data.total_volume[currency],
    circulating_supply: data.market_data.circulating_supply,
    total_supply: data.market_data.total_supply,
    max_supply: data.market_data.max_supply,
    ath: data.market_data.ath[currency],
    atl: data.market_data.atl[currency],
    description: data.description.en,
    homepage: data.links.homepage[0],
    genesis_date: data.genesis_date,
    sentiment_votes_up_percentage: data.sentiment_votes_up_percentage,
    sentiment_votes_down_percentage: data.sentiment_votes_down_percentage,
  };
};

export const fetchHistoricalData = async (
  id: string,
  currency: Currency,
  days: TimeRange
): Promise<HistoricalDataPoint[]> => {
  const { data } = await api.get(`/coins/${id}/market_chart`, {
    params: { vs_currency: currency, days },
  });

  return data.prices.map(([timestamp, price]: [number, number]) => ({
    timestamp,
    price,
  }));
};