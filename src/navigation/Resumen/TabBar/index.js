import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {colors} from '../../../components/colors';
import ReportMyPays from '../../../screens/Report/ReportMyPays';
import ReportQuoter from '../../../screens/Report/ReportQuoter';

const Tab = createMaterialTopTabNavigator();

const TabBarReport = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: 'transparent',
        },
        swipeEnabled: false,
        headerTransparent: true,
        headerBackVisible: false,
        headerTitle: '',
        headerShown: true,
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarStyle: {
          borderRadius: 10,
        },
        tabBarIconStyle: {display: 'none'},
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarPressColor: colors.darkLight,
        tabBarIndicatorStyle: {
          backgroundColor: 'tomato',
        },
      })}>
      <Tab.Screen
        name="ReportQuoter"
        component={ReportQuoter}
        options={{
          title: 'Cotizaciones',
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="ReportMyPays"
        component={ReportMyPays}
        options={{
          title: 'Mis Pagos',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBarReport;
