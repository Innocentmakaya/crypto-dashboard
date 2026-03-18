import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoinDetail } from '../../api/coinGecko';
import type { CoinDetail, Currency } from '../../types/crypto';

interface DetailState {
  coin: CoinDetail | null;
  loading: boolean;
  error: string | null;
  lastFetchedId: string | null;
}

const initialState: DetailState = {
  coin: null,
  loading: false,
  error: null,
  lastFetchedId: null,
};

export const loadCoinDetail = createAsyncThunk(
  'detail/loadCoinDetail',
  async (
    { id, currency }: { id: string; currency: Currency },
    { rejectWithValue }
  ) => {
    try {
      return await fetchCoinDetail(id, currency);
    } catch {
      return rejectWithValue('Failed to fetch coin details. Please try again.');
    }
  }
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCoinDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCoinDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.coin = action.payload;
        state.lastFetchedId = action.payload.id;
      })
      .addCase(loadCoinDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default detailSlice.reducer;