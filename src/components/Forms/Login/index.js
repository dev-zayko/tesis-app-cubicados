import React, {useEffect, useState} from 'react';
//Formik forms
import {Formik} from 'formik';
//Components native base
import {
  Checkbox,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
//Components custom styles and color
import {styles} from '../../styles';
import {colors} from '../../colors';
//React vector icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//Component react native
import {ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
//Hook redux
import {useDispatch, useSelector} from 'react-redux';
//Yup for validation of input
import * as yup from 'yup';
//Login with Google service
import AuthGoogleService from '../../../services/auth/authGoogleService';
//Slice login auth
import {login} from '../../../redux/features/Auth/authSlice';
import {Linking} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormLogin = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [checkLogin, setCheckLogin] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const onLogin = (user, setSubmitting) => {
    dispatch(login({user, navigation, toast})).then(() => setSubmitting(false));
  };

  const onGoogleRegister = () => {

    AuthGoogleService.signIn().then(response => {
      if (response) {

        // navigation.navigate('EmailVerification', {
        //   params: {
        //     userEmail: response.user.email
        //   }
        // });
      }
    });
    AuthGoogleService.isSignedIn().then(response => {console.log(response)});
    AuthGoogleService.signOut();

  };
  //Esquema de validacion
  const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Ingresa un email valido'),
  });

  useEffect(() => {
    async function checkRemember() {
      if (await AsyncStorage.getItem('check') === 'yes') {
        const email = await AsyncStorage.getItem('userEmail');
        const password = await AsyncStorage.getItem('userPass')
        const user = {email, password};
        setCheckLogin(true);
        dispatch(login({user, navigation, toast})).then(() => setCheckLogin(false));
      }
    }
    checkRemember();

  }, []);

  const checkRemember = async (check) => {
    if (check === false) {
      await AsyncStorage.removeItem('check');
    } else {
      await AsyncStorage.setItem('check', 'yes');
    }
  }
  return (
    <>
      {checkLogin === true ?
        <ActivityIndicator size={'large'} color={'orange'} />
        :
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginValidationSchema}
          onSubmit={(values, {setSubmitting}) => {
            if (values.email === '' || values.password === '') {
              toast.show({
                description: 'No puedes dejar campos vacios',
              });
              setSubmitting(false);
            } else {
              onLogin(values, setSubmitting);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Stack
              w="85%"
              h={400}
              style={[styles.formAuthStyle, styles.shadow]}
              backgroundColor={colors.primary}
              alignItems="center">
              <Flex alignItems={'center'} marginTop={3}>
                <Text bold fontSize={'4xl'}>
                  Hola
                </Text>
                <Text bold fontSize={'lg'}>
                  Inicia sesión en tu cuenta
                </Text>
              </Flex>
              <Stack space={5} marginTop={5}>
                <FormControl isInvalid={errors.email && true}>
                  <Input
                    variant={'underlined'}
                    size={'lg'}
                    w={{base: '80%', md: '25%'}}
                    InputLeftElement={
                      <Icon
                        as={<Ionicons name="person" />}
                        size={6}
                        ml="2"
                        color={colors.orange}
                      />
                    }
                    placeholder="Correo"
                    keyboardType={'email-address'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Input
                  variant={'underlined'}
                  w={{base: '80%', md: '25%'}}
                  size={'lg'}
                  type={show ? 'text' : 'password'}
                  InputLeftElement={
                    <Icon
                      as={<Entypo name="key" />}
                      size={6}
                      ml="2"
                      color={colors.orange}
                    />
                  }
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={6}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                  placeholder="Contraseña"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                />
                <HStack space={10}>
                  <TouchableOpacity style={styles.buttonForgotPass} onPress={() => Linking.openURL('https://cubicados.cl/recuperarcuenta')}>
                    <Text underline color={colors.orange}>
                      Olvido la contraseña?
                    </Text>
                  </TouchableOpacity>
                  <HStack space={2}>
                    <Checkbox
                      value={'yes'}
                      colorScheme={'orange'}
                      accessibilityLabel="remember"
                      onChange={(values) => checkRemember(values)} />
                    <Text>Recordarme</Text>
                  </HStack>
                </HStack>
              </Stack>
              <Stack h={120} justifyContent={'center'}>
                {!isSubmitting && (
                  <TouchableOpacity
                    style={[styles.buttonLogin, styles.shadow]}
                    onPressIn={handleSubmit}>
                    <Text style={styles.textLogin}>Iniciar sesión</Text>
                  </TouchableOpacity>
                )}
                {isSubmitting && (
                  <TouchableOpacity
                    style={[styles.buttonLogin, styles.shadow]}
                    disabled={true}>
                    <ActivityIndicator size={'large'} color={colors.primary} />
                  </TouchableOpacity>
                )}
              </Stack>
              <Flex h={100} justifyContent={'center'}>
                <HStack space={2}>
                  <Text bold italic>
                    No tienes una cuenta?
                  </Text>
                  <TouchableOpacity>
                    <Text underline color={colors.orange}>
                      Registrate ahora
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </Flex>
            </Stack>
          )}
        </Formik>

      }
    </>
  );
};

export default FormLogin;
