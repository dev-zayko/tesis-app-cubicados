import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';
import jwt_decode from 'jwt-decode';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mailService from '../../../services/auth/mailService';
import DeviceInfo from 'react-native-device-info';

export const login = createAsyncThunk(
  'auth/login',
  async ({user, navigation, toast}, {rejectWithValue}) => {
    try {
      let ip = await DeviceInfo.getIpAddress().then(ip => {
        return Promise.resolve(ip);
      });
      let userAgent = await DeviceInfo.getUserAgent().then(userAgent => {
        return Promise.resolve(userAgent);
      });
      let deviceName = await DeviceInfo.getDeviceName().then(deviceName => {
        return Promise.resolve(deviceName);
      });
      let systemVersion = DeviceInfo.getSystemVersion();
      const response = await ApiClient.post(
        'login',
        {
          email: user.email,
          password: user.password,
          ip: ip,
          deviceName: deviceName,
          systemVersion: systemVersion,
          userAgent: userAgent,
        },
        {timeout: 6000},
      );
      const {status, token, verified} = response.data;
      if (status === 'empty') {
        Alert.alert(
          'Aviso',
          'Lo sentimos no existe una cuenta asociada a este email',
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
        );
        return {user: 0, userData: 0};
      } else {
        switch (status) {
          case 'isClient':
            const decoded = jwt_decode(token);
            const {user_status, first_name} = decoded.user;
            switch (user_status.id) {
              case 1:
                if (verified === false) {
                  navigation.navigate('EmailVerification', {
                    params: {user: user},
                  });
                } else {
                  navigation.navigate('TabBar');
                }
                await AsyncStorage.setItem('userEmail', user.email);
                await AsyncStorage.setItem('userPass', user.password);
                return {user: token, userData: decoded.user};
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
      }
      // return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.show({
        description: 'Ocurrio un error',
      });
      navigation.navigate('LoginScreen');
      return rejectWithValue(error.response.data);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({navigation, newUser, toast}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.post('register', newUser);
      const {status, token} = response.data;
      const decoded = jwt_decode(token);
      const {email, first_name} = decoded.user;
      console.log(response.data);
      if (status === 'duplicated') {
        Alert.alert('Error!', 'Este correo ya esta asociado a una cuenta', [
          {
            text: 'OK',
            onPress: () => {
              console.log('ok pressed');
            },
          },
        ]);
      } else if (status === 'success') {
        Alert.alert(
          'Enhorabuena!',
          'Se te ha enviado un correo para que verifiques tu cuenta',
          [
            {
              text: 'OK',
              onPress: () => {
                mailService.sendEmailVerification(email, first_name, token);
                navigation.navigate('LoginScreen');
              },
            },
          ],
        );
      }
    } catch (error) {
      toast.show({
        description: 'Ocurrio un error',
      });
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return await AsyncStorage.removeItem('check');
});

export const updatePhone = createAsyncThunk(
  'update/phone',
  async ({tokenOld, newPhone}, {rejectWithValue}) => {
    try {
      const response = await ApiClient.put(
        'update/phone',
        {
          newPhone: newPhone,
        },
        {
          headers: {Authorization: `Bearer ${tokenOld}`},
        },
      );

      const {token} = response.data;
      const decoded = jwt_decode(token);

      return {user: token, userData: decoded.user};
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

const user = null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user
      ? {isLoggedIn: true, user: AsyncStorage.getItem('user')}
      : {isLoggedIn: false, user: null},
    userData: 0,
    loading: 0,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload.user;
      state.userData = action.payload.userData;
    }),
      builder.addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.user = null;
      }),
      builder.addCase(login.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(register.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(register.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(updatePhone.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(updatePhone.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.user = action.payload.user;
        state.loading = false;
      }),
      builder.addCase(updatePhone.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default authSlice.reducer;
