import React, {useEffect, useCallback, useState} from 'react';
import {FlatList, HStack, Stack, Text, Flex, Image} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {getCubagesByRooms} from '../../../redux/features/Cubages/cubagesSlice';
import {colors} from '../../colors';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from '../../styles';
import ModalCubages from '../../Modals/Cubages';

const ListCubages = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const {idRoom} = props;
  const [showModalCubages, setShowModalCubages] = useState(false);
  const [cubagesSelect, setCubagesSelect] = useState();
  const [cubagesList, setCubagesList] = useState('');
  const openModalCubages = cubages => {
    setCubagesSelect(cubages);
    setShowModalCubages(true);
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getCubagesByRooms({token: user, idRoom: idRoom}))
        .then((res) => {
          console.log(res.payload.data)
          setCubagesList(res.payload.data)
        });
    }, []),
  );
  return (
    <>
      {cubagesList === 0 ?
        <Stack h={100} justifyContent={'center'}>
          <Text fontSize={15}>¡No hay cubicaciones, crea una!</Text>
        </Stack>
        :
        <FlatList
          data={cubagesList}
          horizontal
          renderItem={({item, index}) => (
            <Stack marginLeft={2}>
              <TouchableOpacity onPress={() => openModalCubages(item)}>
                <Stack
                  style={styles.shadow}
                  h={155}
                  w={120}
                  backgroundColor={'white'}
                  borderRadius={5}>
                  <Flex h={'70%'}>
                    <Image
                      source={{
                        uri: item.materials.image,
                      }}
                      alt={'Image Material'}
                      size={'xl'}
                    />
                  </Flex>
                  <Flex
                    h={'30%'}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Text>{item.constructions.constructionType.name}</Text>
                    <Text>
                      ${' '}
                      {(item.materials.price * item.count)
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                  </Flex>
                </Stack>
              </TouchableOpacity>
            </Stack>
          )}
          keyExtractor={(value, index) => index.toString()}
        />
      }
      {showModalCubages && (
        <ModalCubages
          showModal={showModalCubages}
          onClose={() => setShowModalCubages(false)}
          cubages={cubagesSelect}
        />
      )}
    </>
  );
};

export default ListCubages;
