import React from 'react';
//Formik
import {Formik} from 'formik';
//Components Native Base
import {FormControl, Input, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {updatePhone} from '../../../redux/features/Auth/authSlice';

const FormProfile = props => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const onUpdatePhone = (values) => {
    dispatch(updatePhone({
      tokenOld: user,
      newPhone: values.phone
    })).then(() => {
      props.closeSubmit();
    });
  };

  const onUpdatePassword = () => {

  }

  return (
    <Formik
      initialValues={{phone: '', password: '', matchPassword: ''}}
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
                touched={touched.phone} />
            ) : (
              <>
                <Input
                  variant="outline"
                  placeholder="Contraseña antigua"
                  size={'lg'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  value={values.password}
                  touched={touched.password} />
                <Input
                  variant="outline"
                  placeholder="Contraseña nueva"
                  size={'lg'}
                  onChangeText={handleChange('matchPassword')}
                  onBlur={handleBlur('matchPassword')}
                  error={errors.matchPassword}
                  value={values.matchPassword}
                  touched={touched.matchPassword} />
              </>
            )}
          </VStack>
        </FormControl>
      )}
    </Formik>
  );
};

export default FormProfile;
