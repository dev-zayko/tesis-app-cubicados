import React, {useEffect, useCallback, useState} from 'react';
import {FlatList, HStack, Stack, Text, Flex, Image, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {getCubagesByRooms, setCubageSelect} from '../../../redux/features/Cubages/cubagesSlice';
import {colors} from '../../colors';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from '../../styles';
import ModalCubages from '../../Modals/Cubages';

const ListCubages = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const [showModalCubages, setShowModalCubages] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [cubagesList, setCubagesList] = useState('');
  const openModalCubages = cubages => {
    dispatch(setCubageSelect(cubages));
    setShowModalCubages(true);
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getCubagesByRooms({token: user, idRoom: props?.room.id}))
        .then((res) => {
          setCubagesList(res.payload.data);
          console.log(res.payload)
          props?.countCubages(res.payload.data.length === undefined ? 0 : res.payload.data.length);
        });
    }, [updateList]),
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
                  {item.finalized === true &&
                    <Stack position={"absolute"} zIndex={3} >
                      <Icon as={AntDesign} name={"checkcircle"} size={"lg"} color={colors.otherGreen} />
                    </Stack>
                  }
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
                    backgroundColor={colors.orange}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Text fontSize={16} color={'white'}>{item.constructions.constructionType.name}</Text>
                    <Text fontSize={16} color={'white'}>
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
          project={props.project}
          nameRoom={props.room.name}
          onClose={() => setShowModalCubages(false)}
          update={() => {
            props.updateRooms();
            setUpdateList(!updateList);
          }
          }
        />
      )}
    </>
  );
};

export default ListCubages;
