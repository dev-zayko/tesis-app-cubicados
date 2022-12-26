import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Flex, HStack, Image, Text} from 'native-base';
import Background from '../../components/Background';
import {colors} from '../../components/colors';
import FormLogin from '../../components/Forms/Login';

const Login = ({navigation}) => {
  const handleNavigate = () => {
    navigation.navigate('SignUpScreen');
  };
  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Image
          source={require('../../assets/logo-empresa.png')}
          alt={'logoEmpresa'}
          size={150}
          w={300}
          marginTop={20}
        />
        {/*Componente que carga el formulario de login*/}
        <FormLogin navigation={navigation} />
      </Flex>
    </Background>
  );
};
export default Login;
