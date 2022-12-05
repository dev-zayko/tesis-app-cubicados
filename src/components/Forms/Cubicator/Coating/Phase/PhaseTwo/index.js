import React, {useCallback, useState} from 'react';
import {Text as TextReact} from 'react-native';
import {
  CheckIcon,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  Radio,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from 'native-base';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import colors from 'native-base/src/theme/base/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from '../../../../../styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setMeasures} from '../../../../../../redux/features/Utility/utilitySlice';
import {setTypeProduct} from '../../../../../../redux/features/Quoter/quoterSlice';

const FormPhaseTwo = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const toast = useToast();
  const [typePainting, setTypePainting] = useState('');
  const [tool, setTool] = useState(1);

  const dispatch = useDispatch();

  const {
    area,
    length,
    width,
    lengthWindow1,
    widthWindow1,
    lengthWindow2,
    widthWindow2,
  } = route.params?.params;

  useFocusEffect(
    useCallback(() => {
      props.phaseTwo();
    }, []),
  );

  const onCubicPainting = () => {
    let countPainting, countDiluent, performancePainting, thinnerType;
    switch (typePainting) {
      case 'Esmalte al Agua':
        countPainting = area / 12;
        performancePainting = 12;
        thinnerType = 'Agua';
        break;
      case 'Latex':
        countPainting = area / 10;
        performancePainting = 10;
        thinnerType = 'Agua';
        break;
      case 'Esmalte Sintetico':
        countPainting = area / 13;
        performancePainting = 13;
        thinnerType = 'Aguarras o Diluyente sintetico';
        break;
      case 'Óleo':
        countPainting = area / 12;
        performancePainting = 12;
        thinnerType = 'Aguarras o Diluyente sintetico';
        break;
    }
    if (tool === 1) {
      countDiluent = countPainting * 50;
      console.log(countDiluent);
    } else if (tool === 2) {
      countDiluent = countPainting * 100;
    }
    dispatch(
      setMeasures({
        area: area.toFixed(2),
        width: width,
        length: length,
        lengthWindow1: lengthWindow1,
        widthWindow1: widthWindow1,
        lengthWindow2: lengthWindow2,
        widthWindow2: widthWindow2,
        thinnerType: thinnerType,
        typePainting: typePainting,
        tool: {
          id: tool,
          name: tool === 1 ? 'Brocha o Rodillo' : 'Pistola',
        },
        countPainting:
          countPainting < 1
            ? countPainting.toFixed(2)
            : Math.round(countPainting),
        countDiluent: Math.round(countDiluent),
        performancePainting: performancePainting,
      }),
    );
    dispatch(setTypeProduct(typePainting));
    navigation.navigate('ResultCoating');
  };

  return (
    <Stack w={'100%'} h={'100%'} top={4} backgroundColor={colors.primary}>
      <Formik
        initialValues={{
          input: '',
        }}
        innerRef={props.formRefPhaseTwo}
        onSubmit={(values, {setSubmitting}) => {
          if (typePainting !== '') {
            onCubicPainting();
          } else {
            toast.show({
              description: 'Escoge el tipo de pintura',
            });
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
            <Stack space={4}>
              <VStack>
                <FormControl.Label><TextReact style={styles.textLarge}>Tipo de pintura</TextReact></FormControl.Label>
                <Select
                  selectedValue={typePainting}
                  minWidth="200"
                  fontSize={15}
                  accessibilityLabel="Choose Service"
                  placeholder="Escoge el tipo de pintura"
                  _selectedItem={{
                    bg: 'orange.500',
                    endIcon: <CheckIcon size="5" color={'white'} />,
                  }}
                  mt={1}
                  onValueChange={itemValue => setTypePainting(itemValue)}>
                  <Select.Item
                    label="Esmalte al Agua"
                    value="Esmalte al Agua"
                  />
                  <Select.Item label="Latex" value="Latex" />
                  <Select.Item
                    label="Esmalte Sintetico"
                    value="Esmalte Sintetico"
                  />
                  <Select.Item label="Óleo" value="Óleo" />
                </Select>
              </VStack>
              <VStack>
                <FormControl.Label>
                  <TextReact style={styles.textLarge}>
                    Tipo de diluyente
                  </TextReact>
                </FormControl.Label>
                <Divider
                  my="2"
                  _light={{
                    bg: 'muted.800',
                  }}
                  _dark={{
                    bg: 'muted.50',
                  }}
                />
                <FormControl.Label>
                  <TextReact style={styles.textLarge}>
                    {typePainting === ''
                      ? 'Selecciona la pintura'
                      : typePainting === 'Esmalte al Agua' ||
                        typePainting === 'Latex'
                        ? 'Agua'
                        : typePainting === 'Esmalte Sintetico' ||
                          typePainting === 'Óleo'
                          ? 'Aguarras o diluyente sintetico'
                          : 'Selecciona la pintura'}
                  </TextReact>
                </FormControl.Label>
              </VStack>
              <VStack>
                <FormControl.Label>
                  <TextReact style={styles.textLarge}>Herramienta</TextReact>
                </FormControl.Label>
                <Divider
                  my="2"
                  _light={{
                    bg: 'muted.800',
                  }}
                  _dark={{
                    bg: 'muted.50',
                  }}
                />
                <Radio.Group
                  defaultValue="1"
                  size="lg"
                  name="exampleGroup"
                  onChange={value => setTool(value)}>
                  <HStack>
                    <Radio
                      colorScheme="warning"
                      size={8}
                      _text={{
                        mx: 2,
                      }}
                      value="1"
                      icon={<Icon as={<AntDesign name="tool" />} />}
                      my={1}>
                      Brocha o Rodillo
                    </Radio>
                    <Radio
                      colorScheme="warning"
                      size={8}
                      _text={{
                        mx: 2,
                      }}
                      value="2"
                      icon={<Icon as={<AntDesign name="tool" />} />}
                      my={1}>
                      Pistola
                    </Radio>
                  </HStack>
                </Radio.Group>
              </VStack>
              <VStack space={2} h={150} justifyContent={'center'}>
                <TextReact style={[styles.subtitleText, styles.textMedium]}>
                  **Considera estas manos por tipo de pared
                </TextReact>
                <TextReact>Pared con el mismo colors | 2 manos</TextReact>
                <TextReact>Pared sin pintar | 3 manos o mas</TextReact>
                <TextReact>
                  Pared de material absorvente | 3 manos o mas
                </TextReact>
              </VStack>
            </Stack>
          </FormControl>
        )}
      </Formik>
    </Stack>
  );
};

export default FormPhaseTwo;
