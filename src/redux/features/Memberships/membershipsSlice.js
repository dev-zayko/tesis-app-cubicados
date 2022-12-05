import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const getMemberships = createAsyncThunk(
  'membership/get',
  async ({rejectWithValue}) => {
    try {
      const response = await ApiClient.get('membership/all');
      const {data} = response.data;
      return {data: data}
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const membershipsSlice = createSlice({
  name: 'memberships',
  initialState: {
    memberships: 0,
    loading: 0,
  },
  extraReducers: builder => {
    builder.addCase(getMemberships.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getMemberships.fulfilled, (state, action) => {
        state.loading = false;
        state.memberships = action.payload.data;

      }),
      builder.addCase(getMemberships.rejected, (state, action) => {
        state.loading = false;
      })
  }
})

export default membershipsSlice.reducer 
