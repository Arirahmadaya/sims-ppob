import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async thunk untuk memuat saldo
export const fetchBalance = createAsyncThunk('balance/fetchBalance', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await api.get('/balance', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.balance;
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    amount: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.amount = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default balanceSlice.reducer;
