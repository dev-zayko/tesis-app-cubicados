import React from 'react';
import {Box, Divider, Menu} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const MenuCubages = ({children}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Box>
      <Menu
        w="150"
        trigger={triggerProps => {
          console.log(triggerProps);
          return (
            <TouchableOpacity
              accessibilityLabel="More options menu"
              {...triggerProps}>
              {children}
            </TouchableOpacity>
          );
        }}>
        <Menu.Item onPressIn={onNavigateAdd}>Agregar</Menu.Item>
        <Divider mt="0" w="100%" />
        <Menu.Item>Eliminar</Menu.Item>
      </Menu>
    </Box>
  );
};

export default MenuCubages;
