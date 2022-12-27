import React, {useCallback} from 'react';
import {Divider, HStack, Image, Stack, Text, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Text as TextReact} from 'react-native';
import {styles} from '../../../components/styles';
import {useFocusEffect} from '@react-navigation/native';
import {totalProjects} from '../../../redux/features/Projects/projectSlice';
import {colors} from '../../../components/colors';

const ReportQuoter = () => {
  const {countDataProject, total} = useSelector(state => ({...state.project}));
  console.log(total);
  const {user} = useSelector(state => ({...state.auth}));
  const {preferences, statusPreference} = useSelector(state => ({
    ...state.cubages,
  }));
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(totalProjects({token: user}));
    }, []),
  );
  return (
    <Stack w={'100%'} alignItems={'center'}>
      <Stack h={'80%'} w={'90%'} justifyContent={'center'} space={4}>
        <HStack space={2}>
          <Image
            source={require('../../../assets/logo-cubages.png')}
            alt={'logo-cubages'}
            w={58}
            h={58}
          />
          <HStack>
            <Stack justifyContent={'center'}>
              <Text fontSize={18}>Cotizaciones totales:</Text>
              <Text>Monto total:</Text>
            </Stack>
            <VStack space={1}>
              <Stack top={1} alignItems={'flex-end'}>
                <Text fontSize={18}>{countDataProject.cubages}</Text>
              </Stack>
              <Stack>
                <TextReact
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: colors.dark,
                  }}>
                  ${' '}
                  {total === 0
                    ? 0
                    : total
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </TextReact>
              </Stack>
            </VStack>
          </HStack>
        </HStack>
        <Stack>
          <Stack>
            <TextReact style={styles.textMedium}>Mis Preferencias</TextReact>
            <Divider
              my="1"
              _light={{
                bg: 'muted.400',
              }}
              _dark={{
                bg: 'muted.50',
              }}
            />
          </Stack>
          <HStack space={2}>
            <Stack>
              <Image
                source={require('../../../assets/logo-stores.png')}
                alt={'logo-cubages'}
                w={58}
                h={58}
              />
            </Stack>
            <HStack space={5}>
              <Stack justifyContent={'center'}>
                <Text fontSize={18}>Tienda</Text>
              </Stack>
              <Stack justifyContent={'center'} w={180} alignItems={'flex-end'}>
                <TextReact style={styles.textMedium}>
                  {preferences === 0 ? 'No hay datos' : preferences.storeName}
                </TextReact>
              </Stack>
            </HStack>
          </HStack>
          <HStack space={2}>
            <Stack>
              <Image
                source={require('../../../assets/construction-logo.png')}
                alt={'logo-construction'}
                w={58}
                h={58}
              />
            </Stack>
            <HStack space={5}>
              <Stack justifyContent={'center'}>
                <Text fontSize={18}>Construcción</Text>
              </Stack>
              <Stack justifyContent={'center'} w={125} alignItems={'flex-end'}>
                <TextReact style={styles.textMedium}>
                  {preferences === 0
                    ? 'No hay datos'
                    : preferences.constructionName}
                </TextReact>
              </Stack>
            </HStack>
          </HStack>
          <HStack space={2}>
            <Stack>
              <Image
                source={require('../../../assets/logo-materials.png')}
                alt={'logo-material'}
                w={58}
                h={58}
              />
            </Stack>
            <HStack space={5}>
              <Stack justifyContent={'center'}>
                <Text fontSize={18}>Marca</Text>
              </Stack>
              <Stack justifyContent={'center'} w={180} alignItems={'flex-end'}>
                <TextReact style={styles.textMedium}>
                  {preferences === 0
                    ? 'No hay datos'
                    : preferences.materialName}
                </TextReact>
              </Stack>
            </HStack>
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ReportQuoter;
