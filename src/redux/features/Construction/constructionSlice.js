import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const getConstruction = createAsyncThunk(
  'cosntruction/get',
  async ({idConstructionType}, {rejectedWithValue}) => {
    try {
      const response = await ApiClient.post(
        'construction/get',
        {
          idConstructionType: idConstructionType,
        },
        {},
      );
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

const constructionSlice = createSlice({
  name: 'construction',
  initialState: {
    constructions: 0,
    constructionSelect: 0,
    loading: false,
    status: '',
  },
  reducers: {
    resetConstructions: (state, action) => {
      state.constructions = 0;
      state.constructionSelect = 0;
    },
    setConstructionSelect: (state, action) => {
      state.constructionSelect = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getConstruction.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(getConstruction.fulfilled, (state, action) => {
        state.loading = false;
        state.constructions = action.payload.data;
      }),
      builder.addCase(getConstruction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {resetConstructions, setConstructionSelect} =
  constructionSlice.actions;
export default constructionSlice.reducer;
