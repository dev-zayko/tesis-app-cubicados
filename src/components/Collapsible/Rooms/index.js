import React, {useState} from 'react';
import {
  Stack,
  Heading,
  Box,
  HStack,
  VStack,
  Image,
  Center,
  Text,
  Flex,
  Icon,
  HamburgerIcon,
} from 'native-base';
import {styles} from '../../styles';
import {TouchableOpacity} from 'react-native';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
//import for the collapsible/Expandable view
//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import ListCubages from '../../List/Cubages';
import {useSelector} from 'react-redux';
import moment from 'moment/moment';
import HandAnimation from '../../Animation/HandAnimation';
import {colors} from '../../colors';
import MenuCubages from '../../Menu/Cubages';

const CollapsibleRooms = props => {
  const [activeSections, setActiveSections] = useState([]);
  const {name, neto_amount, id, created_at} = props.rooms;
  const {status} = useSelector(state => ({...state.cubages}));
  const setSections = sections => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View duration={400} transition="backgroundColor">
        <HStack>
          <Box>
            <Image
              source={require('../../../assets/logo-rooms.png')}
              alt="logo-casa"
              w={90}
              h={90}
              left={2}
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
              Habitación
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
                  {name}
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
                  {neto_amount}
                </Heading>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        animation={isActive ? 'bounceIn' : undefined}
        style={{textAlign: 'center', height: 230}}>
        <Box>
          <HStack alignSelf={'flex-end'}>
            <HandAnimation name={'hand-o-right'} />
            <Stack>
              <MenuCubages navigation={props.navigation}>
                <HStack style={styles.containerStyle} space={4}>
                  <Text fontSize={'lg'} left={2}>
                    Cubicaciones
                  </Text>
                  <HamburgerIcon />
                </HStack>
              </MenuCubages>
            </Stack>
          </HStack>
          <Stack h={165} marginTop={2} alignSelf={'center'}>
            <ListCubages idRoom={id} />
          </Stack>
          <Stack alignSelf={'center'}>
            <Text color={'gray.500'} italic={true}>
              Creado el {moment(created_at).format('DD-MM-YYYY')}
            </Text>
          </Stack>
        </Box>
      </Animatable.View>
    );
  };

  return (
    <>
      <Box marginTop={3} alignItems={'center'}>
        <Box
          w={280}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.300"
          borderWidth="1"
          _web={{
            shadow: 10,
            borderWidth: 1,
          }}
          _light={{
            backgroundColor: colors.cream,
          }}>
          <Accordion
            activeSections={activeSections}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            sections={[props.rooms]}
            //Header Component(View) to render
            renderContent={renderContent}
            //Content Component(View) to render
            duration={400}
            expandMultiple={false}
            //Duration for Collapse and expand
            onChange={setSections}
            //setting the state of active sections
          />
        </Box>
      </Box>
    </>
  );
};

export default CollapsibleRooms;
