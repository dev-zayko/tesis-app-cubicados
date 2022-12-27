//React
import React from 'react';
//navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Profile
import Profile from '../../screens/Profile/index';
//Colors
import {colors} from '../../components/colors';
import UserAccount from '../../screens/UserAccount';
import Membership from '../../screens/Membership';
import Webpay from '../../screens/Webpay';
import MyPays from '../../screens/MyPays';
//Stack navigator
const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName={'UserAccount'}
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
      <ProfileStack.Screen name={'UserAccount'} component={UserAccount} />
      <ProfileStack.Screen
        name={'Profile'}
        component={Profile}
        options={{
          headerTitle: 'Cuenta',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerBackVisible: true,
        }}
      />
      <ProfileStack.Screen
        name={'Membership'}
        component={Membership}
        options={{
          headerTitle: 'Cuenta',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerBackVisible: true,
        }}
      />
      <ProfileStack.Screen
        name={'MyPays'}
        component={MyPays}
        options={{
          headerTitle: 'Cuenta',
          headerTitleStyle: {
            fontSize: 20,
          },
          headerBackVisible: true,
        }}
      />
      <ProfileStack.Screen name={'Webpay'} component={Webpay} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
