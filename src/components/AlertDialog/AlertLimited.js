import React from 'react';
import {AlertDialog, Button, Center} from 'native-base';

const AlertLimited = props => {
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
            {props.status === 'discontinued'
              ? 'Tu cuenta esta suspendida por no pago'
              : props.status === 'limited' &&
                'Has alcanzado el limite de proyectos disponibles'}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={props.onClose}
                ref={props.cancelRef}>
                Cancelar
              </Button>
              {props.status === 'discontinued' ? (
                <Button colorScheme="danger">Renovar Pago</Button>
              ) : (
                props.status === 'limited' && (
                  <Button colorScheme="danger">Comprar premium</Button>
                )
              )}
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertLimited;
