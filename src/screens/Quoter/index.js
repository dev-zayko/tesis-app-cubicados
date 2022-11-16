import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Text} from 'react-native';
import Background from '../../components/Background';
import {useMyLocation} from '../../hook/useMyLocation';
import axios from 'axios';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const Quoter = () => {
  useFocusEffect(useCallback(() => {

    if (Platform.OS === 'ios') {
      const auth = Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        // do something if granted...
      }
    }
    if (Platform.OS === 'android') {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          info => {
            console.log('Res', info.coords)
            let apiKey = 'AIzaSyDJkaQFiamZWVBEbaFeacXW_GK1VUwSw3k';
            Geocoder.init(apiKey)
            Geocoder.from({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude
            }).then((json) => {
              console.log(json)
            })
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    }
  }, []))
  return (
    <Background>

    </Background>
  );
};
export default Quoter;
