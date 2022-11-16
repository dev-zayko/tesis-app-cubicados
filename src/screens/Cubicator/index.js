import React from 'react';
import {Flex, Stack, Text, Box} from 'native-base';
import Background from '../../components/Background';
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import ConstructionStackScreen from '../../navigation/Construction';
import {useSelector} from 'react-redux';
import {Text as TextReact} from 'react-native';

const Cubicator = () => {
  const {constructionTypeSelect} = useSelector(state => ({
    ...state.constructionType,
  }));
  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} top={12}>
        <Stack
          w="85%"
          h={600}
          style={[styles.formAuthStyle, styles.shadow]}
          backgroundColor={colors.primary}
          alignItems="center">
          <Flex alignItems={'center'}>
            <Text bold fontSize={'4xl'}>
              {constructionTypeSelect === 0
                ? 'Construcción'
                : constructionTypeSelect.id === 1
                ? 'Superficie'
                : 'Revestimiento'}
            </Text>
            <TextReact style={styles.subtitleText}>
              Escoge el tipo de construcción
            </TextReact>
          </Flex>
          <Box
            w={300}
            h={450}
            top={5}
            justifyContent={'center'}
            alignItems={'center'}>
            <ConstructionStackScreen />
          </Box>
        </Stack>
      </Flex>
    </Background>
  );
};
export default Cubicator;
