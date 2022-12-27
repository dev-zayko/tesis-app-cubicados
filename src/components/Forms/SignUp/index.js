//React
import React, {useState} from 'react';
//Components Native Base
import {Flex, Icon, Input, Stack, Text, useToast} from 'native-base';
//Styles
import {styles} from '../../styles';
//Colors
import {colors} from '../../colors';
//Formik
import {Formik} from 'formik';
//Use Dispatch
import {useDispatch} from 'react-redux';
//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
//Components React
import {
  ActivityIndicator,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
//Import date
import DateTimePicker from '@react-native-community/datetimepicker';
import {register} from '../../../redux/features/Auth/authSlice';

const FormSignUp = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(false);

  const [show, setShow] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [birthday, setBirthday] = useState({front: '', back: ''});
  const toast = useToast();
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      ('0' + tempDate.getDate()).slice(-2) +
      '-' +
      ('0' + (tempDate.getMonth() + 1)).slice(-2) +
      '-' +
      tempDate.getFullYear();
    let bDate =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();
    setBirthday({front: fDate, back: bDate});
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onRegister = (values, setSubmitting) => {
    dispatch(
      register({navigation: navigation, newUser: values, toast: toast}),
    ).then(() => {
      setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={{
        names: '',
        lastNames: '',
        email: '',
        phone: '',
        password: '',
        birthday: birthday.back,
      }}
      onSubmit={(values, {setSubmitting}) => {
        values = {...values, birthday};
        if (
          values.names === '' ||
          values.lastNames === '' ||
          values.email === '' ||
          values.phone === '' ||
          values.password === '' ||
          birthday === ''
        ) {
          toast.show({
            description: 'No puedes dejar campos vacios',
          });
          setSubmitting(false);
        } else {
          onRegister(values, setSubmitting);
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
          h={650}
          style={[styles.formAuthStyle, styles.shadow]}
          backgroundColor={colors.primary}
          alignItems="center">
          <Flex alignItems={'center'} marginTop={3}>
            <Text bold fontSize={'3xl'}>
              Registro
            </Text>
            <Text bold fontSize={'md'}>
              Ingresa tus datos
            </Text>
          </Flex>
          <Stack space={5} marginTop={10}>
            <Input
              variant={'underlined'}
              size={'lg'}
              w={{base: '80%', md: '25%'}}
              InputLeftElement={
                <Icon
                  as={<Ionicons name="person" />}
                  size={6}
                  marginRight={2}
                  ml="2"
                  color={colors.orange}
                />
              }
              placeholder="Nombres"
              value={values.names}
              onChangeText={handleChange('names')}
              onBlur={handleBlur('names')}
              error={errors.names}
              touched={touched.names}
            />
            <Input
              variant={'underlined'}
              size={'lg'}
              w={{base: '80%', md: '25%'}}
              InputLeftElement={
                <Icon
                  as={<Ionicons name="person" />}
                  size={6}
                  marginRight={2}
                  ml="2"
                  color={colors.orange}
                />
              }
              placeholder="Apellidos"
              value={values.lastNames}
              onChangeText={handleChange('lastNames')}
              onBlur={handleBlur('lastNames')}
              error={errors.lastNames}
              touched={touched.lastNames}
            />
            <Input
              variant={'underlined'}
              size={'lg'}
              w={{base: '80%', md: '25%'}}
              InputLeftElement={
                <Icon
                  as={<Entypo name="mail" />}
                  size={6}
                  marginRight={2}
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
            <Input
              variant={'underlined'}
              size={'lg'}
              w={{base: '80%', md: '25%'}}
              InputLeftElement={
                <Icon
                  as={<Entypo name="phone" />}
                  marginRight={2}
                  size={6}
                  ml="2"
                  color={colors.orange}
                />
              }
              placeholder="Telefóno"
              keyboardType={'numeric'}
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={errors.phone}
              touched={touched.phone}
            />
            <Input
              variant={'underlined'}
              w={{base: '80%', md: '25%'}}
              type={hidePassword ? 'text' : 'password'}
              size={'lg'}
              InputLeftElement={
                <Icon
                  as={<Entypo name="key" />}
                  size={6}
                  marginRight={2}
                  ml="2"
                  color={colors.orange}
                />
              }
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={hidePassword ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={6}
                  mr="2"
                  color="muted.400"
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              placeholder="Contraseña"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
            <Pressable onPress={() => showMode('date')}>
              <Input
                variant={'underlined'}
                size={'lg'}
                name={'birthday'}
                w={{
                  base: '100%',
                  md: '25%',
                }}
                InputLeftElement={
                  <Icon
                    as={<Fontisto name="date" />}
                    size={6}
                    marginRight={2}
                    ml="2"
                    color={colors.orange}
                  />
                }
                placeholder="Fecha de Nacimiento"
                value={birthday.front}
                editable={false}
                onChangeText={handleChange('birthday')}
                onBlur={handleBlur('birthday')}
                error={errors.birthday}
                touched={touched.birthday}
              />
            </Pressable>
            <Stack>
              {show && (
                <DateTimePicker
                  textID={'dateTimePicker'}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display={'default'}
                  onChange={onChange}
                />
              )}
            </Stack>
          </Stack>
          {!isSubmitting && (
            <TouchableOpacity
              style={[styles.buttonLogin, styles.shadow]}
              onPress={handleSubmit}>
              <Text style={styles.textLogin}>Registrarme</Text>
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
      )}
    </Formik>
  );
};
export default FormSignUp;
