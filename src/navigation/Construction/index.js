import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListConstructionType from '../../components/List/ConstructionType';
import ListConstruction from '../../components/List/Construction';
import {Stack} from 'native-base';

const ConstructionStack = createNativeStackNavigator();

const ConstructionStackScreen = () => {
  return (
    <Stack w={'100%'} h={'100%'}>
      <ConstructionStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'ConstructionType'}>
        <ConstructionStack.Screen
          name={'ConstructionType'}
          component={ListConstructionType}
        />
        <ConstructionStack.Screen
          name={'Construction'}
          component={ListConstruction}
        />
      </ConstructionStack.Navigator>
    </Stack>
  );
};

export default ConstructionStackScreen;
