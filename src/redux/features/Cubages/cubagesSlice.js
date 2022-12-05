import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const getCubagesByRooms = createAsyncThunk(
  'cubages/get',
  async ({token, idRoom}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'cubage/get',
        {
          idRoom: idRoom,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {status, data} = response.data;
      return {
        status: status,
        data: data,
      };
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const createCubages = createAsyncThunk(
  'cubages/store',
  async ({toast, token, area, depth, width, m3, dosage, gravel, sand, water, length, count, description, idConstruction, idRoom, idMaterial, totalCost}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('cubage/store', {
        area: area,
        depth: depth,
        width: width,
        m3: m3,
        dosage: dosage,
        gravel: gravel,
        sand: sand,
        water: water,
        length: length,
        count: count,
        description: description,
        idConstruction: idConstruction,
        idRoom: idRoom,
        idMaterial: idMaterial,
        totalCost: totalCost
      }, {
        headers: {Authorization: `Bearer ${token}`},
      },
      );
      const {status, data} = response.data;
      if (status === 'success') {
        toast.show({
          description: 'Proyecto creado',
        });
        return {data: data};
      } else {
        return {data: status};
      }
    } catch (error) {
      console.log(error.response.data);
      toast.show({
        description: 'Ocurrio un error',
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCubage = createAsyncThunk(
  'cubages/delete',
  async ({token, idCubage}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'cubage/delete',
        {
          idCubage: idCubage,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const cubagesSlice = createSlice({
  name: 'cubages',
  initialState: {
    cubages: 0,
    loading: false,
    limited: false,
    status: '',
  },
  extraReducers: builder => {
    builder.addCase(getCubagesByRooms.pending, (state, action) => {
      state.loading = true;
      state.cubages = 0;
    }),
      builder.addCase(getCubagesByRooms.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data !== undefined) {
          state.cubages = action.payload.data;
        }
        state.status = action.payload.status;
      }),
      builder.addCase(getCubagesByRooms.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(createCubages.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createCubages.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data === 'success') {
          state.cubages = [action.payload.data];
          state.limited = false;
        } else {
          state.limited = true;
          state.status = action.payload.data;
        }
      }),
      builder.addCase(createCubages.rejected, (state, action) => {
        state.loading = false;
        state.cubages = [action.payload];
      }),
      builder.addCase(deleteCubage.pending, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(deleteCubage.fulfilled, (state, action) => {
        let index = state.cubages.findIndex(({id}) => id === action.payload.id);
        state.cubages.splice(index, 1);
        if (state.cubages.length === 0) {
          state.cubages = null;
        }
      }),
      builder.addCase(deleteCubage.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default cubagesSlice.reducer;
