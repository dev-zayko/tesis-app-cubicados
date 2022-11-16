import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';
import jwt_decode from 'jwt-decode';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'auth/login',
  async ({user, navigation, toast}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('login', user);
      const {status, token, verified} = response.data;
      switch (status) {
        case 'isClient':
          const decoded = jwt_decode(token);
          const {user_status, first_name} = decoded.user;
          await AsyncStorage.setItem('user', token);
          switch (user_status.id) {
            case 1:
              if (verified === false) {
                navigation.navigate('EmailVerification');
              } else {
                navigation.navigate('TabBar');
              }
              return {user: token};
            case 2:
              Alert.alert(
                'Aviso',
                `Estimado ${first_name} su cuenta ha sido suspendida`,
                [
                  {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('TabBar'),
                  },
                ],
              );
              return {user: token};
            case 3:
              Alert.alert(
                'Aviso',
                `Estimado ${decoded.user.first_name} , su cuenta a sido baneada por incumplimiento de nuestras normas`,
                [
                  {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('TabBar'),
                  },
                ],
              );
          }
          break;
        case 'isAdmin':
          break;
        case 'incorrect':
          toast.show({
            description: 'Usuario o clave incorrecto(s)',
          });
          return {user: 'incorrect'};
      }
      // return response.data;
    } catch (error) {
      toast.show({
        description: 'Ocurrio un error',
      });
      navigation.replace('LoginScreen');
      return rejectWithValue(error.response.data);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({navigate, newUser}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('register', newUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return await AsyncStorage.removeItem('user');
});
const user = null;

const initialState = user
  ? {isLoggedIn: true, user: AsyncStorage.getItem('user')}
  : {isLoggedIn: false, user: null};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    }),
      builder.addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      }),
      builder.addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});
export default authSlice.reducer;
