import React, {useRef, useState} from 'react';
import {Button, Modal} from 'native-base';
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
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Nueva Habitación</Modal.Header>
          <Modal.Body>
            <FormRooms
              formRef={formRef}
              project={props?.project}
              closeSubmit={() => {
                setIsSubmitting(false);
                props.onClose();
                props.onCloseAll();
              }}
              alertLimited={status => props.alertLimited(status)}
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
      </Modal>
    </>
  );
};

export default ModalRooms;
