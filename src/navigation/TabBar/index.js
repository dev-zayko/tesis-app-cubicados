import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import {colors} from '../../components/colors';
import {useDisclose, useToast} from 'native-base';
import MainMenu from '../../components/MainMenu';
import ProfileStackScreen from '../Profile/ProfileStackScreen';
import CubicStackScreen from '../Cubicator';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getState} from '../../redux/features/Auth/authSlice';
import {Alert} from 'react-native';
import {logout} from '../../redux/actions/auth';

const Tab = createBottomTabNavigator();

const TabBar = ({navigation}) => {
  //# region hook
  const {isOpen, onToggle} = useDisclose();
  const dispatch = useDispatch();
  const toast = useToast();
  const [reset, setReset] = useState(false);
  //Slice
  const {user} = useSelector(state => ({...state.auth}));
  //# endregion
  function chargeMenu() {
    return <MainMenu open={isOpen} toggle={onToggle} navigator={navigation} />;
  }

  useFocusEffect(
    React.useCallback(() => {
      if (user !== null) {
        dispatch(getState({tokenUs: user}))
          .then(response => {
            const {description, idUserStatus} = response.payload;

            if (idUserStatus > 2) {
              Alert.alert(
                'Aviso',
                `Has sido ${description} avisanos si tienes consultas`,
              );
              navigation.navigate('LoginScreen');
            }
            setTimeout(() => {
              setReset(!reset);
            }, 8000);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [reset]),
  );
  return (
    <Tab.Navigator
      tabBar={chargeMenu}
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: colors.red,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 10,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerBackVisible: false,
        headerTitle: '',
        headerShown: true,
      })}>
      {/*<Tab.Screen name={"MainMenu"} component={MainMenu}/>*/}
      {/*<Tab.Screen name="Acerca" component={MainUser}*/}
      {/*            options={{*/}
      {/*              headerStyle: { backgroundColor: '#f4511e', height:90 },*/}
      {/*              headerTintColor: '#fff',*/}
      {/*            }}/>*/}
      {/*<Tab.Screen name="Proyectos" component={CubicStackScreen}*/}
      {/*            options={{*/}
      {/*              headerStyle: { backgroundColor: '#f4511e', height:90 },*/}
      {/*              headerTintColor: '#fff',*/}
      {/*            }}/>*/}
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name={'CubicStack'} component={CubicStackScreen} />
      <Tab.Screen
        name={'ProfileStack'}
        component={ProfileStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
