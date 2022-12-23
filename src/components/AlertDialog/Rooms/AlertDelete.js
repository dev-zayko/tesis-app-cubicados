import React from 'react'
import {AlertDialog, Button, Center, useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {deleteRoom} from '../../../redux/features/Rooms/roomSlice';
import {ActivityIndicator} from 'react-native';


const AlertDelete = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const {loading} = useSelector(state => ({...state.room}));
  const toast = useToast();

  const onDeleteRoom = () => {
    dispatch(deleteRoom({
      token: user,
      idProject: props.project,
      idRoom: props.roomSelect.id,
      toast: toast
    })).then(() => {
      props.onClose();
      props.update();
    });
  }

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={props.cancelRef}
        isOpen={props.isOpen}
        onClose={props.onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{props.roomSelect.name}</AlertDialog.Header>
          <AlertDialog.Body>
            Estas seguro de eliminar la habitación
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
              {loading === true ?
                <>
                  <Button colorScheme="danger" disabled={true}>
                    <ActivityIndicator size={'small'} color={'white'} />
                  </Button>
                </> :
                <>
                  <Button colorScheme="danger" onPress={() => onDeleteRoom()}>
                    Eliminar
                  </Button>
                </>
              }
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default AlertDelete;
