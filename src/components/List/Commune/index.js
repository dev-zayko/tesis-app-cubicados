import React, {useState} from "react";
import {CheckIcon, Icon, Select} from "native-base";
import {useSelector} from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const ListCommune = (props) => {

  const [communeSelect, setCommuneSelect] = useState('key0');
  const {communes} = useSelector(state => ({...state.location}));

  const setCommune = (item) => {
    setCommuneSelect(item);
    props.setCommune(item);
  }
  return (
    <Select
      placeholder="Selecciona la comuna"
      selectedValue={communeSelect}
      width={250}
      height={10}
      isDisabled={props.disabledSelect}
      _selectedItem={{
        bg: "orange.500",
        endIcon: <CheckIcon size={'5'} color={"white"} />
      }}
      fontSize={14}
      onValueChange={(itemValue) => setCommune(itemValue)}
    >
      {
        communes === 0 ? <Select.Item label={"Selecciona una región primero"} value={'0'} disabled />
          :
          communes.map((item, index) => {
            return <Select.Item label={item.city} value={(item.city).toString()} dropdownIcon={
              <Icon
                as={MaterialIcons}
                name={"location-city"}
                size="5"
                color="darkgray"
                key={
                  Math.random()
                }
              />
            } />
          })
      }
    </Select>
  );
}

export default ListCommune;
