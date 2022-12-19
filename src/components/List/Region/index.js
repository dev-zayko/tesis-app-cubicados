import {CheckIcon, Select, Icon} from "native-base";
import React, {useState} from "react";
import {FlatList, Text} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ListRegion = props => {

  const [regionSelect, setRegionSelect] = useState('key0');
  const [regions, setRegions] = useState(props.listRegions);

  const setRegion = (item) => {
    setRegionSelect(item);
    props.setRegion(item)
  }

  return (
    <Select
      placeholder="Selecciona la región"
      selectedValue={regionSelect}
      width={250}
      height={10}
      isDisabled={props.disabledSelect}
      e _selectedItem={{
        bg: "orange.500",
        endIcon: <CheckIcon size={'5'} color={'white'} />
      }}
      fontSize={14}
      onValueChange={(itemValue) => setRegion(itemValue)}
    >
      {
        regions.map((item, index) => {
          return <Select.Item label={`${item.name} ${item.identifier}`} value={(item.name).toString()} key={(item.name).toString()}
          />
        })
      }
    </Select>
  );
}

export default ListRegion;
