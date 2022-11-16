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
