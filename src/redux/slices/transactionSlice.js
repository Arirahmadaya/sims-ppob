import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async thunk untuk memuat riwayat transaksi
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async ({ offset = 0, limit = 5 }, { getState }) => {
    const token = getState().auth.token;
    const response = await api.get(`/transaction/history?offset=${offset}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.records;
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    records: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.records = [...state.records, ...action.payload];
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
