import React from 'react';
import {AlertDialog, Button, Center} from 'native-base';

const AlertPremium = props => {
  const onNavigation = () => {
    props.onClose();
    props.isOpenPlan();
  };
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={props.cancelRef}
        isOpen={props.isOpen}
        onClose={props.onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Aviso</AlertDialog.Header>
          <AlertDialog.Body>
            Esta es una función PREMIUM para usarla compra un plan!
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="warning"
                onPress={props.onClose}
                ref={props.cancelRef}>
                Cancelar
              </Button>
              <Button colorScheme="danger" onPress={() => onNavigation()}>
                Comprar premium
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertPremium;
