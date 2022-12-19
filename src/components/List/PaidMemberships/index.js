import React from 'react';
//Moments for date
import moment from 'moment';
//Components React Native
import {FlatList, TouchableOpacity, Text as TextReact} from 'react-native';
//Components and hooks Native Base
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from 'native-base';
//Colors
import {colors} from '../../colors';
import {styles} from '../../styles';

const ListPaidMemberships = props => {
  console.log(props.paidMemberships)
  return (
    <FlatList
      data={props.paidMemberships}
      renderItem={({item}) => (
        <TouchableOpacity>
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
              <HStack space={12} justifyContent={'center'} h={140}>
                <VStack justifyContent={'center'} space={1}>
                  <Heading size="sm" ml="-1" color={'light.700'}>
                    Orden de compra
                  </Heading>
                  <Heading size="sm" ml="-1" color={'light.700'}>
                    {item.memberships.name}
                  </Heading>
                  <Heading size="sm" ml="-1" color={'light.700'}>
                    Dias
                  </Heading>
                  <Heading size="sm" ml="-1" color={'light.700'}>
                    Fecha pago
                  </Heading>
                  <Heading size="sm" ml="-1" color={'light.700'}>
                    Hora pago
                  </Heading>
                </VStack>
                <Stack alignItems={'flex-end'} space={1} justifyContent={'center'}>
                  <TextReact style={[styles.subtitleText, styles.textMedium]}>
                    {item.buy_order}
                  </TextReact>
                  <TextReact style={[styles.subtitleText, styles.textMedium]}>
                    $ {item.neto_amount === 0 ? item.neto_amount : ((item.neto_amount.toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'))}
                  </TextReact>
                  <TextReact style={[styles.subtitleText, styles.textMedium]}>
                    {item.memberships.days}
                  </TextReact>
                  <TextReact style={[styles.subtitleText, styles.textMedium]}>
                    {moment(item.created_at).format('DD-MM-YYYY')}
                  </TextReact>
                  <TextReact style={[styles.subtitleText, styles.textMedium]}>
                    {moment(item.created_at).format('HH:ss')}
                  </TextReact>
                </Stack>
              </HStack>
              <Stack alignItems={'center'}>
                <TextReact style={styles.subtitleText}> Cubicados © {moment().format('YYYY')}</TextReact>
              </Stack>
            </Box>
          </Box>
        </TouchableOpacity >
      )}
      keyExtractor={(value, index) => index.toString()}
    />
  );
};

export default ListPaidMemberships;
