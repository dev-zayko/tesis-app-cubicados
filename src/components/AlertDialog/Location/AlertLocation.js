import React from 'react';
import {AlertDialog, Button, Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const AlertLocation = props => {
  const navigation = useNavigation();

  const onNavigateQuoter = () => {
    navigation.navigate('Quoter');
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
          <AlertDialog.Body>En que ubicación deseas cotizar?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="warning"
                onPress={props.onClose}
                ref={props.cancelRef}
                onPressIn={onNavigateQuoter}>
                Mia
              </Button>
              <Button colorScheme="danger">Otra</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertLocation;
