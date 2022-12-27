import React from 'react';
import {Divider, Flex, HStack, Image, Stack, Text, VStack} from 'native-base';
import Background from '../../components/Background';
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import ModalProfile from '../../components/Modals/Profile';
import {useSelector} from 'react-redux';
import Moment from 'moment';

const Profile = ({navigation}) => {
  const {userData} = useSelector(state => ({...state.auth}));
  const formatDate = date => {
    return Moment().format('DD-MM-YYYY');
  };
  return (
    <Background>
      {userData && (
        <Stack h={'100%'} justifyContent={'center'} space={5} top={10}>
          <Stack alignItems={'center'}>
            <Stack
              w="85%"
              h={500}
              style={[styles.ContainerStyle, styles.shadow]}
              backgroundColor={colors.primary}>
              <Flex alignItems={'center'} marginTop={3}>
                <Text bold fontSize={'3xl'}>
                  Detalles Perfil
                </Text>
              </Flex>
              <HStack space={8}>
                <Image
                  size={20}
                  style={styles.imagePerfil}
                  source={require('../../assets/image-profile.png')}
                  alt="Constructor"
                />
                <VStack w={'65%'} space={2} justifyContent={'center'}>
                  <Text fontSize={15}>{userData.email}</Text>
                  <HStack
                    w={'50%'}
                    justifyContent={'center'}
                    backgroundColor={
                      userData?.user_status.id === 1
                        ? colors.otherGreen
                        : colors.orange
                    }
                    borderRadius={50}>
                    <Text color={'light.50'} fontSize={'md'} bold>
                      {userData?.user_status.description}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <VStack top={5}>
                <Divider />
              </VStack>
              <VStack space={4} marginTop={10}>
                <HStack space={2} left={5}>
                  <Text fontSize={'md'} color={'light.500'}>
                    Nombre:{' '}
                  </Text>
                  <Text fontSize={'md'} color={'light.500'}>
                    {userData.first_name} {userData.second_name || ''}
                  </Text>
                </HStack>
                <Divider />
                <HStack space={2} left={5}>
                  <Text fontSize={'md'} color={'light.500'}>
                    Apellido 1:{' '}
                  </Text>
                  <Text fontSize={'md'} color={'light.500'}>
                    {userData.father_last_name}
                  </Text>
                </HStack>
                <Divider />
                <HStack space={2} left={5}>
                  <Text fontSize={'md'} color={'light.500'}>
                    Apellido 2:{' '}
                  </Text>
                  <Text fontSize={'md'} color={'light.500'}>
                    {userData.mother_last_name || ''}
                  </Text>
                </HStack>
                <Divider />
                <HStack space={2} left={5}>
                  <Text fontSize={'md'} color={'light.500'}>
                    Telefóno
                  </Text>
                  <Text fontSize={'md'} color={'light.500'}>
                    {userData.phone || 'No especificado'}
                  </Text>
                  <Stack>
                    <ModalProfile edit={1} />
                  </Stack>
                </HStack>
                <Divider />
                <HStack space={2} left={5}>
                  <Text fontSize={'md'} color={'light.500'}>
                    Contraseña
                  </Text>
                  <Text fontSize={'md'} color={'light.500'}>
                    *********
                  </Text>
                  <Stack>
                    <ModalProfile edit={2} />
                  </Stack>
                </HStack>
                <Divider />
                <HStack justifyContent={'center'} space={1}>
                  <Text fontSize={13} color={'gray.500'}>
                    Miembro desde el
                  </Text>
                  <Text fontSize={13} color={'gray.500'}>
                    {formatDate(userData.actived_at)}
                  </Text>
                </HStack>
              </VStack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Background>
  );
};

export default Profile;
