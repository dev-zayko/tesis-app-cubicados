import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Stack for navigation
const Stack = createNativeStackNavigator();
//Screens
import Login from './../screens/Login/index';
import SignUp from '../screens/SignUp';
import {colors} from '../components/colors';
import TabBar from './TabBar/index';
import EmailVerification from '../screens/Email';
import firebaseService from '../services/firebase/firebaseService';
import {useDispatch} from 'react-redux';
import {setTokenDevice} from '../redux/features/Utility/utilitySlice';


const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: colors.tertiary,
        headerShown: true,
        headerTransparent: true,
        headerBackVisible: false,
        headerTitle: '',
        headerLeftContainerStyle: {
          left: 10,
        },
      }}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen
        name="TabBar"
        component={TabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SignUpScreen'}
        component={SignUp}
        options={{headerBackVisible: true, headerTitle: 'Login'}}
      />
      <Stack.Screen name={'EmailVerification'} component={EmailVerification} />
    </Stack.Navigator>
  </NavigationContainer>
);

const NavigationProvider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebaseService.checkToken().then((res) => {
      dispatch(setTokenDevice(res))
    })
  }, [])
  return <AuthStack />;
};
export default NavigationProvider;
