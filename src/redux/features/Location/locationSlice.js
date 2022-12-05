import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const getRegions = createAsyncThunk(
  'region/get',
  async ({rejectedWithValue}) => {
    try {
      const response = await ApiClient.get('region/all');
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

export const getCommunes = createAsyncThunk(
  'communes/get',
  async ({region, store}, {rejectedWithValue}) => {
    try {
      const response = await ApiClient.post(`city/${(store).toLowerCase()}`, {}, {
        params: {
          region: region
        }
      });
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
  }
)

export const matchCommune = createAsyncThunk(
  'communes/match',
  async ({commune}, {rejectedWithValue}) => {
    try {
      const response = await ApiClient.post('communes/match', {}, {
        params: {
          name: commune
        }
      })
      const {status, data} = response.data;
      if (status === 'success') {
        return {data: data}
      } else {
        return {data: null}
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectedWithValue(error.response.data);
    }
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    regions: 0,
    communes: 0,
    communeSelect: 0,
    loadingRegions: false,
    loadingCommunes: false,
    loadingCommuneSelect: false,
    statusRegions: '',
    statusCommunes: ''
  },
  extraReducers: builder => {
    builder.addCase(getRegions.pending, (state, action) => {
      state.loadingRegions = true;
    }),
      builder.addCase(getRegions.fulfilled, (state, action) => {
        state.loadingRegions = false;
        state.regions = action.payload.data;
      }),
      builder.addCase(getRegions.rejected, (state, action) => {
        state.loadingRegions = false;
      }),
      builder.addCase(getCommunes.pending, (state, action) => {
        state.loadingCommunes = true;
      }),
      builder.addCase(getCommunes.fulfilled, (state, action) => {
        state.loadingCommunes = false;
        state.communes = action.payload.data;
      }),
      builder.addCase(getCommunes.rejected, (state, action) => {
        state.loadingCommunes = false;
      }),
      builder.addCase(matchCommune.pending, (state, action) => {
        state.loadingCommuneSelect = true;
      }),
      builder.addCase(matchCommune.fulfilled, (state, action) => {
        state.loadingCommuneSelect = false;
        state.communeSelect = action.payload.data;
      }),
      builder.addCase(matchCommune.rejected, (state, action) => {
        state.loadingCommuneSelect = false;
      })
  }
});

export default locationSlice.reducer;

