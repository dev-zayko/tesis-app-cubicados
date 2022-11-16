import React, {useState} from 'react';
import {Button, HStack, Icon, Modal, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {styles} from '../../styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FormProfile from '../../Forms/Profile';

const ModalProfile = props => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            {props.edit === 1 ? 'Editar Telefóno' : 'Nueva contraseña'}
          </Modal.Header>
          <Modal.Body>
            <FormProfile edit={props.edit} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              colorScheme={'warning'}
              onPress={() => {
                setModalVisible(false);
              }}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <VStack space={8} alignItems="center">
        <TouchableOpacity
          style={styles.buttonChange}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <HStack space={3}>
            <Icon
              as={Entypo}
              top={1}
              size="md"
              name={'edit'}
              color="light.50"
            />
          </HStack>
        </TouchableOpacity>
      </VStack>
    </>
  );
};
export default ModalProfile;
