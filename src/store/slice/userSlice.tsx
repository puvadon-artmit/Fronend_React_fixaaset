import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchCars = createAsyncThunk('user/fetchCars', async () => {
  const token = Cookies.get('token');

  if (token) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/auth/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { username, user_id } = response.data.result;
        return { username, user_id };
      } else {
        console.error('Failed to fetch user profile:', response.data);
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error during fetchUserProfile:', error);
      throw error;
    }
  } else {
    console.error('Token not found');
    throw new Error('Token not found');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: { username: null, user_id: null },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.userData = action.payload; 
    });

    builder.addCase(fetchCars.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const selectuserData = (state:any) => state.user.userData;
export const selectStatus = (state:any) => state.user.status;
export const selectError = (state:any) => state.user.error;

export default userSlice.reducer;
