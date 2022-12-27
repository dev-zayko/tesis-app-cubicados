import React, {useRef, useState} from 'react';
import {
  Button,
  HStack,
  Icon,
  KeyboardAvoidingView,
  Modal,
  Stack,
  VStack,
} from 'native-base';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {styles} from '../../styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FormProfile from '../../Forms/Profile';
import {colors} from '../../colors';

const ModalProfile = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const formRef = useRef(null);

  const onSubmit = async () => {
    setIsSubmitting(true);
    await formRef.current.submitForm();
  };
  return (
    <Stack w={'100%'}>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        justifyContent="flex-end"
        bottom="4"
        size="lg">
        <KeyboardAvoidingView w={'100%'} left={'10%'} behavior={'position'}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              {props.edit === 1 ? 'Editar Telefóno' : 'Nueva contraseña'}
            </Modal.Header>
            <Modal.Body>
              <FormProfile
                edit={props.edit}
                formRef={formRef}
                closeSubmit={() => {
                  setIsSubmitting(false);
                  setModalVisible(false);
                }}
                disableForm={disabled => setDisabled(disabled)}
                toast={props.toast}
              />
            </Modal.Body>
            <Modal.Footer>
              {!isSubmitting && (
                <Button
                  flex="1"
                  colorScheme={disabled === false ? 'warning' : 'gray'}
                  onPress={onSubmit}
                  disabled={disabled}>
                  Guardar
                </Button>
              )}
              {isSubmitting && (
                <Button flex="1" colorScheme={'warning'} disabled={true}>
                  <ActivityIndicator size={'small'} color={colors.primary} />
                </Button>
              )}
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
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
    </Stack>
  );
};
export default ModalProfile;
