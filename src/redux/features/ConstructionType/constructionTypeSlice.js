import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const getConstructionType = createAsyncThunk(
  'constructionType/get',
  async ({rejectWithValue}) => {
    try {
      const response = await ApiClient.get('construction/type/all');
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

const constructionTypeSlice = createSlice({
  name: 'constructionType',
  initialState: {
    constructionTypes: 0,
    constructionTypeSelect: 0,
    loading: false,
    status: '',
  },
  reducers: {
    resetConstructionType: (state, action) => {
      state.constructionTypeSelect = 0;
    },
    setConstructionTypeSelect: (state, action) => {
      state.constructionTypeSelect = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getConstructionType.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getConstructionType.fulfilled, (state, action) => {
        state.loading = false;
        state.constructionTypes = action.payload.data;
      }),
      builder.addCase(getConstructionType.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {resetConstructionType, setConstructionTypeSelect} =
  constructionTypeSlice.actions;
export default constructionTypeSlice.reducer;
