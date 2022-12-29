import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const getProducts = createAsyncThunk(
  'products/get',
  async (
    {token, storeName, typeProduct, region, commune},
    {rejectedWithValue},
  ) => {
    try {
      const response = await ApiClient.post(
        `scrap/${storeName.toLowerCase()}/product`,
        {
          typeProduct: typeProduct,
          region: region,
          local: commune,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {data, status} = response.data;
      console.log('Productos ', response.data);
      if (status !== 'empty') {
        return {data: data};
      } else {
        return {data: 0};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectedWithValue(error.response.data);
    }
  },
);

const quoterSlice = createSlice({
  name: 'products',
  initialState: {
    products: 0,
    productSelect: 0,
    typeProduct: 0,
    loading: false,
    status: '',
  },
  reducers: {
    resetListProducts: (state, action) => {
      state.loading = false;
      state.products = 0;
      state.status = '';
    },
    setTypeProduct: (state, action) => {
      state.typeProduct = action.payload;
    },
    setProductSelect: (state, action) => {
      state.productSelect = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data === 0) {
          state.status = 'empty';
        } else {
          state.status = 'success';
        }
        state.products = action.payload.data;
      }),
      builder.addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {setTypeProduct, resetListProducts, setProductSelect} =
  quoterSlice.actions;
export default quoterSlice.reducer;
