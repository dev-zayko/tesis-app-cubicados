import {Stack, FlatList} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import CollapsibleRooms from '../../Collapsible/Rooms';
import {useDispatch, useSelector} from 'react-redux';
import {getCubagesByRooms} from '../../../redux/features/Cubages/cubagesSlice';

const ListRooms = props => {
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const toogleExpanded = () => setCollapsed(!collapsed);
  return (
    <Stack space={5} marginTop={5}>
      <FlatList
        data={props.rooms}
        renderItem={({item}) => (
          <CollapsibleRooms collapsed={collapsed} rooms={item} />
        )}
        keyExtractor={(value, index) => index.toString()}
      />
    </Stack>
  );
};

export default ListRooms;
