import React, {useState} from 'react';
import {HStack, Icon, IconButton, Stack, Text} from 'native-base';
import {styles} from '../styles';
import {colors} from '../colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OptionAccount = props => {
  // const [showModal, setShowModal] = useState(false);
  const handleNavigateProfile = () => {
    props.navigator.navigate('Profile');
  };
  const handleNavigateMember = () => {
    props.navigator.navigate('Membership');
  };
  return (
    <>
      <HStack w={'100%'} space={3} top={5}>
        <Stack
          w={'26%'}
          h={100}
          style={[styles.ContainerStyle, styles.shadow]}
          backgroundColor={colors.primary}>
          <Stack alignItems={'center'}>
            <IconButton
              mb="0"
              onPress={handleNavigateProfile}
              colorScheme="cyan"
              borderRadius="full"
              icon={
                <Icon
                  as={AntDesign}
                  _dark={{
                    color: 'warning.600',
                  }}
                  size="5xl"
                  name="profile"
                  color="warning.600"
                />
              }
            />
            <Text fontSize={'sm'}>Ver Perfil</Text>
          </Stack>
        </Stack>
        <Stack
          w={'26%'}
          h={100}
          style={[styles.ContainerStyle, styles.shadow]}
          backgroundColor={colors.primary}>
          <Stack alignItems={'center'}>
            <IconButton
              mb="0"
              onPress={handleNavigateMember}
              colorScheme="cyan"
              borderRadius="full"
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  _dark={{
                    color: 'warning.600',
                  }}
                  size="5xl"
                  name="wallet-membership"
                  color="warning.600"
                />
              }
            />
            <Text fontSize={'sm'}>Membresia</Text>
          </Stack>
        </Stack>
        <Stack
          w={'26%'}
          h={100}
          style={[styles.ContainerStyle, styles.shadow]}
          backgroundColor={colors.primary}>
          <Stack alignItems={'center'}>
            <IconButton
              mb="0"
              colorScheme="cyan"
              borderRadius="full"
              icon={
                <Icon
                  as={MaterialIcons}
                  _dark={{
                    color: 'warning.600',
                  }}
                  size="5xl"
                  name="payment"
                  color="warning.600"
                />
              }
            />
            <Text fontSize={'sm'}>Mis Pagos</Text>
          </Stack>
        </Stack>
      </HStack>
      {/*{showModal &&*/}
      {/* <ModalProfile show={showModal} close={() => setShowModal(false)}/>}*/}
    </>
  );
};
export default OptionAccount;
