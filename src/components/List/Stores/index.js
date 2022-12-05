import React, {useCallback, useRef, useState} from "react";
import {FlatList, TouchableOpacity, Text as TextReact} from "react-native";
import {
  Box,
  Center,
  Heading,
  HStack,
  Flex,
  Text,
  Image,
  VStack,
  Stack
} from "native-base";
//Colors
import {colors} from '../../colors';
import {styles} from '../../styles';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {setStoreSelect} from "../../../redux/features/Stores/storesSlice";
import {resetListProducts} from "../../../redux/features/Quoter/quoterSlice";
import AlertLocation from "../../AlertDialog/Location/AlertLocation";

const ListStores = (props) => {
  const dispatch = useDispatch();
  const cancelRef = useRef(null);
  const [isOpenAlertLocation, setIsOpenAlertLocation] = useState(false);

  const onOpenAlert = (item) => {
    dispatch(setStoreSelect(item));
    setIsOpenAlertLocation(true);
  }

  useFocusEffect(useCallback(() => {
    dispatch(resetListProducts());
  }, [])
  );

  return (
    <>
      <Stack alignItems={'center'} justifyContent={'center'} h={100}>
        <Text style={styles.textLarge}>
          TIENDA
        </Text>
        <TextReact style={[styles.textMedium, styles.subtitleText]}>
          Escoge tu tienda
        </TextReact>
      </Stack>
      <FlatList
        data={props.stores}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onOpenAlert(item)}>
            <Box alignItems="center" marginTop={3}>
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
                      source={item.name === 'Sodimac' ? require('../../../assets/logo-sodimac.png')
                        : item.name === 'Easy' ? require('../../../assets/logo-easy.png') : item.name === 'Construmart' &&
                          require('../../../assets/logo-construmart.png')}
                      alt="logo-stores"
                      width={100}
                      height={100}
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
                      Tienda
                    </Center>
                  </Box>
                  <VStack marginLeft={'2'} justifyContent={'center'}>
                    <VStack space={2}>
                      <HStack space={5}>
                        <Image
                          source={require('../../../assets/logo-stores.png')}
                          alt="logo-casa"
                          w={8}
                          h={8}
                        />
                        <Heading size="md" ml="-1" color={'light.700'}>
                          {item.name}
                        </Heading>
                      </HStack>
                    </VStack>
                  </VStack>
                </HStack>
              </Box>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(value, index) => index.toString()}
      />
      {isOpenAlertLocation && (
        <AlertLocation
          cancelRef={cancelRef}
          isOpen={isOpenAlertLocation}
          onClose={() => setIsOpenAlertLocation(false)}
        />
      )}
    </>
  );
}

export default ListStores;
