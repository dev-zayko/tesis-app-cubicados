import React, {useCallback} from 'react';
import {Divider, HStack, Image, Stack, Text, VStack} from 'native-base';
import {Text as TextReact} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
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
    <Stack space={4} backgroundColor={'white'} h={'100%'}>
      <VStack>
        <Text style={styles.textLarge}>Tu proyecto mide</Text>
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
        <TextReact style={styles.textLarge}>Area: {area} m2</TextReact>
      </HStack>
      <VStack>
        <HStack space={20}>
          <Text style={styles.textLarge}>Tipo de pintura</Text>

        </HStack>
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
      <HStack w={'100%'}>
        <HStack w={200}>
          <Image
            source={require('../../../../../../assets/icon-bote.png')}
            alt="logo-bote"
            w={10}
            h={10}
          />
          <TextReact style={styles.textLarge}>{typePainting}</TextReact>
        </HStack>
      </HStack>
      <VStack>
        <Text style={styles.textLarge}>Necesitas</Text>
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
        <Text style={styles.textLarge}>
          {countPainting} Litro(s) aproximados
        </Text>
      </HStack>
      <VStack>
        <HStack space={100}>
          <Text style={styles.textLarge}>Herramienta</Text>
          <Text style={styles.textLarge}>Diluyente</Text>
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
        <HStack w={200}>
          <Image
            source={require('../../../../../../assets/icon-herramienta.png')}
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
      <Stack justifyContent={'center'}>
        <TextReact style={[styles.subtitleText, styles.textMedium]}>
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
