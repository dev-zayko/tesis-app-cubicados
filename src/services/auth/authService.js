//React
import React from 'react';
//Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//Axios client
import ApiClient from '../connection/ApiClient';

const login = async user => {
  return await ApiClient.post('login', user)
    .then(response => {
      console.log('d');
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const register = async newUser => {
  return await ApiClient.post('register', newUser)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const logOut = async () => {
  await AsyncStorage.clear();
  return {
    status: 'success',
    message: 'You are logged out',
  };
};

export default {
  login,
  register,
  logOut,
};
