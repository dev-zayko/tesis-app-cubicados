import React, {useCallback} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {Box, Center, Heading, HStack, Image, Stack, VStack} from 'native-base';
import {colors} from '../../colors';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  getConstruction,
  setConstructionSelect,
} from '../../../redux/features/Construction/constructionSlice';

const ListConstruction = ({route, navigation}) => {
  const {idConstructionType} = route.params?.params;
  const dispatch = useDispatch();
  const {constructions, loading} = useSelector(state => ({
    ...state.construction,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(getConstruction({idConstructionType: idConstructionType}));
    }, []),
  );

  const onNavigate = construcion => {
    dispatch(setConstructionSelect(construcion));
    navigation.navigate(
      idConstructionType === 1
        ? 'Surface'
        : idConstructionType === 2 && 'Coating',
    );
  };
  return (
    <Stack w={'100%'} h={'100%'} backgroundColor={colors.primary}>
      <FlatList
        data={constructions}
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
                    <HStack space={4} w={130}>
                      <Image
                        source={require('../../../assets/logo-hammer.png')}
                        alt="logo-money-bag"
                        w={6}
                        h={6}
                      />
                      <Heading fontSize={15} ml="-1" color={'light.700'}>
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

export default ListConstruction;
