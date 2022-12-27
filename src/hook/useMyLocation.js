import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const useMyLocation = async () => {
  const [position, setPosition] = useState('');
  useEffect(() => {
    async function getLocation() {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          // do something if granted...
        }
      }
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            info => {
              setPosition(info);
              console.log('Res', info.coords.latitude);
              const response = axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${info.coords.latitude},${info.coords.longitude}&key=AIzaSyCAEmEW-PI6yZbduCX8FF6eVtWcAPiL23g`,
              );
              console.log('Response', response);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      }
    }
    getLocation();
  }, []);
  return {position};
};
