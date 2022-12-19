import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Stack} from "native-base";
import ListStores from "../../components/List/Stores";
import ListProducts from "../../components/List/Products";
import {useSelector} from "react-redux";
import PhaseQuoterResult from "../../components/Forms/Quoter/PhaseResult";

const QuoterStack = createNativeStackNavigator();

const QuoterStackScreen = props => {
  const {stores} = useSelector(state => ({...state.store}));

  return (
    <QuoterStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'ListStores'}>
      <QuoterStack.Screen
        name={'ListStores'}
        children={() => (
          <ListStores stores={stores} />
        )}
      />
      <QuoterStack.Screen
        name={'ListProduct'}
        children={() => (
          <ListProducts />
        )}
      />
      <QuoterStack.Screen
        name={'ResultQuoter'}
        alertConfirm={() => props.alertConfirm()}
        children={() => (
          <PhaseQuoterResult />
        )} />
    </QuoterStack.Navigator>
  );
}

export default QuoterStackScreen;
