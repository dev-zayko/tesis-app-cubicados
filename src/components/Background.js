import React from 'react';
import {ImageBackground} from 'react-native';
import {KeyboardAvoidingView} from 'native-base';
import {styles} from './styles';

const Background = ({children}) => {
  return (
    <ImageBackground
      source={require('../assets/fondo-login.png')}
      style={styles.imageContainer}>
      <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default Background;
