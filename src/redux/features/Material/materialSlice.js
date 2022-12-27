import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const createMaterial = createAsyncThunk(
  'material/get',
  async (
    {token, image, tradeMark, title, price, idStore, idCommune},
    {rejectWithValue},
  ) => {
    try {
      const response = await ApiClient.post(
        'materials/store',
        {
          image: image,
          tradeMark: tradeMark,
          title: title,
          price: price,
          idStore: idStore,
          idCommune: idCommune,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {status, data} = response.data;
      if (status === 'success') {
        return {data: data};
      } else {
        return {data: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getPopularTrademark = createAsyncThunk(
  'material/popular',
  async ({idConstruction}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'construction/type/popular',
        {
          idConstruction: idConstruction,
        },
        {},
      );
      const {data, status} = response.data;
      if (status === 'success') {
        return {data: data, status: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

const materialSlice = createSlice({
  name: 'material',
  initialState: {
    loading: false,
    material: 0,
    status: '',
  },
  extraReducers: builder => {
    builder.addCase(createMaterial.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(createMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.material = action.payload.data;
      }),
      builder.addCase(createMaterial.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default materialSlice.reducer;
