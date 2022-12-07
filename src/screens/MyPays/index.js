import React from "react";
import Background from "../../components/Background";
import {Stack} from "native-base";
import {styles} from "../../components/styles";
import {colors} from "../../components/colors";
const MyPays = () => {
	return (
		<Background>
			<Stack h={'100%'} justifyContent={'center'} space={5}>
				<Stack alignItems={'center'} space={10}>
					<Stack
						w="85%"
						h={200}
						borderRadius={10}
						style={styles.shadow}
						backgroundColor={colors.primary}>
					</Stack>
					<Stack
						w="85%"
						h={300}
						borderRadius={10}
						style={styles.shadow}
						backgroundColor={colors.primary}>
					</Stack>
				</Stack>
			</Stack>
		</Background>
	)
}

export default MyPays;
