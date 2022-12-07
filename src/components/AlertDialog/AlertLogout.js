import React, {useRef} from 'react';
import {AlertDialog, Button, Center} from 'native-base';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/auth';

const AlertLogout = props => {
  const dispatch = useDispatch();
  const onLogout = () => {
    props.close();
    dispatch(logout()).then(response => {
      if (response.status === 'success') {
        props.navigator.navigate('LoginScreen');
      }
    });
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
              <Button colorScheme="warning" onPress={onLogout}>
                Salir
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};
export default AlertLogout;
