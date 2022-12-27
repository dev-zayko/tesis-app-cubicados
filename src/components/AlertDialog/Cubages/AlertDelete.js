import React, {useState} from 'react';
import {AlertDialog, Button, Center, useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCubage} from '../../../redux/features/Cubages/cubagesSlice';
import {ActivityIndicator} from 'react-native';

const AlertDelete = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const {loading} = useSelector(state => ({...state.cubages}));
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDeleteCubages = () => {
    setIsSubmitting(true);
    dispatch(
      deleteCubage({
        token: user,
        idCubage: props.idCubage,
        idMaterial: props.idMaterial,
        idProject: props.idProject,
        idRoom: props.idRoom,
      }),
    ).then(() => {
      setIsSubmitting(false);
      props.update();
      props.onCloseAll();
      toast.show({
        description: 'Cubicación Eliminada',
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
          <AlertDialog.Header>Aviso</AlertDialog.Header>
          <AlertDialog.Body>
            ¿Estas seguro de eliminar esta cubicación?
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
                    onPress={() => onDeleteCubages()}>
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
