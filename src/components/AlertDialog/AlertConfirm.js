import React from 'react';
import {AlertDialog, Button, Center} from 'native-base';

const AlertConfirm = props => {
  const onNavigate = () => {
    props.close();
    props.onConfirm();
  };
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={props.cancelRef}
        isOpen={props.open}
        onClose={() => props.close()}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Aviso</AlertDialog.Header>
          <AlertDialog.Body>Esta a punto de cerrar sesión</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => props.close()}
                ref={props.cancelRef}>
                Cancelar
              </Button>
              <Button colorScheme="warning" onPress={onNavigate}>
                Salir
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};
export default AlertConfirm;
