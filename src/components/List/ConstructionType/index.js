import React, {useCallback} from 'react';
import {
  Box,
  HStack,
  Image,
  Center,
  Heading,
  Text,
  VStack,
  Stack,
} from 'native-base';
import {FlatList, TouchableOpacity} from 'react-native';
import {colors} from '../../colors';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  getConstructionType,
  resetConstructionType,
  setConstructionTypeSelect,
} from '../../../redux/features/ConstructionType/constructionTypeSlice';
import {resetConstructions} from '../../../redux/features/Construction/constructionSlice';
import {color} from 'react-native-reanimated';

const ListConstructionType = ({navigation}) => {
  const dispatch = useDispatch();
  const {constructionTypes, loading} = useSelector(state => ({
    ...state.constructionType,
  }));
  const {constructions} = useSelector(state => ({...state.constructionType}));
  useFocusEffect(
    useCallback(() => {
      dispatch(getConstructionType({}));
      dispatch(resetConstructions());
      dispatch(resetConstructionType());
    }, []),
  );

  const onNavigate = constructionType => {
    dispatch(setConstructionTypeSelect(constructionType));
    navigation.navigate('Construction', {
      params: {
        idConstructionType: constructionType.id,
      },
    });
  };
  return (
    <Stack backgroundColor={colors.primary} w={'100%'} h={'100%'}>
      <FlatList
        data={constructionTypes}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onNavigate(item)}>
            <Box alignItems="center" marginTop={3} backgroundColor={'white'}>
              <Box
                w={300}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.300"
                borderWidth="1"
                _dark={{
                  borderColor: 'coolGray.600',
                  backgroundColor: 'gray.700',
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 1,
                }}
                _light={{
                  backgroundColor: colors.cream,
                }}>
                <HStack>
                  <Box>
                    <Image
                      source={require('../../../assets/construction-logo.png')}
                      alt="logo-construction"
                      w={100}
                      h={100}
                    />
                    <Center
                      bg={colors.orange}
                      _dark={{
                        bg: 'violet.400',
                      }}
                      _text={{
                        color: 'warmGray.50',
                        fontWeight: '700',
                        fontSize: 'xs',
                      }}
                      position="absolute"
                      bottom="0"
                      px="3"
                      py="1.5">
                      Construcción
                    </Center>
                  </Box>
                  <VStack marginLeft={'2'} space={2} justifyContent={'center'}>
                    <HStack space={4}>
                      <Image
                        source={require('../../../assets/logo-hammer.png')}
                        alt="logo-money-bag"
                        w={6}
                        h={6}
                      />
                      <Heading fontSize={22} ml="-1" color={'light.700'}>
                        {item.name}
                      </Heading>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(value, index) => index.toString()}
      />
    </Stack>
  );
};

export default ListConstructionType;
