import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ApiClient from "../../../services/connection/ApiClient";


export const getStores = createAsyncThunk(
  'stores/get',
  async ({rejectedWithValue}) => {
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
      return rejectedWithValue(error.response.data);
    }
  },
);

const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: 0,
    storeSelect: 0,
    loading: false,
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
      })
  }
});
export const {setStoreSelect} = storesSlice.actions;
export default storesSlice.reducer;
