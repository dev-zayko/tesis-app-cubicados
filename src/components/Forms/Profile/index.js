import React from 'react';
//Formik
import {Formik} from 'formik';
//Components Native Base
import {FormControl, Input, VStack} from 'native-base';

const FormProfile = props => {
  return (
    <Formik
      initialValues={{telefono: '', password: '', matchPassword: ''}}
      onSubmit={(values, {setSubmitting}) => {}}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <FormControl>
          <VStack space={2}>
            {props.edit === 1 ? (
              <Input variant="outline" placeholder="Telefóno" size={'lg'} />
            ) : (
              <>
                <Input variant="outline" size={'lg'} placeholder="Contraseña" />
                <Input
                  variant="outline"
                  size={'lg'}
                  placeholder="Confirmar contraseña"
                />
              </>
            )}
          </VStack>
        </FormControl>
      )}
    </Formik>
  );
};

export default FormProfile;
