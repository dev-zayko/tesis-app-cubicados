import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Projects from '../../screens/Projects/index';
import Rooms from '../../screens/Rooms/index';
import Cubicator from '../../screens/Cubicator';
import Coating from '../../screens/Cubicator/Coating';
import Surface from '../../screens/Cubicator/Surface';
import Quoter from '../../screens/Quoter';
import {useDispatch} from 'react-redux';
import {getStores} from '../../redux/features/Stores/storesSlice';

const CubicStack = createNativeStackNavigator();

const CubicStackScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStores({}));
  }, []);
  return (
    <CubicStack.Navigator screenOptions={{headerShown: false}}>
      <CubicStack.Screen name="Project" component={Projects} />
      <CubicStack.Screen name="Rooms" component={Rooms} />
      <CubicStack.Screen name="Cubicator" component={Cubicator} />
      <CubicStack.Screen name="Coating" component={Coating} />
      <CubicStack.Screen name="Surface" component={Surface} />
      <CubicStack.Screen name="Quoter" component={Quoter} />
    </CubicStack.Navigator>
  );
};

export default CubicStackScreen;
