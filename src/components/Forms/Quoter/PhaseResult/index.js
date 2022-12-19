import React, {useEffect, useState} from "react";
import {Box, Divider, Heading, HStack, Stack, VStack, Text, Image, Center, useToast} from "native-base";
import {ActivityIndicator, Text as TextReact, TouchableOpacity} from "react-native";
import {styles} from "../../../styles";
import {useDispatch, useSelector} from "react-redux";
import {colors} from "../../../colors";
import {createCubages} from "../../../../redux/features/Cubages/cubagesSlice";
import {createMaterial} from "../../../../redux/features/Material/materialSlice";
import {matchCommune} from "../../../../redux/features/Location/locationSlice";
import {useNavigation} from "@react-navigation/native";
import {useRef} from "react";
import AlertConfirm from "../../../AlertDialog/AlertConfirm";
import {Alert} from "react-native";

const PhaseQuoterResult = (props) => {

	const {constructionSelect} = useSelector(state => ({...state.construction}));
	const {storeSelect} = useSelector(state => ({...state.store}));
	const {user} = useSelector(state => ({...state.auth}));
	const {roomSelect} = useSelector(state => ({...state.room}));
	const {productSelect, typeProduct} = useSelector(state => ({...state.products}));
	const {constructionTypeSelect} = useSelector(state => ({...state.constructionType}));
	const {
		area,
		m3,
		depth,
		length,
		width,
		dosage,
		gravel,
		sand,
		water,
		count,
		thinnerType,
		typePainting,
		tool,
		countPainting,
		countDiluent,
		performancePainting,
	} = useSelector(state => ({...state.utility}));
	const {tradeMark, title, image, price, city} = productSelect;
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const toast = useToast();
	const [totalCost, setTotalCost] = useState(null);
	const [countGallon, setCountGallon] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const castPrice = (price) => {
		let gallon = 3.78;
		let gallonNeeded = Math.round(countPainting / gallon);
		if (gallonNeeded > 2) {
			setCountGallon(gallonNeeded);
			setTotalCost((gallonNeeded * price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
		} else {
			if (gallonNeeded === 0) {
				setCountGallon(1);
			} else {
				setCountGallon(gallonNeeded);
			}
			setTotalCost(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
		}
	}
	const costConcrete = async () => {
		let priceFormat = price.replace('.', '').replace('$', '')
		if (typeProduct === 'Cemento') {
			let total = priceFormat * count;
			setTotalCost(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
		} else {
			castPrice(priceFormat);
		}
	}

	const addCubages = (idMaterial) => {
		let description = {
			"thinnerType": thinnerType,
			"thinnerCount": countDiluent,
			"tool": tool,
			"gallonsCount": countGallon
		};
		dispatch(createCubages({
			toast: toast,
			token: user,
			area: area,
			depth: depth,
			width: width,
			m3: m3,
			dosage: constructionTypeSelect.id === 1 ? dosage : performancePainting,
			gravel: gravel,
			sand: sand,
			water: water,
			length: length,
			count: constructionTypeSelect.id === 1 ? count : countPainting,
			description: constructionTypeSelect.id === 1 ? "" : description,
			idConstruction: constructionSelect.id,
			idRoom: roomSelect,
			idMaterial: idMaterial,
			totalCost: totalCost
		}));
		setIsSubmitting(false);
		navigation.navigate('Project');
	}

	const addMaterial = (idCommune) => {
		dispatch(createMaterial({
			token: user,
			image: image,
			tradeMark: tradeMark,
			title: title,
			price: price,
			idStore: storeSelect.id,
			idCommune: idCommune
		})).then((response) => {
			addCubages(response.payload.data.id);
		});
	}
	const matchingCommune = () => {
		setIsSubmitting(true);
		dispatch(matchCommune({commune: city})).
			then((response) => {
				addMaterial(response.payload.data[0].id);
			});
	}
	const confirmCubage = () => {
		Alert.alert(
			"Aviso",
			"¿Estas seguro de agregar esta cubicación ?",
			[
				{
					text: "Cancelar",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{text: "Confirmar", onPress: () => matchingCommune()}
			]
		);
	}
	useEffect(() => {
		costConcrete();
	}, [])

	return (
		<Stack alignItems={'center'} space={2} w={'100%'}>
			<Stack alignItems={'center'}>
				<Heading>
					Ficha Tecnica
				</Heading>
				<TextReact style={styles.subtitleText}>
					{constructionSelect.name}
				</TextReact>
			</Stack>
			<Stack space={3} w={'90%'}>
				<VStack>
					<HStack alignItems={'center'}>
						<Text style={styles.textLarge}>Tu proyecto mide</Text>
					</HStack>
					<Divider my="2" _light={{
						bg: "muted.800"
					}} _dark={{
						bg: "muted.50"
					}} />
				</VStack>
				<HStack space={2} alignItems={'center'}>
					<Image
						source={constructionTypeSelect.id === 1 ?
							require('../../../../assets/icon-cubic-result.png') :
							constructionTypeSelect.id === 2 && require('../../../../assets/icon-area-m2.png')}
						alt="logo-m3"
						w={10}
						h={10}
					/>
					<TextReact style={styles.textLarge}>{constructionTypeSelect.id === 1 ? `${m3} m3` :
						constructionTypeSelect.id === 2 && `${area} m2`}</TextReact>
				</HStack>
				<VStack>
					<HStack space={constructionTypeSelect.id === 1 ? 100 :
						constructionTypeSelect.id === 2 && 12}>
						<Text style={styles.textLarge}>{constructionTypeSelect.id === 1 ?
							'Necesitas' : constructionTypeSelect.id === 2 && 'Tipo de Pintura'}</Text>
						<Text style={styles.textLarge}>Rendimiento</Text>
					</HStack>
					<Divider my="2" _light={{
						bg: "muted.800"
					}} _dark={{
						bg: "muted.50"
					}} />
				</VStack>
				<HStack w={'100%'}>
					<HStack w={200}>
						<Image
							source={constructionTypeSelect.id === 1 ?
								require('../../../../assets/icon-saco.png') :
								constructionTypeSelect.id === 2 && require('../../../../assets/icon-bote.png')}
							alt="logo-saco"
							w={10}
							h={10}
						/>
						<TextReact style={styles.textLarge}>{constructionTypeSelect.id === 1 ? `${count} sacos aprox.` :
							constructionTypeSelect.id === 2 && `${typePainting}`}</TextReact>
					</HStack>
					<HStack>
						<TextReact style={styles.textLarge}>{constructionTypeSelect.id === 1 ? `${dosage} m3/saco` :
							constructionTypeSelect.id === 2 && `${performancePainting} m2/Litro`} </TextReact>
					</HStack>
				</HStack>
				{constructionTypeSelect.id === 1 ?
					<>
						<Stack alignItems={'center'} w={'100%'}>
							<TextReact style={styles.subtitleText}>Por cada Saco de 25 kg de Cemento, te recomendamos utilizar</TextReact>
						</Stack>
						<VStack>
							<HStack space={'20%'}>
								<StyleText>
									Grava
								</StyleText>
								<HStack space={2}>
									<StyleText>
										Arena
									</StyleText>
									<Text fontSize={10} top={2}>
										(5mm)
									</Text>
								</HStack>
								<StyleText>
									Agua
								</StyleText>
							</HStack>
							<HStack space={20}>
								<Image
									source={require('../../../../assets/icon-grava.png')}
									alt="logo-grava"
									w={10}
									h={10}
								/>
								<Image
									source={require('../../../../assets/icon-arena.png')}
									alt="logo-arena"
									w={10}
									h={10}
								/>
								<Image
									source={require('../../../../assets/icon-agua.png')}
									alt="logo-agua"
									w={10}
									h={10}
								/>
							</HStack>
							<HStack space={110}>
								<StyleText>{gravel}</StyleText>
								<StyleText>{sand}</StyleText>
								<StyleText>{water}</StyleText>
							</HStack>
							<Stack w={'100%'} alignItems={'center'}>
								<TextReact style={styles.subtitleText}>Considera baldes de 10 litros</TextReact>
							</Stack>
						</VStack>
					</> :
					constructionTypeSelect.id === 2 &&
					<>
						<VStack>
							<Text style={styles.textLarge}>Necesitas</Text>
						</VStack>
						<HStack space={2} alignItems={'center'}>
							<Image
								source={require('../../../../assets/icon-pintura.png')}
								alt="logo-pintura"
								w={10}
								h={10}
							/>
							<Text style={styles.textLarge}>{countPainting} Litro(s) aproximados</Text>
						</HStack>
						<VStack>
							<HStack space={100}>
								<Text style={styles.textLarge}>Herramienta</Text>
								<Text style={styles.textLarge}>Diluyente</Text>
							</HStack>
						</VStack>
						<HStack w={'100%'}>
							<HStack w={200}>
								<Image
									source={require('../../../../assets/icon-herramienta.png')}
									alt="logo-tool"
									w={10}
									h={10}
									bottom={2}
								/>
								<TextReact style={styles.textLarge}>{tool.name}</TextReact>
							</HStack>
							<HStack w={100}>
								<TextReact style={styles.textLarge}>{thinnerType}</TextReact>
							</HStack>
						</HStack>
					</>
				}
				<VStack>
					<HStack space={10}>
						<StyleText>Material</StyleText>
						<HStack space={2} top={1.5}>
							<Heading size="xs" color={'red.700'}>
								{storeSelect.name}:
							</Heading>
							<Heading size={'xs'}>
								{city}
							</Heading>
						</HStack>
					</HStack>
					<Divider my="2" _light={{
						bg: "muted.800"
					}} _dark={{
						bg: "muted.50"
					}} />
				</VStack>
				<HStack space={1}>
					<Stack>
						<Image
							source={{
								uri: image
							}}
							alt="logo-casa"
							w={110}
							h={120}
						/>
					</Stack>
					<VStack space={1} w={220}>
						<TextReact style={{fontSize: 15, fontWeight: 'bold'}}>
							{tradeMark}
						</TextReact>
						<Heading size={"sm"} ml="-1" color={'gray.500'}>
							{title}
						</Heading>
						<Heading size="md" ml="-1" color={'red.700'}>
							{price}
						</Heading>
						{constructionTypeSelect.id === 1 ?
							<Stack>
								<Heading size="md" ml="-1" color={'red.700'}>
									{count} sacos: $ {totalCost}
								</Heading>
							</Stack>
							:
							<Stack>
								<Heading size="md" ml="-1" color={'red.700'}>
									{countGallon} gl: ${totalCost}
								</Heading>
							</Stack>
						}
					</VStack>
				</HStack>
			</Stack>
			<Stack alignItems={'center'}>
				{isSubmitting === false ?
					<TouchableOpacity style={styles.buttonLogin} onPress={() => confirmCubage()}>
						<Text style={styles.textLogin}>Agregar al proyecto</Text>
					</TouchableOpacity> :
					<TouchableOpacity style={styles.buttonLogin} disabled={true}>
						<ActivityIndicator size={'large'} color={colors.primary} />
					</TouchableOpacity>
				}
			</Stack>
		</Stack>
	);
}

const StyleText = ({children}) => {return <Text fontSize={18}>{children}</Text>}
export default PhaseQuoterResult;
