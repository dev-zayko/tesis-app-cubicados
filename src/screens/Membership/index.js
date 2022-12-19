import React, {useState} from 'react';
import Background from '../../components/Background';
import {Button, Flex, HStack, Stack, Text, VStack, Icon, Image} from 'native-base';
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import ModalMemberships from '../../components/Modals/Membership';
import {useSelector} from 'react-redux';


const Membership = ({navigation}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {userData} = useSelector(state => ({...state.auth}));
  const {memberships} = userData;
  return (
    <Background>
      <Stack h={'100%'} justifyContent={'center'} space={5}>
        <Stack alignItems={'center'}>
          <Stack
            w="80%"
            h={500}
            style={[styles.ContainerStyle, styles.shadow]}
            backgroundColor={colors.primary}
            alignItems={'center'}>
            <Flex alignItems={'center'}>
              {memberships.id !== 1 &&
                <Image
                  source={require('../../assets/logo-premium.png')}
                  alt="logo-premium"
                  width={50}
                  height={50}
                />
              }
              <Text fontSize={'3xl'}>Membresia</Text>
            </Flex>
            <Stack w={'100%'} alignItems={'center'} h={10} justifyContent={'center'}>
              <Stack
                backgroundColor={colors.orange}
                borderRadius={50}
                w={150}
                alignItems={'center'}>
                <Text fontSize={'md'} color={colors.primary}>
                  {memberships.name}
                </Text>
              </Stack>
            </Stack>
            <VStack space={5} h={'50%'} justifyContent={'flex-end'} w={'90%'} alignItems={'center'}>
              <VStack space={5}>
                <HStack space={2}>
                  <AntDesign
                    name={'checkcircle'}
                    style={styles.icon}
                    size={24}
                    color={memberships.id === 1 ? colors.red : colors.otherGreen}
                  />
                  <Text>Proyectos Ilimitados</Text>
                </HStack>
                <HStack space={2}>
                  <AntDesign
                    name={'checkcircle'}
                    style={styles.icon}
                    size={24}
                    color={memberships.id === 1 ? colors.red : colors.otherGreen}
                  />
                  <Text>Habitaciones Ilimitadas</Text>
                </HStack>
                <HStack space={2}>
                  <AntDesign
                    name={'checkcircle'}
                    style={styles.icon}
                    size={24}
                    color={memberships.id === 1 ? colors.red : colors.otherGreen}
                  />
                  <Text>Cubicaciones Ilimitadas</Text>
                </HStack>

                <HStack space={2}>
                  <AntDesign
                    name={'checkcircle'}
                    style={styles.icon}
                    size={24}
                    color={colors.otherGreen}
                  />
                  <Text>Gestionar proyectos</Text>
                </HStack>
                <HStack space={2}>
                  <AntDesign
                    name={'closecircle'}
                    style={styles.icon}
                    size={24}
                    color={colors.red}
                  />
                  <Text>Soporte full</Text>
                </HStack>

              </VStack>
            </VStack>
            <Stack w={'100%'} h={'30%'} justifyContent={'center'} alignItems={'center'}>
              {memberships.id === 1 &&
                <TouchableOpacity onPress={() => setIsOpenModal(true)} style={styles.buttonLogin}>
                  <HStack space={2}>
                    <AntDesign
                      name={'star'}
                      style={styles.icon}
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.textLogin}>Subir a premium</Text>
                  </HStack>
                </TouchableOpacity>
              }
            </Stack>
          </Stack>
        </Stack>
        {isOpenModal && (
          <ModalMemberships
            navigation={navigation}
            onClose={() => setIsOpenModal(false)}
            isOpen={isOpenModal}
          />
        )}
      </Stack>
    </Background>
  );
};
export default Membership;
