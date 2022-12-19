import React from 'react';
//Moments for date
import moment from 'moment';
//Components React Native
import {FlatList, TouchableOpacity} from 'react-native';
//Components and hooks Native Base
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from 'native-base';
//Colors
import {colors} from '../../colors';

const ListProjects = props => {
  const onDateFormat = dateProject => {
    const startDate = require('moment')(dateProject).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const time = moment(now).diff(startDate, 'days');
    if (time === 0) {
      const hourTime = moment(now).diff(startDate, 'hours');
      if (hourTime === 0) {
        return `${moment(now).diff(startDate, 'minutes')} mn(s)`;
      } else {
        return `${hourTime} hora(s)`;
      }
    } else {
      return `${time} dia(s)`;
    }
  };

  return (
    <FlatList
      data={props.projects}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => props.onActionSheet(item)}>
          <Box alignItems="center" marginTop={3}>
            <Box
              w={300}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.300"
              borderWidth="2"
              backgroundColor={'gray.200'}
              _web={{
                shadow: 2,
                borderWidth: 1,
              }}
            >
              <HStack>
                <Box>
                  <Image
                    source={require('../../../assets/logo-projects.png')}
                    alt="logo-casa"
                    w={100}
                    h={100}
                  />
                  <Center
                    bg={colors.orange}
                    _dark={{
                      bg: 'violet.400',
                    }}
                    _text={{
                      color: 'warmGray.50',
                      fontWeight: '700',
                      fontSize: 'xs',
                    }}
                    position="absolute"
                    bottom="0"
                    px="3"
                    py="1.5">
                    Vivienda
                  </Center>
                </Box>
                <VStack marginLeft={'2'}>
                  <VStack space={2} top={2}>
                    <HStack space={5}>
                      <Image
                        source={require('../../../assets/logo-hammer.png')}
                        alt="logo-money-bag"
                        w={6}
                        h={6}
                      />
                      <Heading size="md" ml="-1" color={'light.700'}>
                        {item.name}
                      </Heading>
                    </HStack>
                    <HStack space={5}>
                      <Image
                        source={require('../../../assets/logo-money-bag.png')}
                        alt="logo-money-bag"
                        w={6}
                        h={6}
                      />
                      <Heading size="md" ml="-1" color={'light.700'}>
                        {item.total_price === 0 ? item.total_price : ((item.total_price.toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'))}
                      </Heading>
                    </HStack>
                  </VStack>
                  <HStack left={90} top={4}>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                      fontWeight="400"
                      fontSize={13}>
                      {moment(item.created_at).format('DD-MM-yyyy')}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </Box>
        </TouchableOpacity>
      )}
      keyExtractor={(value, index) => index.toString()}
    />
  );
};

export default ListProjects;
