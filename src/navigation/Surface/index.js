import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Stack} from 'native-base';
import FormPhaseOne from '../../components/Forms/Cubicator/Surface/Phase/PhaseOne';
import ResultSurface from '../../components/Forms/Cubicator/Surface/Phase/PhaseTwo';

const SurfaceStack = createNativeStackNavigator();

const SurfaceStackScreen = props => {
  return (
    <Stack w={'100%'} h={'100%'}>
      <SurfaceStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'FormSurfaceOne'}>
        <SurfaceStack.Screen
          name={'FormSurfaceOne'}
          children={() => (
            <FormPhaseOne
              formRefPhaseOne={props.formRefPhaseOne}
              phaseOne={() => props.phaseOne()}
            />
          )}
        />
        <SurfaceStack.Screen
          name={'ResultSurface'}
          children={() => <ResultSurface phaseTwo={() => props.phaseTwo()} />}
        />
      </SurfaceStack.Navigator>
    </Stack>
  );
};

export default SurfaceStackScreen;
