import React, {useCallback} from "react";
import Background from "../../components/Background";
import {HStack, Image, Stack, Text, VStack} from "native-base";
import {styles} from "../../components/styles";
import {colors} from "../../components/colors";
import {Text as TextReact} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import {preferenceByUser} from "../../redux/features/Cubages/cubagesSlice";
import TabBarReport from "../../navigation/Resumen/TabBar";
const MyPays = () => {
	const {user} = useSelector(state => ({...state.auth}));
	const {preferences, statusPreference} = useSelector(state => ({...state.cubages}));
	const {countDataProject} = useSelector(state => ({...state.project}));
	const dispatch = useDispatch();

	useFocusEffect(useCallback(() => {
		dispatch(preferenceByUser({token: user}))
			.then(response => {
				const {data} = response.payload;
				console.log(data);
				console.log(countDataProject)
			});
	}, [])
	);
	return (
		<Background>
			<Stack h={'100%'} justifyContent={'center'} space={5}>
				<Stack alignItems={'center'} space={10}>
					<Stack
						w="85%"
						h={600}
						borderRadius={10}
						style={styles.shadow}
						backgroundColor={colors.primary}>
						<TabBarReport />
					</Stack>
				</Stack>
			</Stack>
		</Background>
	)
}

export default MyPays;
