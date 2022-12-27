import React, {useState} from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {Text as TextReact, TouchableOpacity} from 'react-native';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import {colors} from '../../../colors';
import {styles} from '../../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CollapsibleProducts = props => {
  const [activeSections, setActiveSections] = useState([]);
  const {tradeMark, title, image, price, city, linkProduct} = props.products;
  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View duration={400} transition="backgroundColor">
        <HStack>
          <Box>
            <Image
              source={{
                uri: image,
              }}
              alt="logo-casa"
              w={90}
              h={160}
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
              Producto
            </Center>
          </Box>
          <VStack left={5} w={'60%'}>
            <VStack space={2} top={2}>
              <TextReact style={{fontSize: 15, fontWeight: 'bold'}}>
                {tradeMark}
              </TextReact>
              <Heading size={'sm'} ml="-1" color={'gray.500'}>
                {title}
              </Heading>
              <Heading size="md" ml="-1" color={'red.700'}>
                {price}
              </Heading>
              <Stack alignItems={'flex-end'} right={'5%'}>
                <Heading size={'sm'} ml="-1">
                  {city}
                </Heading>
              </Stack>
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
        style={{textAlign: 'center', height: 50, justifyContent: 'flex-end'}}>
        <Box alignItems={'center'}>
          <HStack space={5} bottom={1}>
            <TouchableOpacity
              style={[styles.buttonProducts, styles.shadow]}
              onPress={() => props.showItem(linkProduct)}>
              <HStack space={2}>
                <Icon
                  as={Ionicons}
                  name={'eye-sharp'}
                  size={6}
                  color={'gray.500'}
                />
                <Text color={'gray.500'}>Ver en tienda</Text>
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonProducts, styles.shadow]}
              onPress={() => props.addItem(props.products)}>
              <HStack space={2}>
                <Icon
                  as={Ionicons}
                  name={'add-circle'}
                  size={6}
                  color={'gray.500'}
                />
                <Text color={'gray.500'}>Agregar</Text>
              </HStack>
            </TouchableOpacity>
          </HStack>
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
          style={styles.shadow}
          backgroundColor={'gray.100'}
          _web={{
            shadow: 10,
            borderWidth: 1,
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

export default CollapsibleProducts;
