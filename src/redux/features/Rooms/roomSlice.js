import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import ApiClient from '../../../services/connection/ApiClient';

export const createRoom = createAsyncThunk(
  'rooms/create',
  async ({token, idProject, name}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'room/store',
        {
          idProject: idProject,
          name: name,
          action: 'create',
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {status, data} = response.data;
      if (status === 'success') {
        return {data: data, status: status};
      } else {
        return {data: 0, status: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const getRoomsByProject = createAsyncThunk(
  'rooms/get',
  async ({token, idProject}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post(
        'room/get',
        {
          action: 'get',
          idProject: idProject,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      const {data, status} = response.data;
      if (status !== 'empty') {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateRoom = createAsyncThunk(
  'rooms/update',
  async ({token, idProject, idRoom, name}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.put('room/update', {
        idProject: idProject,
        idRoom: idRoom,
        name: name
      },
        {
          headers: {Authorization: `Bearer ${token}`},
        });
      console.log(response.data);
      const {data, status} = response.data;
      if (status !== 'success') {
        return {data: 0, status: status};
      } else {
        return {data: data, status: status};
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
)

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: 0,
    roomSelect: 0,
    loading: false,
    limited: false,
    status: '',
  },
  reducers: {
    setRoomSelect: (state, action) => {
      state.roomSelect = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(createRoom.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 'success') {
          try {
            state.rooms.push(action.payload.data);
          } catch (error) {
            state.rooms = [action.payload.data];
          }
          state.limited = false;
        } else {
          state.limited = true;
          state.status = action.payload.data;
        }
      }),
      builder.addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.rooms = [action.payload];
      }),
      builder.addCase(getRoomsByProject.pending, (state, action) => {
        state.loading = true;
        state.rooms = 0;
      }),
      builder.addCase(getRoomsByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      }),
      builder.addCase(getRoomsByProject.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(updateRoom.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex(rooms => rooms.id === action.payload.id);
        state.rooms[index] = {
          ...state[index],
          ...action.payload,
        };
      }),
      builder.addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {setRoomSelect} = roomsSlice.actions;
export default roomsSlice.reducer;
