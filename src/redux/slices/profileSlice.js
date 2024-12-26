import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async thunk untuk memuat profil pengguna
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try {
    const response = await api.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Gagal memuat profil!');
  }
});

// Async thunk untuk memperbarui profil pengguna
export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  try {
    const response = await api.put('/profile/update', profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui profil!');
  }
});

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
