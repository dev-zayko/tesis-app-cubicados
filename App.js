//React
import React, {useEffect} from 'react';
//NavigationProvider
import NavigationProvider from './src/navigation/index';
//SafeAreaProvider
import {SafeAreaProvider} from 'react-native-safe-area-context';
//Provider de Redux
import {Provider as StoreProvider} from 'react-redux';
//Store de redux
import store from './src/redux/store';
//NativeBaseProvider
import {NativeBaseProvider} from 'native-base/src/core/NativeBaseProvider';
//StatusBar para controlar la apariencia de la barra de estado
import {StatusBar} from 'react-native';
//Theme para personalizar el tema general de la app
import {theme} from './src/components/Theme/theme';
//FirebaseService servicio que envia el token del dispositivo
import firebaseService from './src/services/firebase/firebaseService';

const App = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <NativeBaseProvider theme={theme}>
          <NavigationProvider />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
};
export default App;
