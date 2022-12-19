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
              : props.status === 'limited' ?
                `Has alcanzado el limite de ${props.typeConstruction}, ¡Sube a PREMIUM para crear más!`
                : props.status === 'duplicated' && 'Ya tienes una habitación con este nombre'}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="warning"
                onPress={props.onClose}
                ref={props.cancelRef}>
                {props.status === 'duplicated' ? 'Ok' : 'Cancelar'}
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
