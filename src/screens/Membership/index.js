import React from 'react';
import Background from '../../components/Background';
import {Button, Flex, HStack, Stack, Text, VStack} from 'native-base';
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

const Membership = () => {
  return (
    <Background>
      <Stack h={'100%'} justifyContent={'center'} space={5} top={10}>
        <Stack alignItems={'center'}>
          <Stack
            w="85%"
            h={500}
            style={[styles.ContainerStyle, styles.shadow]}
            backgroundColor={colors.primary}>
            <Flex alignItems={'center'} marginTop={3}>
              <Text fontSize={'3xl'}>Membresia</Text>
            </Flex>
            <HStack marginTop={3} space={2} justifyContent={'center'}>
              <Stack
                backgroundColor={colors.orange}
                borderRadius={50}
                w={150}
                alignItems={'center'}>
                <Text fontSize={'md'} color={colors.primary}>
                  Membresia Basica
                </Text>
              </Stack>
            </HStack>
            <VStack space={5} left={3} top={5}>
              <Text>Caracteristicas del plan:</Text>
              <HStack>
                <VStack space={5} left={3} top={5}>
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
                <VStack space={5} left={5} top={5}>
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

            <Stack style={styles.containerButtonPlan} alignItems={'center'}>
              <TouchableOpacity style={styles.buttonPlan}>
                <Text color={colors.primary}>Subir a premium</Text>
              </TouchableOpacity>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Background>
  );
};
export default Membership;
