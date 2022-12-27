import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const createTransaction = createAsyncThunk(
  'webpay/create',
  async ({token, amount}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'webpay/create',
        {
          amount: amount,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {viewData} = response.data;
      return {data: viewData};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

const webpaySlice = createSlice({
  name: 'webpay',
  initialState: {
    viewData: 0,
    loadingTr: false,
  },
  extraReducers: builder => {
    builder.addCase(createTransaction.pending, (state, action) => {
      state.loadingTr = true;
    }),
      builder.addCase(createTransaction.fulfilled, (state, action) => {
        state.viewData = action.payload.data;
        state.loadingTr = false;
      }),
      builder.addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default webpaySlice.reducer;
