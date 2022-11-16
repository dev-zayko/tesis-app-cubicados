import React from 'react';
import {AlertDialog, Button, Center, useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProject} from '../../../redux/features/Projects/projectSlice';

const AlertDelete = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const toast = useToast();

  const onDeleteProject = () => {
    dispatch(deleteProject({id: props.projectSelect.id, token: user}))
      .then(() => {
        props.onClose();
        props.update();
      })
      .catch(error => {
        console.log(error);
        toast.show({
          description: 'Ocurrio un error',
        });
      });
  };

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={props.cancelRef}
        isOpen={props.isOpen}
        onClose={props.onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{props.projectSelect.name}</AlertDialog.Header>
          <AlertDialog.Body>
            Estas seguro de eliminar el proyecto
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
              <Button colorScheme="danger" onPress={onDeleteProject}>
                Eliminar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertDelete;
