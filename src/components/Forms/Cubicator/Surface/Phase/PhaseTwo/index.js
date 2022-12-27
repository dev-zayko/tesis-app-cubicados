import React, {useCallback} from 'react';
import {Divider, HStack, Image, Stack, Text, VStack} from 'native-base';
import {Text as TextReact} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../../../../styles';
import {useFocusEffect} from '@react-navigation/native';

const ResultSurface = props => {
  const {count, m3, dosage, gravel, sand, water} = useSelector(state => ({
    ...state.utility,
  }));

  useFocusEffect(
    useCallback(() => {
      props.phaseTwo();
    }, []),
  );

  return (
    <Stack space={3} backgroundColor={'white'}>
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
          source={require('../../../../../../assets/icon-cubic-result.png')}
          alt="logo-m3"
          w={10}
          h={10}
        />
        <TextReact style={styles.textLarge}>{m3} m3</TextReact>
      </HStack>
      <VStack>
        <HStack space={20}>
          <Text style={styles.textLarge}>Necesitas</Text>
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
          <TextReact style={styles.textLarge}>{count} sacos aprox.</TextReact>
        </HStack>
      </HStack>
      <Stack alignItems={'center'} w={'100%'}>
        <TextReact style={styles.subtitleText}>
          Por cada Saco de 25 kg de Cemento, te recomendamos utilizar
        </TextReact>
      </Stack>
      <VStack>
        <HStack space={12}>
          <Text style={styles.textLarge}>Grava</Text>
          <HStack space={2}>
            <Text style={styles.textLarge}>Arena</Text>
            <Text fontSize={13}>(5mm)</Text>
          </HStack>
          <Text style={styles.textLarge}>Agua</Text>
        </HStack>
        <HStack space={20}>
          <Image
            source={require('../../../../../../assets/icon-grava.png')}
            alt="logo-grava"
            w={10}
            h={10}
          />
          <Image
            source={require('../../../../../../assets/icon-arena.png')}
            alt="logo-arena"
            w={10}
            h={10}
          />
          <Image
            source={require('../../../../../../assets/icon-agua.png')}
            alt="logo-agua"
            w={10}
            h={10}
          />
        </HStack>
        <HStack space={'37%'}>
          <Text style={styles.textLarge}>{gravel}</Text>
          <Text style={styles.textLarge}>{sand}</Text>
          <Text style={styles.textLarge}>{water}</Text>
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
        <Stack w={'100%'} alignItems={'center'}>
          <TextReact style={[styles.subtitleText, styles.textMedium]}>
            Considera baldes de 10 litros
          </TextReact>
        </Stack>
        <Stack h={200}>
          <TextReact style={[styles.subtitleText, styles.textMedium]}>
            **Las dosificaciones indicada y la cantidad de cemento calculada es
            una cantidad minima. No nos hacemos responsable por los resultados
            obtenidos luego de la aplicación de los productos ni por la calidad
            de áridos u otras materias primas utilizadas, condiciones de humedad
            existentes.
          </TextReact>
        </Stack>
      </VStack>
    </Stack>
  );
};

export default ResultSurface;
