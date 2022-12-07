import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ApiClient from "../../../services/connection/ApiClient";

export const createPaidMemberships = createAsyncThunk(
  'paidMemberships/create',
  async ({idMembership, netoAmount, buyOrder, sessionId, token, tokenDevice}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('membership/paid/store', {
        idMembership: idMembership,
        netoAmount: netoAmount,
        buyOrder: buyOrder,
        sessionId: sessionId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          tokenDevice: tokenDevice
        }
      });
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const paidMembershipsSlice = createSlice({
  name: 'paidMemberships',
  initialState: {
    paidMemberships: 0,
    loading: 0,
  },
  extraReducers: builder => {
    builder.addCase(createPaidMemberships.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(createPaidMemberships.fulfilled, (state, action) => {
        state.loading = false;
        state.paidMemberships = action.payload.data;
      }),
      builder.addCase(createPaidMemberships.rejected, (state, action) => {
        state.loading = false;
      })
  }
});

export default paidMembershipsSlice.reducer;
