import React, {useEffect, useState} from 'react';
import Background from '../../components/Background';
import {Flex, HStack, Icon, Stack, Text, useToast} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import mailService from '../../services/auth/mailService';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {login} from '../../redux/features/Auth/authSlice';

const EmailVerification = ({route}) => {
  const {user: dataForm} = route?.params.params;
  const navigation = useNavigation();
  const {user, userData} = useSelector(state => ({...state.auth}));
  const [reset, setReset] = useState(false);
  const [disable, setDisable] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    if (reset === true) {
      mailService.sendEmailVerification(userData.email, userData.first_name, user);
    }
  }, [reset]);

  const verificate = () => {
    mailService.emailVerificate(user).then(response => {
      if (response.verified === true) {
        dispatch(login({user: dataForm, navigation: navigation, toast: toast}));
      } else {
        console.log(response)
        toast.show({
          description: 'No ha sido verificada esta cuenta'
        });
      }
    });
  };
  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Stack
          w="85%"
          h={600}
          borderRadius={10}
          style={[styles.formAuthStyle, styles.shadow]}
          backgroundColor={colors.primary}
          alignItems="center">
          <Stack space={100}>
            <Stack alignItems={'center'}>
              <Stack
                backgroundColor={colors.orange}
                borderRadius={100}
                top={10}>
                <Icon
                  as={Ionicons}
                  name="paper-plane-sharp"
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  size={150}
                />
              </Stack>
            </Stack>
            <Stack w={300} alignItems={'center'} top={10}>
              <Text fontSize={18}>Aun no has verificado tu cuenta: </Text>
              <Text fontSize={18} style={styles.textBold}>
                {userData.email}
              </Text>
            </Stack>
            <Stack alignItems={'center'}>
              <TouchableOpacity
                style={[
                  styles.buttonLogin,
                  disable === true && {backgroundColor: colors.tertiary},
                ]}
                onPress={verificate}
                disabled={disable}>
                <HStack>
                  <Text style={styles.textLogin}>Verificar</Text>
                  <Icon
                    as={MaterialIcons}
                    name="verified-user"
                    color="white"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    size={5}
                    left={5}
                  />
                </HStack>
              </TouchableOpacity>
              <HStack w={300} space={2} alignItems={'center'} top={10}>
                <Text fontSize={15}>¿No has recibido un correo?</Text>
                <TouchableOpacity onPress={() => setReset(true)}>
                  <Text fontSize={15} color={colors.orange} underline>
                    Enviar correo
                  </Text>
                </TouchableOpacity>
              </HStack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Background>
  );
};
export default EmailVerification;
