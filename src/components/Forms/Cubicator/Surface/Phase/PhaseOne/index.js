import React, {useCallback} from 'react';
//Formik
import {Formik} from 'formik';
//Components native base
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
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../../../../styles';
import {colors} from '../../../../../colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {setMeasures} from '../../../../../../redux/features/Utility/utilitySlice';

const FormPhaseOne = props => {
	const {constructionSelect} = useSelector(state => ({...state.construction}));
	const toast = useToast();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			props.phaseOne();
		}, []),
	);

	const calculateSacks = calculation => {
		return calculation / 25;
	}

	const onCubicSurface = values => {
		let {m3, area} = 0;
		let {length, width, depth} = 0
		if (values.m3 === '') {
			length = values.length;
			width = values.width;
			depth = values.depth;
			area = length.replace(',', '.') * width.replace(',', '.');
			m3 = area / width.replace(',', '.');
		} else {
			m3 = values.m3
			length = 0;
			width = 0;
			depth = 0;
			area = 0;
		}
		let {calculation, gravel, sand, water, dosage, sacks} = 0;
		switch (constructionSelect.id) {
			case 1:
				calculation = 180 * m3;
				gravel = 9.0;
				sand = 10.0;
				water = 1.5;
				dosage = 7;
				break;
			case 2:
				calculation = 270 * m3;
				gravel = 6.0;
				sand = 7.0;
				water = 1.0;
				dosage = 10;
				break;
			case 3:
				calculation = 370 * m3;
				gravel = 4.0;
				sand = 4.0;
				water = 1.0;
				dosage = 15;
				break;
		}
		sacks = calculateSacks(calculation);
		dispatch(setMeasures({
			area: area !== 0 && area.toFixed(2),
			length: length,
			width: width,
			m3: m3,
			depth: depth,
			gravel: gravel,
			sand: sand,
			water: water,
			dosage: dosage,
			count: Math.round(sacks),
		}));
		navigation.navigate('ResultSurface');
	}

	return (
		<Stack w={'100%'} h={'100%'}>
			<Formik
				initialValues={{
					m3: '',
					length: '',
					width: '',
					depth: '',
				}}
				innerRef={props.formRefPhaseOne}
				onSubmit={(values, {setSubmitting}) => {
					if (values.m3 === '') {
						if (values.length === '' || values.width === '' || values.depth === '') {
							toast.show({
								description: 'Campos vacios'
							})
						} else {
							onCubicSurface(values);
						}
					} else {
						onCubicSurface(values);
					}
				}}>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
					isSubmitting
				}) => (
					<FormControl>
						<Stack>
							<Stack
								top={14}
								space={5}>
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
										editable={values.m3 !== '' ? false : true}
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
										editable={values.m3 !== '' ? false : true}
										keyboardType={'decimal-pad'}
										onChangeText={handleChange('width')}
										placeholder={'Ancho'}
										value={values.width}
										error={errors.length}
										touched={touched.length}
									/>
								</VStack>
								<VStack space={2}>
									<Text fontSize={15}>Altura (cms)*</Text>
									<Input
										name={'depth'}
										variant="outline"
										size={'lg'}
										editable={values.m3 !== '' ? false : true}
										keyboardType={'decimal-pad'}
										onChangeText={handleChange('depth')}
										placeholder={'Altura'}
										value={values.depth}
										error={errors.depth}
										touched={touched.depth}
									/>
								</VStack>
								<VStack>
									<TextReact style={styles.subtitleText}>Si sabes las medidas de tu proyecto ingresa solo los m3</TextReact>
								</VStack>
								<VStack>
									<Input
										name={'m3'}
										variant="outline"
										size={'lg'}
										keyboardType={'decimal-pad'}
										onChangeText={handleChange('m3')}
										placeholder={'M3'}
										value={values.m3}
										error={errors.m3}
										touched={touched.m3}
									/>
								</VStack>
							</Stack>
						</Stack>
					</FormControl>
				)}
			</Formik>
		</Stack>
	)

}

export default FormPhaseOne;
