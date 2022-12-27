import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const createPaidMemberships = createAsyncThunk(
  'paidMemberships/create',
  async (
    {idMembership, netoAmount, buyOrder, sessionId, token, tokenDevice},
    {rejectWithValue},
  ) => {
    try {
      const response = await ApiClient.post(
        'membership/paid/store',
        {
          idMembership: idMembership,
          netoAmount: netoAmount,
          buyOrder: buyOrder,
          sessionId: sessionId,
          tokenDevice: tokenDevice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getPaidMemberships = createAsyncThunk(
  'paidMemberships/get',
  async ({token}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'membership/paid/all',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const {status, data} = response.data;
      if (status !== 'empty') {
        return {data: data, status: status};
      } else {
        return {data: 0, status: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

const paidMembershipsSlice = createSlice({
  name: 'paidMemberships',
  initialState: {
    paidMemberships: 0,
    loading: 0,
    status: '',
  },
  extraReducers: builder => {
    builder.addCase(createPaidMemberships.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(createPaidMemberships.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(createPaidMemberships.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(getPaidMemberships.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getPaidMemberships.fulfilled, (state, action) => {
        state.loading = false;
        state.paidMemberships = action.payload.data;
        state.status = action.payload.status;
      }),
      builder.addCase(getPaidMemberships.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default paidMembershipsSlice.reducer;
