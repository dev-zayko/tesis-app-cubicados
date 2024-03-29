import React, {useRef, useState} from 'react';
import {Button, KeyboardAvoidingView, Modal} from 'native-base';
import FormRooms from '../../Forms/Rooms';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../colors';

const ModalRooms = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef(null);
  const onSubmit = async () => {
    setIsSubmitting(true);
    await formRef.current.submitForm();
  };
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          props.onClose();
          setIsSubmitting(false);
        }}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg">
        <KeyboardAvoidingView w={'100%'} behavior={'padding'} left={'10%'}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              {props.action === 1 ? 'Nueva Habitación' : 'Editar Habitación'}
            </Modal.Header>
            <Modal.Body>
              <FormRooms
                formRef={formRef}
                room={props?.room}
                action={props.action}
                project={props?.project}
                cancelSubmit={() => setIsSubmitting(false)}
                closeSubmit={() => {
                  setIsSubmitting(false);
                  props.onClose();
                  props.onCloseAll();
                }}
                alertLimited={(status, typeConstruction) =>
                  props.alertLimited(status, typeConstruction)
                }
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
    </>
  );
};

export default ModalRooms;
