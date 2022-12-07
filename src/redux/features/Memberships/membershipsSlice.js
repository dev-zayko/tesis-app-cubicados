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
export const getDays = createAsyncThunk(
  'membership/days',
  async ({token}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('membership/days', {}, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const {restDays} = response.data;
      if (restDays <= 0) {
        return {data: 0};
      } else {
        return {data: restDays};
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
)
const membershipsSlice = createSlice({
  name: 'memberships',
  initialState: {
    memberships: 0,
    dayRest: '',
    loading: 0,
    loadingDays: false
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
      }),
      builder.addCase(getDays.pending, (state, action) => {
        state.loadingDays = true;
      }),
      builder.addCase(getDays.fulfilled, (state, action) => {
        state.loadingDays = false;
        state.dayRest = action.payload.data;
      }),
      builder.addCase(getDays.rejected, (state, action) => {
        state.loadingDays = false;
      })
  }
})

export default membershipsSlice.reducer 
