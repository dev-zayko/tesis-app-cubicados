import React from "react";
import {AlertDialog} from "native-base";
import {Button, Text} from "native-base";

const AlertEmpty = props => {
  const otherStore = () => {
    props.otherStore();
    props.onClose();
  };

  return (
    <AlertDialog leastDestructiveRef={props.cancelRef} isOpen={props.isOpen} onClose={props.onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>¡Aviso!</AlertDialog.Header>
        <AlertDialog.Body>
          <Text fontSize={15}>
            ¡Ups! No hay productos en esta comuna, ¿Deseas intentar en otra comuna u otra tienda?
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button colorScheme="danger" onPress={() => otherStore()} ref={props.cancelRef}>
              Otra Tienda
            </Button>
            <Button colorScheme="warning" onPress={props.onClose} ref={props.cancelRef}>
              Otra Comuna
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export default AlertEmpty;
