import React from 'react';
//Formik for forms
import {Formik} from 'formik';
//Components Native Base
import {FormControl, Input, VStack, WarningOutlineIcon} from 'native-base';
//Hook redux
import {useDispatch, useSelector} from 'react-redux';
//Slice Update project
import {createRoom, updateRoom} from '../../../redux/features/Rooms/roomSlice';
import * as Yup from 'yup';
import {Alert} from 'react-native';

const FormRooms = props => {
  //#region Hooks
  const dispatch = useDispatch();
  console.log(props?.project);
  //Esta constante user guarda el token que proviene del authSlice
  const {user} = useSelector(state => ({...state.auth}));
  //# endregion hooks

  //#region Arrow Functions
  const onUpdateRoom = values => {
    if (values.name === props?.room.name) {
      props.closeSubmit();
    } else {
      console.log(props?.project);
      dispatch(
        updateRoom({
          token: user,
          idProject: props?.project,
          idRoom: props?.room.id,
          name: values.name,
        }),
      )
        .then(response => {
          if (response.payload.status === 'duplicated') {
            Alert.alert(
              'Aviso',
              'Recuerda el nombre de la habitación es unico, por favor escoge otro',
              [{text: 'OK', onPress: () => props.cancelSubmit()}],
            );
          } else {
            props.closeSubmit();
          }
        })
        .catch(error => console.log(error.response.data));
    }
  };

  const onCreateRooms = values => {
    dispatch(
      createRoom({
        token: user,
        name: values.name,
        idProject: props?.project,
        toast: props.toast,
      }),
    ).then(response => {
      const {status} = response.payload;
      props.alertLimited(status, 'Habitaciones');
      props.closeSubmit();
    });
  };
  //#endregion
  //#region Schema for validation of input
  const roomValidation = Yup.object({
    name: Yup.string()
      .nullable('No se puede dejar campos vacios')
      .required('Campo requerido'),
  });
  //#endregion

  return (
    <>
      <Formik
        initialValues={{name: props.action === 1 ? '' : props.room.name}}
        innerRef={props.formRef}
        validationSchema={roomValidation}
        onSubmit={(values, {setSubmitting}) => {
          if (props.action === 1) {
            onCreateRooms(values);
          } else {
            console.log('update');
            onUpdateRoom(values);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <FormControl isInvalid={errors.name && true}>
            <VStack space={2}>
              <Input
                variant="outline"
                size={'lg'}
                placeholder="Nombre habitación"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                value={values.name}
                touched={touched.name}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {errors.name}
              </FormControl.ErrorMessage>
            </VStack>
          </FormControl>
        )}
      </Formik>
    </>
  );
};

export default FormRooms;
