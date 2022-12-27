import React from 'react';
import {Flex, Stack} from 'native-base';
import {styles} from './styles';
import {colors} from './colors';

const Container = ({children}) => {
  return (
    <Flex h={'100%'} alignItems={'center'}>
      <Stack
        w={'85%'}
        h={'85%'}
        borderRadius={10}
        style={[styles.formAuthStyle, styles.shadow]}
        backgroundColor={colors.primary}
        alignItems={'center'}>
        {children}
      </Stack>
    </Flex>
  );
};

export default Container;
