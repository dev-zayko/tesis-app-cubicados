import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';


export const updateFinalized = createAsyncThunk(
  'cubages/finalized',
  async ({token, isFinalized, idCubages}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('cubage/finalized',
        {
          isFinalized: isFinalized,
          idCubages: idCubages
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        });
      const {status, data} = response.data;
      if (status === 'success') {
        return {finalized: data.finalized, status: status, idCubage: idCubages};
      }
    } catch (error) {
      console.log(error.reponse.data);
      return rejectWithValue(error.response.data);
    }
  }
);



export const preferenceByUser = createAsyncThunk(
  'cubages/preference',
  async ({token}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('cubage/preference', {},
        {
          headers: {Authorization: `Bearer ${token}`},
        });
      const {status, data} = response.data;
      if (status === 'empty') {
        return {data: null, status: status};
      } else {
        return {data: data, status: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

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


export const getCubagesByProject = createAsyncThunk(
  'cubages/charge',
  async ({token, idProject}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'cubage/charge',
        {
          idProject: idProject,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {status, data} = response.data;
      if (status !== 'status') {
        return {data: data, status: status};
      } else {
        return {status: status, data: 0};
      }
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
  async ({token, idCubage, idMaterial, idProject, idRoom}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'cubage/delete',
        {
          idCubage: idCubage,
          idMaterial: idMaterial,
          idProject: idProject,
          idRoom: idRoom
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      console.log(response.data);
      const {status} = response.data;
      return {status: status};
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
    preferences: 0,
    statusPreference: '',
    cubageSelect: 0,
  }, reducers: {
    setCubageSelect: (state, action) => {
      state.cubageSelect = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(updateFinalized.pending, (state, action) => {
      state.loading = true;
      state.cubageSelect.finalized = !state.cubageSelect.finalized
    }),
      builder.addCase(updateFinalized.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(updateFinalized.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(preferenceByUser.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(preferenceByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload.data;
        state.statusPreference = action.payload.status;
      }),
      builder.addCase(preferenceByUser.rejected, (state, action) => {
        state.loading = false;
      }),
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
        state.loading = false;
      }),
      builder.addCase(deleteCubage.rejected, (state, action) => {
        state.loading = false;
      });
    builder.addCase(getCubagesByProject.pending, (state, action) => {
      state.loading = true;
      state.cubages = 0;
    }),
      builder.addCase(getCubagesByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
      }),
      builder.addCase(getCubagesByProject.rejected, (state, action) => {
        state.loading = false;
      })
  },
});
export const {setCubageSelect} = cubagesSlice.actions;
export default cubagesSlice.reducer;
