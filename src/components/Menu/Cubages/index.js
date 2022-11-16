import React from 'react';
import {Box, Divider, Menu, Pressable, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MenuCubages = ({children}) => {
  const navigation = useNavigation();
  const onNavigateAdd = () => {
    navigation.navigate('Cubicator');
  };
  return (
    <Box>
      <Menu
        w="150"
        trigger={triggerProps => {
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
