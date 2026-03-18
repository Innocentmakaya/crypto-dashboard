export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  atl: number;
}

export interface CoinDetail extends Coin {
  description: string;
  homepage: string;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
}

export interface HistoricalDataPoint {
  timestamp: number;
  price: number;
}

export type Currency = 'zar' | 'usd' | 'btc';

export type TimeRange = '1' | '7' | '30' | '365';