import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

export const createProject = createAsyncThunk(
  'projects/create',
  async ({name, token, toast}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'project/store',
        {
          name: name,
        },
        {
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
      console.log(error);
      toast.show({
        description: 'Ocurrio un error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

export const getProjectByUser = createAsyncThunk(
  'projects/get',
  async ({token, toast}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'project/get',
        {},
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {data, status} = response.data;
      if (status !== 'empty') {
        return {data: data};
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      toast.show({
        description: 'Ocurrio un error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({id, name, token, toast}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.put(
        'project/update',
        {
          idProject: id,
          name: name,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {status, data} = response.data;
      if (status === 'success') {
        toast.show({
          description: 'Proyecto actualizado',
        });
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async ({id, token}, {rejectWithValue}) => {
    try {
      const res = await ApiClient.put(
        'project/delete',
        {
          idProject: id,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: 0,
    loading: false,
    limited: false,
    status: '',
  },
  extraReducers: builder => {
    builder.addCase(createProject.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data === 'success') {
          state.projects = [action.payload.data];
          state.limited = false;
        } else {
          state.limited = true;
          state.status = action.payload.data;
        }
      }),
      builder.addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.projects = [action.payload];
      }),
      builder.addCase(getProjectByUser.pending, (state, action) => {
        state.loading = true;
        state.projects = 0;
      }),
      builder.addCase(getProjectByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
      }),
      builder.addCase(getProjectByUser.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(updateProject.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          projects => projects.id === action.payload.id,
        );
        state.projects[index] = {
          ...state[index],
          ...action.payload,
        };
      }),
      builder.addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(deleteProject.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(deleteProject.fulfilled, (state, action) => {
        let index = state.projects.findIndex(
          ({id}) => id === action.payload.id,
        );
        state.projects.splice(index, 1);
        if (state.projects.length === 0) {
          state.projects = null;
        }
      }),
      builder.addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default projectSlice.reducer;
