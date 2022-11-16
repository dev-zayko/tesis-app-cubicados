import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Stack} from 'native-base';
import FormPhaseOne from '../../components/Forms/Cubicator/Coating/Phase/PhaseOne';
import FormPhaseTwo from '../../components/Forms/Cubicator/Coating/Phase/PhaseTwo';
import ResultPhaseThree from '../../components/Forms/Cubicator/Coating/Phase/PhaseThree';

const CoatingStack = createNativeStackNavigator();

const CoatingStackScreen = props => {
  return (
    <Stack w={'100%'} h={'100%'}>
      <CoatingStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'FormCoatingOne'}>
        <CoatingStack.Screen
          name={'FormCoatingOne'}
          children={() => (
            <FormPhaseOne
              formRefPhaseOne={props.formRefPhaseOne}
              phaseOne={() => props.phaseOne()}
            />
          )}
        />
        <CoatingStack.Screen
          name={'FormCoatingTwo'}
          children={() => (
            <FormPhaseTwo
              formRefPhaseTwo={props.formRefPhaseTwo}
              phaseTwo={() => props.phaseTwo()}
            />
          )}
        />
        <CoatingStack.Screen
          name={'ResultCoating'}
          children={() => (
            <ResultPhaseThree phaseThree={() => props.phaseThree()} />
          )}
        />
      </CoatingStack.Navigator>
    </Stack>
  );
};

export default CoatingStackScreen;
