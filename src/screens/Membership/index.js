import React, {useState} from 'react';
import Background from '../../components/Background';
import {Button, Flex, HStack, Stack, Text, VStack} from 'native-base';
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import ModalMemberships from '../../components/Modals/Membership';

const Membership = ({navigation}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <Background>
      <Stack h={'100%'} justifyContent={'center'} space={5}>
        <Stack alignItems={'center'}>
          <Stack
            w="85%"
            h={500}
            style={[styles.ContainerStyle, styles.shadow]}
            backgroundColor={colors.primary}
            alignItems={'center'}>
            <Flex alignItems={'center'}>
              <Text fontSize={'3xl'}>Membresia</Text>
            </Flex>
            <Stack w={'100%'} alignItems={'center'} h={10} justifyContent={'center'}>
              <Stack
                backgroundColor={colors.orange}
                borderRadius={50}
                w={150}
                alignItems={'center'}>
                <Text fontSize={'md'} color={colors.primary}>
                  Membresia Basica
                </Text>
              </Stack>
            </Stack>
            <VStack space={5} h={'50%'} justifyContent={'center'} w={'90%'} alignItems={'center'}>
              <HStack>
                <VStack space={5} left={3}>
                  <HStack space={2}>
                    <AntDesign
                      name={'checkcircle'}
                      style={styles.icon}
                      size={24}
                      color={colors.otherGreen}
                    />
                    <Text>2 proyectos</Text>
                  </HStack>
                  <HStack space={2}>
                    <AntDesign
                      name={'checkcircle'}
                      style={styles.icon}
                      size={24}
                      color={colors.otherGreen}
                    />
                    <Text>4 habitaciones</Text>
                  </HStack>
                  <HStack space={2}>
                    <AntDesign
                      name={'checkcircle'}
                      style={styles.icon}
                      size={24}
                      color={colors.otherGreen}
                    />
                    <Text>8 Cubicaciones</Text>
                  </HStack>
                </VStack>
                <VStack space={5} left={5}>
                  <HStack space={2}>
                    <AntDesign
                      name={'checkcircle'}
                      style={styles.icon}
                      size={24}
                      color={colors.otherGreen}
                    />
                    <Text>Exportar tus Pagos</Text>
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
              </HStack>
            </VStack>
            <Stack w={'100%'} h={'30%'} justifyContent={'center'} alignItems={'center'}>
              <TouchableOpacity onPress={() => setIsOpenModal(true)} style={styles.buttonLogin}>
                <Text style={styles.textLogin}>Subir a premium</Text>
              </TouchableOpacity>
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
