import {Stack, FlatList} from 'native-base';
import React, {useState} from 'react';
import CollapsibleRooms from '../../Collapsible/Rooms';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setRoomSelect} from '../../../redux/features/Rooms/roomSlice';

const ListRooms = props => {
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const toogleExpanded = () => setCollapsed(!collapsed);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onNavigateAdd = (idRoom) => {
    navigation.navigate('Cubicator');
    dispatch(setRoomSelect(idRoom));

  };
  return (
    <Stack space={5} marginTop={5}>
      <FlatList
        data={props.rooms}
        renderItem={({item}) => (
          <CollapsibleRooms collapsed={collapsed} rooms={item} onNavigate={(idRoom) => onNavigateAdd(idRoom)} />
        )}
        keyExtractor={(value, index) => index.toString()}
      />
    </Stack>
  );
};

export default ListRooms;
