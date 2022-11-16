import React, {useState} from 'react';
//Formik for forms
import {Formik} from 'formik';
//Components Native Base
import {
  FormControl,
  Input,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
//Hook redux
import {useDispatch, useSelector} from 'react-redux';
//Slice Update project
import {
  createProject,
  updateProject,
} from '../../../redux/features/Projects/projectSlice';
import * as Yup from 'yup';

const FormProject = props => {
  //#region Hooks
  const dispatch = useDispatch();
  //Esta constante user guarda el token que proviene del authSlice
  const {user} = useSelector(state => ({...state.auth}));
  //# endregion hooks

  //#region Arrow Functions
  const onUpdateProject = values => {
    const {id} = props?.project;
    dispatch(
      updateProject({
        id: id,
        name: values.name,
        token: user,
        toast: props.toast,
      }),
    ).then(() => {
      props.closeSubmit();
    });
  };

  const onCreateProject = values => {
    dispatch(
      createProject({name: values.name, token: user, toast: props.toast}),
    ).then(response => {
      const {data} = response.payload;
      props.alertLimited(data);
      props.closeSubmit();
    });
  };
  //#endregion
  //#region Schema for validation of input
  const projectValidation = Yup.object({
    name: Yup.string()
      .nullable('No se puede dejar campos vacios')
      .required('Campo requerido'),
  });
  //#endregion

  return (
    <>
      <Formik
        initialValues={{name: props.action === 1 ? '' : props.project?.name}}
        innerRef={props.formRef}
        validationSchema={projectValidation}
        onSubmit={(values, {setSubmitting}) => {
          if (props.action === 1) {
            //Si action vale 1 se ejecuta la arrow function que crea un proyecto nuevo
            onCreateProject(values);
          } else {
            //De lo contrario se ejecuta esta arrow function que actualiza el proyecto seleccionado en el componente anterior
            onUpdateProject(values);
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
                placeholder="Nombre proyecto"
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

export default FormProject;
