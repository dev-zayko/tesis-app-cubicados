//React
import React, {useRef, useState} from 'react';
//Components native base
import {
  Actionsheet,
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Text,
} from 'native-base';
//Vector React-native
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Alert Projects Delete
import AlertDelete from '../../AlertDialog/Projects/AlertDelete';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import AlertPremium from '../../AlertDialog/AlertPremium';

const ActionSheetProjects = props => {
  const [isOpenAlertDl, setIsOpenAlertDl] = useState(false);
  const [isOpenAlertPr, setIsOpenAlerPr] = useState(false);
  const {userData} = useSelector(state => ({...state.auth}));

  const cancelRef = useRef(null);
  const onCloseAlertDl = () => setIsOpenAlertDl(false);

  const onNavigateProject = () => {
    props.navigation.navigate('Rooms', {
      params: {
        project: props?.project,
      },
    });
    props.onClose();
  };

  const onChargeToPDF = () => {
    props.export();
  };
  return (
    <>
      <Center>
        <Actionsheet isOpen={props.isOpen} onClose={props.onClose} size="full">
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <HStack space={2}>
                <Icon as={MaterialCommunityIcons} size="8" name="shield-home" />
                <Text
                  fontSize="18"
                  color="gray.500"
                  _dark={{
                    color: 'gray.300',
                  }}>
                  {props.project.name}
                </Text>
              </HStack>
              <Divider my="3" bg={'gray.400'} />
            </Box>
            <Actionsheet.Item
              startIcon={<Icon as={AntDesign} size="6" name="eye" />}
              onPressIn={onNavigateProject}>
              Ver
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={AntDesign}
                  size="6"
                  name="pdffile1"
                  color={
                    userData.membership_id === 1 ? 'orange.600' : 'light.800'
                  }
                />
              }
              onPressIn={
                userData.membership_id === 1
                  ? () => setIsOpenAlerPr(true)
                  : onChargeToPDF
              }>
              <HStack space={10}>
                <Text
                  fontSize={16}
                  color={
                    userData.membership_id === 1 ? 'orange.600' : 'light.800'
                  }>
                  Exportar a PDF
                </Text>
                {userData.membership_id === 1 ? (
                  <>
                    <Icon
                      as={MaterialCommunityIcons}
                      name={'crown'}
                      size={'lg'}
                      color={'orange.600'}
                    />
                  </>
                ) : (
                  ''
                )}
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Icon as={FontAwesome} name="edit" size="6" />}
              onPressIn={() => props.actionModal()}>
              Editar
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Icon as={MaterialIcons} name="delete" size="6" />}
              onPressIn={() => setIsOpenAlertDl(!isOpenAlertDl)}>
              Eliminar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      <>
        {isOpenAlertDl && (
          <AlertDelete
            update={props.update}
            cancelRef={cancelRef}
            isOpen={isOpenAlertDl}
            onClose={() => onCloseAlertDl()}
            projectSelect={props.project}
          />
        )}
        {isOpenAlertPr && (
          <AlertPremium
            update={props.update}
            cancelRef={cancelRef}
            isOpen={isOpenAlertPr}
            isOpenPlan={() => props.isOpenPlan()}
            onClose={() => setIsOpenAlerPr(!isOpenAlertPr)}
          />
        )}
      </>
    </>
  );
};

export default ActionSheetProjects;
