import React from 'react';
import {AlertDialog, Button, Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {useDispatch} from 'react-redux';
import {getRegions} from '../../../redux/features/Location/locationSlice';
import {
  setDefineLocation,
  setMineLocation,
} from '../../../redux/features/Utility/utilitySlice';

const AlertLocation = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getRegion = () => {
    dispatch(getRegions({}));
  };
  const onNavigateProduct = define => {
    if (define === 'mine') {
      checkPermission();
    } else {
      getRegion();
      dispatch(setDefineLocation('other'));
      navigation.navigate('ListProduct');
    }
    props.onClose();
  };
  const checkPermission = async () => {
    try {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (result === true) {
        getMyLocation();
      } else if (result === false) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (status === 'never_ask_again') {
        } else if (status === 'denied') {
          checkPermission();
        } else if (status === 'granted') {
          getMyLocation();
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log('Res', info.coords);
        let apiKey = 'AIzaSyDJkaQFiamZWVBEbaFeacXW_GK1VUwSw3k';
        Geocoder.init(apiKey);
        Geocoder.from({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }).then(response => {
          dispatch(setDefineLocation('mine'));
          dispatch(
            setMineLocation({
              mineRegion: response.results[0].address_components[5].long_name,
              mineCommune: response.results[0].address_components[4].long_name,
            }),
          );
          navigation.navigate('ListProduct');
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={props.cancelRef}
        isOpen={props.isOpen}
        onClose={props.onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Aviso</AlertDialog.Header>
          <AlertDialog.Body>¿En que ubicación deseas cotizar?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="warning"
                onPress={props.onClose}
                ref={props.cancelRef}
                onPressIn={() => onNavigateProduct('mine')}>
                Mia
              </Button>
              <Button
                colorScheme="danger"
                onPressIn={() => onNavigateProduct('other')}>
                Otra
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertLocation;
