import {Stack, FlatList} from 'native-base';
import React, {useState} from 'react';
import CollapsibleRooms from '../../Collapsible/Rooms';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setRoomSelect} from '../../../redux/features/Rooms/roomSlice';

const ListRooms = props => {
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const toogleExpanded = () => setCollapsed(!collapsed);
  const {userData} = useSelector(state => ({...state.auth}));
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onNavigateAdd = (idRoom, countCubages) => {
    console.log(userData.membership_id)
    if (userData.membership_id === 1) {
      if (countCubages >= 2) {
        props.alertLimited('limited', 'Cubicaciones')

      } else {
        dispatch(setRoomSelect(idRoom));
        navigation.navigate('Cubicator');
      }
    } else {
      dispatch(setRoomSelect(idRoom));
      navigation.navigate('Cubicator');
    }

  };
  return (
    <Stack space={5} marginTop={5}>
      <FlatList
        data={props.rooms}
        renderItem={({item}) => (
          <CollapsibleRooms collapsed={collapsed} rooms={item} project={props.project} onNavigate={(idRoom, countCubages) => onNavigateAdd(idRoom, countCubages)} />
        )}
        keyExtractor={(value, index) => index.toString()}
      />
    </Stack>
  );
};

export default ListRooms;
