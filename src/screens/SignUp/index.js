import React from 'react';
import Background from '../../components/Background';
import {Flex} from 'native-base';
import FormSignUp from '../../components/Forms/SignUp';

const SignUp = ({navigation}) => {
  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} justifyContent={'center'}>
        {/*Componente que carga el formulario de Registro*/}
        <FormSignUp navigation={navigation} />
      </Flex>
    </Background>
  );
};
export default SignUp;
