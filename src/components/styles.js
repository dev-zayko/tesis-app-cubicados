//React
import React from 'react';
//Components Native
import {Dimensions, StyleSheet} from 'react-native';
//Colors
import {colors} from './colors';

export const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    zIndex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  containerStyle: {
    borderWidth: 1,
    width: 150,
    height: 30,
    borderBottomLeftRadius: 40,
    borderColor: colors.orange,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 40,
    alignItems: 'center',
  },
  formAuthStyle: {
    marginTop: 50,
  },
  buttonLogin: {
    backgroundColor: colors.orange,
    width: 180,
    height: 45,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    color: colors.primary,
  },
  textBold: {
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: colors.dark,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 7,
  },
  dotNavigator: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  menuNavigator: {
    position: 'absolute',
    bottom: 50,
    left: 10,
  },
  ContainerStyle: {
    bottom: 50,
    borderRadius: 10,
  },
  containerDayStyle: {
    bottom: 30,
    borderRadius: 50,
  },
  imagePerfil: {
    borderRadius: 100,
    left: 20,
    top: 10,
  },
  circleProgress: {
    height: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 100,
    alignItems: 'center',
  },
  textProgress: {
    position: 'absolute',
    color: colors.orange,
    top: 28,
    left: 28,
  },
  buttonChange: {
    backgroundColor: colors.orange,
    top: 2,
    width: 28,
    height: 28,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 50,
  },
  containerButtonPlan: {
    top: 150,
    left: 80,
  },
  buttonPlan: {
    backgroundColor: colors.orange,
    width: 150,
    height: 50,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 30,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonForgotPass: {
    width: 135,
  },
  buttonItemCubage: {
    backgroundColor: colors.orange,
    width: 150,
    height: 35,
    marginTop: 10,
    bottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  textMedium: {
    fontSize: 15,
  },
});
