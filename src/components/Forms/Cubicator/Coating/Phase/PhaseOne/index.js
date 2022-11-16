import React, {useCallback} from 'react';
//Formik
import {Formik} from 'formik';
//Components Native Base
import {
  FormControl,
  Input,
  HStack,
  Text,
  VStack,
  Stack,
  Image,
  useToast,
} from 'native-base';
import {Text as TextReact} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../../../../styles';
import colors from '../../../../../colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const FormPhaseOne = props => {
  const {constructionSelect} = useSelector(state => ({...state.construction}));
  const toast = useToast();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      props.phaseOne();
    }, []),
  );
  const onCubicCoating = values => {
    const {
      length,
      width,
      lengthWindow1,
      widthWindow1,
      lengthWindow2,
      widthWindow2,
    } = values;
    let area = length.replace(',', '.') * width.replace(',', '.');
    let areaWindow1, areaWindow2;
    if (constructionSelect.id === 4) {
      console.log(area);
      navigation.navigate('FormCoatingTwo', {
        params: {
          length: length,
          width: width,
          area: area,
          lengthWindow1: 0,
          widthWindow1: 0,
          lengthWindow2: 0,
          widthWindow2: 0,
        },
      });
    }
    if (constructionSelect.id === 5) {
      if (lengthWindow2 === '' || widthWindow2 === '') {
        areaWindow1 =
          area -
          lengthWindow1.replace(',', '.') * widthWindow1.replace(',', '.');
        area = areaWindow1;
      } else {
        areaWindow1 =
          lengthWindow1.replace(',', '.') * widthWindow1.replace(',', '.');
        areaWindow2 =
          lengthWindow2.replace(',', '.') * widthWindow2.replace(',', '.');
        area = area - (areaWindow1 + areaWindow2);
      }
      if (area <= 0) {
        return toast.show({
          description: 'La ventana no puede medir mas que la pared',
        });
      } else {
        navigation.navigate('FormCoatingTwo', {
          params: {
            length: length,
            width: width,
            area: area,
            lengthWindow1: lengthWindow1,
            widthWindow1: widthWindow1,
            lengthWindow2: lengthWindow2,
            widthWindow2: widthWindow2,
          },
        });
      }
    }
  };

  return (
    <Stack w={'100%'} h={'100%'} backgroundColor={colors.primary}>
      <Formik
        initialValues={{
          length: '',
          width: '',
          lengthWindow1: '',
          widthWindow1: '',
          lengthWindow2: '',
          widthWindow2: '',
        }}
        innerRef={props.formRefPhaseOne}
        onSubmit={(values, {setSubmitting}) => {
          if (constructionSelect.id === 4) {
            if (values.length === '' || values.width === '') {
              toast.show({
                description: 'No puede dejar campos vacios',
              });
            } else {
              onCubicCoating(values);
            }
          }
          if (constructionSelect.id === 5) {
            if (
              values.length === '' ||
              values.width === '' ||
              values.lengthWindow1 === '' ||
              values.widthWindow1 === ''
            ) {
              toast.show({
                description: 'No puede dejar campos vacios',
              });
            } else {
              onCubicCoating(values);
            }
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
            <Stack>
              <Stack
                top={constructionSelect.id === 4 ? 14 : 0}
                space={constructionSelect.id === 4 ? 5 : 0}>
                {constructionSelect.id === 4 && (
                  <Stack w={'100%'} alignItems={'center'}>
                    <Image
                      source={require('../../../../../../assets/logo-muro-ciego.png')}
                      alt="logo-muro-ciego"
                      w={200}
                      h={150}
                    />
                  </Stack>
                )}
                <VStack space={2}>
                  <Text fontSize={15}>Largo*</Text>
                  <Input
                    name={'length'}
                    variant="outline"
                    placeholder={'Largo'}
                    value={values.length}
                    onChangeText={handleChange('length')}
                    onBlur={handleBlur('length')}
                    keyboardType={'decimal-pad'}
                    size={'lg'}
                    error={errors.length}
                    touched={touched.length}
                  />
                </VStack>
                <VStack space={2}>
                  <Text fontSize={15}>Ancho*</Text>
                  <Input
                    name={'width'}
                    variant="outline"
                    size={'lg'}
                    keyboardType={'decimal-pad'}
                    onChangeText={handleChange('width')}
                    placeholder={'Ancho'}
                    value={values.width}
                    error={errors.length}
                    touched={touched.length}
                  />
                </VStack>
              </Stack>
              {constructionSelect.id === 5 && (
                <Stack top={2}>
                  <VStack w={'100%'} alignItems={'center'}>
                    <Text fontSize={'2xl'}>Ventanas</Text>
                  </VStack>
                  <VStack space={4} alignItems="center">
                    <TextReact style={styles.subtitleText}>
                      Ingresa las medidas (Opcional)
                    </TextReact>
                  </VStack>
                  <VStack space={2}>
                    <VStack>
                      <Text fontSize={15}>Ventana 1</Text>
                    </VStack>
                    <HStack space={5}>
                      <Input
                        name={'lengthWindow1'}
                        variant="outline"
                        placeholder={'Largo'}
                        w={130}
                        value={values.lengthWindow1}
                        onChangeText={handleChange('lengthWindow1')}
                        onBlur={handleBlur('lengthWindow1')}
                        keyboardType={'decimal-pad'}
                        size={'lg'}
                        error={errors.lengthWindow1}
                        touched={touched.lengthWindow1}
                      />
                      <Input
                        name={'widthWindow1'}
                        variant="outline"
                        placeholder={'Ancho'}
                        w={140}
                        value={values.widthWindow1}
                        onChangeText={handleChange('widthWindow1')}
                        onBlur={handleBlur('widthWindow1')}
                        keyboardType={'decimal-pad'}
                        size={'lg'}
                        error={errors.widthWindow1}
                        touched={touched.widthWindow1}
                      />
                    </HStack>
                    <VStack>
                      <Text fontSize={15}>Ventana 2 (Opcional)</Text>
                    </VStack>
                    <HStack space={5}>
                      <Input
                        name={'lengthWindow2'}
                        variant="outline"
                        size={'lg'}
                        w={130}
                        keyboardType={'decimal-pad'}
                        onChangeText={handleChange('lengthWindow2')}
                        placeholder={'Largo'}
                        value={values.lengthWindow2}
                        error={errors.lengthWindow2}
                        touched={touched.lengthWindow2}
                      />
                      <Input
                        name={'widthWindow2'}
                        variant="outline"
                        placeholder={'Ancho'}
                        w={140}
                        value={values.widthWindow2}
                        onChangeText={handleChange('widthWindow2')}
                        onBlur={handleBlur('widthWindow2')}
                        keyboardType={'decimal-pad'}
                        size={'lg'}
                        error={errors.widthWindow2}
                        touched={touched.widthWindow2}
                      />
                    </HStack>
                  </VStack>
                </Stack>
              )}
            </Stack>
          </FormControl>
        )}
      </Formik>
    </Stack>
  );
};

export default FormPhaseOne;
