import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/actions/auth';
import Background from '../../components/Background';
import {MainMenu} from '../../components/MainMenu';

const Home = ({navigation}) => {
  return (
    <Background>
      <Text>Home</Text>
    </Background>
  );
};
export default Home;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
