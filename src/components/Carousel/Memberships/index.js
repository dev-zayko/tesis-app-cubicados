import {HStack, Icon, Stack, Text, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Text as TextReact,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../colors';
import {styles} from '../../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-anchor-carousel';
import PaginationDot from '../../PaginationDot';

const INITIAL_INDEX = 0;
const {width: windowWidth} = Dimensions.get('window');

const CarouselMemberships = props => {
  const {memberships} = useSelector(state => ({...state.memberships}));
  const scrollX = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState();
  const [lengthItem, setLengthItem] = useState();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  const handleCarouselScrollEnd = (item, index) => {
    setCurrentIndex(index);
  };

  const renderItem = ({item, index}) => {
    const {id, name, final_amount, discount} = item;
    return (
      <Stack alignItems={'center'} w={'100%'}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.item, styles.shadow]}
          onPress={() => {
            scrollX.current.scrollToIndex(index);
            carouselRef.current.scrollToIndex(index);
          }}>
          <Stack>
            <Stack w={'100%'}>
              <HStack w={'10%'} h={'10%'} top={5}>
                {discount > 0 && (
                  <Stack
                    backgroundColor={'cyan.500'}
                    w={10}
                    h={10}
                    justifyContent={'center'}
                    borderRightRadius={50}>
                    <Text fontSize={15} color={'white'}>
                      %{discount}
                    </Text>
                  </Stack>
                )}
              </HStack>
              <VStack alignItems={'center'} w={'100%'}>
                <Text fontSize={20}>{name}</Text>
              </VStack>
            </Stack>
            <VStack alignItems={'center'} space={2}>
              <HStack>
                <TextReact style={{fontWeight: 'bold', fontSize: 30}}>
                  ${' '}
                  {final_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  clp /
                </TextReact>
                <TextReact style={{fontWeight: 'bold', fontSize: 15, top: 14}}>
                  {id === 2
                    ? 'Mes'
                    : id === 3
                    ? '3 Meses'
                    : id === 4 && '1 Año'}
                </TextReact>
              </HStack>
              <Stack w={'100%'} alignItems={'center'}>
                <TextReact style={[styles.subtitleText, styles.textMedium]}>
                  {id === 2
                    ? 'Plan básico para comenzar a vivir la experiencia cubicados.'
                    : id === 4
                    ? 'Plan PRO para vivir experiencia completa.'
                    : id === 3 &&
                      'Plan trimestral con ofertas de temporada, no te lo pierdas.'}
                </TextReact>
              </Stack>
            </VStack>
            <VStack
              w={'100%'}
              alignItems={'center'}
              h={200}
              justifyContent={'center'}>
              <HStack space={3}>
                <VStack space={3.5}>
                  <Text fontSize={15}>Cubicaciones ilimitadas</Text>
                  <Text fontSize={15}>Proyectos ilimitados</Text>
                  <Text fontSize={15}>Habitaciones ilimitadas</Text>
                  <Text fontSize={15}>Gestionar Cotizaciones</Text>
                  <Text fontSize={15}>Exportar proyectos a PDF</Text>
                </VStack>
                <VStack space={3}>
                  <Icon
                    as={AntDesign}
                    name={'checkcircle'}
                    size={6}
                    color={colors.otherGreen}
                  />
                  <Icon
                    as={AntDesign}
                    name={'checkcircle'}
                    size={6}
                    color={colors.otherGreen}
                  />
                  <Icon
                    as={AntDesign}
                    name={'checkcircle'}
                    size={6}
                    color={colors.otherGreen}
                  />
                  <Icon
                    as={AntDesign}
                    name={'checkcircle'}
                    size={6}
                    color={colors.otherGreen}
                  />
                  <Icon
                    as={AntDesign}
                    name={'checkcircle'}
                    size={6}
                    color={colors.otherGreen}
                  />
                </VStack>
              </HStack>
            </VStack>
            <Stack w={'100%'} alignItems={'center'}>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => props.selectMemberships(final_amount, id)}>
                <Text style={styles.textLogin}>Comprar plan</Text>
              </TouchableOpacity>
            </Stack>
          </Stack>
        </TouchableOpacity>
      </Stack>
    );
  };

  return (
    <Stack w={'100%'} h={'100%'} alignItems={'center'}>
      <Carousel
        data={memberships}
        renderItem={renderItem}
        inActiveOpacity={0.3}
        ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        onScrollEnd={handleCarouselScrollEnd}
        containerWidth={windowWidth}
        ref={carouselRef}
      />
      <Stack w={'100%'}>
        {memberships !== 0 && (
          <PaginationDot
            currentIndex={currentIndex}
            length={memberships.length}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default CarouselMemberships;
