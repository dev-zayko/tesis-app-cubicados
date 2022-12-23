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
        return {data: null, status: status};
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

export const getCount = createAsyncThunk(
  'count/get',
  async ({token}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('count/get', {

      },
        {
          headers: {Authorization: `Bearer ${token}`},
        });
      const {data} = response;
      return {data: data};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
)

export const totalProjects = createAsyncThunk(
  'projects/total',
  async ({token}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('project/total', {},
        {
          headers: {Authorization: `Bearer ${token}`},
        });
      const {status, data} = response.data;
      if (status !== 'empty') {
        return {data: data, status: status};
      } else {
        return {data: 0, status: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
)

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
    countDataProject: '',
    loading: false,
    limited: false,
    total: 0,
    status: '',
  },
  reducers: {
    setListProjects: (state, action) => {
      state.projects = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(totalProjects.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(totalProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data
      }),
      builder.addCase(totalProjects.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(getCount.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getCount.fulfilled, (state, action) => {
        state.loading = false;
        state.countDataProject = action.payload.data
      }),
      builder.addCase(getCount.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(createProject.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 'success') {
          try {
            state.projects.push(action.payload.data);
          } catch (error) {
            state.projects = [action.payload.data];
          }
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
        state.status = action.payload.status;
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
        state.loading = false;
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
export const {setListProjects} = projectSlice.actions;
export default projectSlice.reducer;
