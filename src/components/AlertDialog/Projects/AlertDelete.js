import React, {useState} from 'react';
import {AlertDialog, Button, Center, useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProject} from '../../../redux/features/Projects/projectSlice';
import {ActivityIndicator} from 'react-native';

const AlertDelete = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const {loading} = useSelector(state => ({...state.project}));
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDeleteProject = () => {
    setIsSubmitting(true);
    dispatch(deleteProject({id: props.projectSelect.id, token: user}))
      .then(() => {
        setIsSubmitting(false);
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
            ¿Estas seguro de eliminar el proyecto?
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
              {isSubmitting === true ? (
                <>
                  <Button colorScheme="danger" disabled={true}>
                    <ActivityIndicator size={'small'} color={'white'} />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    colorScheme="danger"
                    onPress={() => onDeleteProject()}>
                    Eliminar
                  </Button>
                </>
              )}
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertDelete;
