import React, {useRef, useState} from 'react';
import {Button, KeyboardAvoidingView, Modal} from 'native-base';
import FormProject from '../../Forms/Projects';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../colors';

const ModalProject = props => {
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
              {props.action === 1 ? 'Nuevo Proyecto' : 'Editar Proyecto'}
            </Modal.Header>
            <Modal.Body>
              <FormProject
                action={props.action}
                project={props.project}
                formRef={formRef}
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
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default ModalProject;
