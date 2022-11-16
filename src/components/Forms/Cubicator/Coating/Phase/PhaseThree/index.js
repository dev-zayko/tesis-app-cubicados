import React, {useCallback} from 'react';
import {Stack, Text, Image, HStack, VStack, Divider} from 'native-base';
import {Text as TextReact} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../../../../../colors';
import {styles} from '../../../../../styles';

const ResultPhaseThree = props => {
  const {
    area,
    typePainting,
    countPainting,
    countDiluent,
    performancePainting,
    tool,
    thinnerType,
  } = useSelector(state => ({...state.utility}));

  useFocusEffect(
    useCallback(() => {
      props.phaseThree();
    }, []),
  );

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
          source={require('../../../../../../assets/icon-area-m2.png')}
          alt="logo-area"
          w={10}
          h={10}
        />
        <Text fontSize={18}>Area: {area} m2</Text>
      </HStack>
      <VStack>
        <HStack space={20}>
          <Text fontSize={15}>Tipo de pintura</Text>
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
            source={require('../../../../../../assets/icon-bote.png')}
            alt="logo-bote"
            w={10}
            h={10}
          />
          <Text fontSize={18}>{typePainting}</Text>
        </HStack>
        <HStack>
          <Text fontSize={18}>{performancePainting} m2/Litro</Text>
        </HStack>
      </HStack>
      <VStack>
        <Text fontSize={15}>Necesitas</Text>
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
      <HStack space={2} alignItems={'center'}>
        <Image
          source={require('../../../../../../assets/icon-pintura.png')}
          alt="logo-pintura"
          w={10}
          h={10}
        />
        <Text fontSize={18}>{countPainting} Litro(s) aproximados</Text>
      </HStack>
      <VStack>
        <HStack space={100}>
          <Text fontSize={15}>herramienta</Text>
          <Text fontSize={15}>Diluyente</Text>
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
            source={require('../../../../../../assets/icon-herramienta.png')}
            alt="logo-tool"
            w={10}
            h={10}
          />
          <Text fontSize={18}>{tool.name}</Text>
        </HStack>
        <HStack w={100}>
          <Text fontSize={18}>{thinnerType}</Text>
        </HStack>
      </HStack>
      <Stack h={100}>
        <TextReact style={styles.subtitleText}>
          {tool.id === 1
            ? `${countDiluent} cm3 equivale al 5% de diluyente por la cantidad de pintura`
            : tool.id === 2 &&
              `${countDiluent} cm3 equivale al 10% de diluyente por la cantidad de pintura`}
        </TextReact>
      </Stack>
    </Stack>
  );
};

export default ResultPhaseThree;
