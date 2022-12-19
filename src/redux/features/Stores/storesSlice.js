import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ApiClient from "../../../services/connection/ApiClient";


export const getStores = createAsyncThunk(
  'stores/get',
  async ({rejectWithValue}) => {
    try {
      const response = await ApiClient.get('store/all');
      const {data, status} = response.data;
      if (status !== 'empty') {
        return {data: data};
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);
export const getPopularStores = createAsyncThunk(
  'stores/popular',
  async ({rejectWithValue}) => {
    try {
      const response = await ApiClient.post('store/popular', {}, {});
      const {data, status} = response.data;
      if (status === 'success') {
        return {data: data, status: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }


);

const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: 0,
    storeSelect: 0,
    loading: false,
    popularStores: 0,
    status: ''
  },
  reducers: {
    setStoreSelect: (state, action) => {
      state.storeSelect = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getStores.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload.data;
      }),
      builder.addCase(getStores.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(getPopularStores.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getPopularStores.fulfilled, (state, action) => {
        state.loading = false;
        state.popularStores = action.payload.data;
      }),
      builder.addCase(getPopularStores.rejected, (state, action) => {
        state.loading = false;
      })
  }
});
export const {setStoreSelect} = storesSlice.actions;
export default storesSlice.reducer;
