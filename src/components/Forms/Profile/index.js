import React from 'react';
//Formik
import {Formik} from 'formik';
//Components Native Base
import {FormControl, Input, useToast, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  updatePassword,
  updatePhone,
} from '../../../redux/features/Auth/authSlice';

const FormProfile = props => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {user} = useSelector(state => ({...state.auth}));
  const onUpdatePhone = values => {
    dispatch(
      updatePhone({
        tokenOld: user,
        newPhone: values.phone,
      }),
    ).then(() => {
      props.closeSubmit();
    });
  };

  const onUpdatePassword = values => {
    dispatch(
      updatePassword({
        tokenOld: user,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        toast: toast,
      }),
    ).then(res => {
      if (res.payload === 0) {
        props.closeSubmit();
        toast.show({
          description: 'La contraseña antigua no es correcta',
        });
      } else {
        props.closeSubmit();
        toast.show({
          description: 'Contraseña actualizada',
        });
      }
    });
  };

  return (
    <Formik
      initialValues={{phone: '', oldPassword: '', newPassword: ''}}
      innerRef={props.formRef}
      onSubmit={(values, {setSubmitting}) => {
        if (props.edit === 1) {
          onUpdatePhone(values);
        } else {
          onUpdatePassword(values);
        }
      }}>
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
              <Input
                variant="outline"
                placeholder="Telefóno"
                size={'lg'}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={errors.phone}
                value={values.phone}
                touched={touched.phone}
              />
            ) : (
              <>
                <Input
                  variant="outline"
                  placeholder="Contraseña antigua"
                  size={'lg'}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  error={errors.oldPassword}
                  value={values.oldPassword}
                  touched={touched.oldPassword}
                />
                <Input
                  variant="outline"
                  placeholder="Contraseña nueva"
                  size={'lg'}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  error={errors.newPassword}
                  value={values.newPassword}
                  touched={touched.newPassword}
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
