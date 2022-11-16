import React from "react";
import {Stack, VStack, Text, Divider, HStack, Image} from "native-base";
import {Text as TextReact} from "react-native";
import {useSelector} from "react-redux";
import {colors} from "../../../../../colors";
import {styles} from "../../../../../styles";

const ResultSurface = () => {
  const {count, m3, dosage} = useSelector(state => ({...state.utility}))
  return (
    <Stack w={'100%'} h={'100%'} space={2}>
      <VStack>
        <Text fontSize={15}>Tu proyecto mide</Text>
        <Divider
          my="1"
          _light={{
            bg: 'muted.800',
          }}
          _dark={{
            bg: 'muted.50',
          }}
        />
      </VStack>
      <HStack space={2} alignItems={'center'}>
        <Image
          source={require('../../../../../../assets/icon-cubic-result.png')}
          alt="logo-m3"
          w={10}
          h={10}
        />
        <Text fontSize={18}>{m3} m3</Text>
      </HStack>
      <VStack>
        <HStack space={20}>
          <Text fontSize={15}>Necesitas</Text>
          <Text fontSize={15}>Rendimiento</Text>
        </HStack>
        <Divider
          my="2"
          _light={{
            bg: 'muted.800',
          }}
          _dark={{
            bg: 'muted.50',
          }}
        />
      </VStack>
      <HStack w={'100%'}>
        <HStack w={190}>
          <Image
            source={require('../../../../../../assets/icon-saco.png')}
            alt="logo-saco"
            w={10}
            h={10}
          />
          <Text fontSize={18}>{count} sacos aprox.</Text>
        </HStack>
        <HStack>
          <Text fontSize={18}>{dosage} m3/saco</Text>
        </HStack>
      </HStack>
      <Stack alignItems={'center'} w={'100%'}>
        <TextReact style={styles.subtitleText}>Por cada Saco de 25 kg de Cemento, te recomendamos utilizar</TextReact>
      </Stack>
    </Stack>
  );
}

export default ResultSurface;
