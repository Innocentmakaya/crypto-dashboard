import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchTopCoins } from '../../api/coinGecko';
import type { Coin, Currency } from '../../types/crypto';

interface CryptoState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  currency: Currency;
  lastFetched: number | null;
}

const initialState: CryptoState = {
  coins: [],
  loading: false,
  error: null,
  currency: 'zar',
  lastFetched: null,
};

const CACHE_DURATION = 300_000; // 5 minute cache

export const loadTopCoins = createAsyncThunk(
  'crypto/loadTopCoins',
  async ({ currency }: { currency: Currency }, { getState, rejectWithValue }) => {
    const state = getState() as { crypto: CryptoState };
    const { lastFetched, currency: cachedCurrency } = state.crypto;
    const isCacheValid =
      lastFetched &&
      Date.now() - lastFetched < CACHE_DURATION &&
      cachedCurrency === currency;

    if (isCacheValid) return null; // use cached data

    try {
      return await fetchTopCoins(currency);
    } catch {
      return rejectWithValue('Failed to fetch coins. Please try again.');
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
      state.lastFetched = null; // invalidate cache on currency change
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTopCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTopCoins.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.coins = action.payload;
          state.lastFetched = Date.now();
        }
      })
      .addCase(loadTopCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrency } = cryptoSlice.actions;
export default cryptoSlice.reducer;