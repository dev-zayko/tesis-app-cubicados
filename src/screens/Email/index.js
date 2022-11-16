import React, {useEffect, useState} from 'react';
import Background from '../../components/Background';
import {Flex, HStack, Icon, Stack, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import mailService from '../../services/auth/mailService';
import {useFocusEffect} from '@react-navigation/native';

const EmailVerification = () => {
  const {user: currentUser} = useSelector(state => state.auth);
  const {token: currentToken} = useSelector(state => state.utility);
  const [reset, setReset] = useState(false);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (reset === true) {
      mailService.sendEmailVerification(
        currentUser.email,
        currentUser.first_name,
        currentToken,
      );
    }
  }, [reset]);

  const verificate = () => {
    mailService.emailVerificate(currentToken).then(response => {});
  };
  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Stack
          w="85%"
          h={600}
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
                {currentUser.email}
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
