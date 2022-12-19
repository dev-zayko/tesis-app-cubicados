//React
import React, {useState, useRef} from 'react';
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

const ActionSheetProjects = props => {
  const [isOpenAlertDl, setIsOpenDl] = useState(false);

  const cancelRef = useRef(null);
  const onCloseAlertDl = () => setIsOpenDl(false);

  const onNavigateProject = () => {
    props.navigation.navigate('Rooms', {
      params: {
        project: props?.project,
      },
    });
    props.onClose();
  };

  const onChargeToPDF = () => {

  }
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
              startIcon={<Icon as={AntDesign} size="6" name="pdffile1" />}
              onPressIn={onNavigateProject}>
              Exportar a PDF
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Icon as={FontAwesome} name="edit" size="6" />}
              onPressIn={() => props.actionModal()}>
              Editar
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Icon as={MaterialIcons} name="delete" size="6" />}
              onPressIn={() => setIsOpenDl(!isOpenAlertDl)}>
              Eliminar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      {isOpenAlertDl && (
        <AlertDelete
          update={props.update}
          cancelRef={cancelRef}
          isOpen={isOpenAlertDl}
          onClose={() => onCloseAlertDl()}
          projectSelect={props.project}
        />
      )}
    </>
  );
};

export default ActionSheetProjects;
