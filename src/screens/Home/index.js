import {useFocusEffect} from '@react-navigation/native';
import {Divider, HStack, Icon, Image, ScrollView, Stack, Text, VStack} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import {TouchableOpacity, Text as TextReact} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Background from '../../components/Background';
import {colors} from '../../components/colors';
import Container from '../../components/Container';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from '../../components/styles';
import {getMemberships, getPopularMemberships} from '../../redux/features/Memberships/membershipsSlice';
import {getPopularStores} from '../../redux/features/Stores/storesSlice';
import {getPopularTrademark} from '../../redux/features/Material/materialSlice';
import {Linking} from 'react-native';

const Home = ({navigation}) => {

  const dispatch = useDispatch()
  const {memberships, loading: loadingMembership} = useSelector(state => ({...state.memberships}));
  const {popularStores} = useSelector(state => ({...state.store}));
  const [memberPopular, setMemberPopular] = useState(null);
  const [storePopular, setStorePopular] = useState([]);
  const [surfacePopular, setSurfacePopular] = useState('');
  const [coatingPopular, setCoatingPopular] = useState('');

  useFocusEffect(
    useCallback(() => {
      dispatch(getMemberships({}));
      dispatch(getPopularStores({}))
        .then((response) => {
          MostPopularStore(response.payload.data);
        });
      dispatch(getPopularMemberships({}))
        .then((response) => {
          MostPopularPlans(response.payload.data);
        });
      dispatch(getPopularTrademark({idConstruction: 1})).then((response) => {
        MostPopularTrademark(response.payload.data, 1);
      });
      dispatch(getPopularTrademark({idConstruction: 2})).then((response) => {
        MostPopularTrademark(response.payload.data, 2);
      });
    }, []),
  );
  const MostPopularPlans = (popularMemberships) => {
    const {membresiasMensuales, membresiasTrimestrales, membresiasAnuales} = popularMemberships[0];
    const maxVal = Object.entries({membresiasMensuales, membresiasTrimestrales, membresiasAnuales}).sort(([, a], [, b]) => b - a)[0];
    if (maxVal[0] === 'membresiasMensuales') {
      setMemberPopular(0)
    } else if (maxVal[0] === 'membresiasTrimestrales') {
      setMemberPopular(1);
    } else if (maxVal[0] === 'membresiasAnuales') {
      setMemberPopular(2);
    } else {
      setMemberPopular(3);
    }
    return true;
  }

  const MostPopularStore = (popularStore) => {
    const {Sodimac, Construmart, Easy} = popularStore[0];
    const myArray = [{
      id: 1,
      name: 'Sodimac',
      count: Sodimac
    },
    {
      id: 2,
      name: "Construmart",
      count: Construmart
    },
    {
      id: 3,
      name: "Easy",
      count: Easy
    }
    ];
    const data = myArray.sort(function (a, b) {return a.count - b.count});
    setStorePopular(data);
    return true;
  }
  const MostPopularTrademark = (popularTrademark, idConstructionType) => {
    const data = popularTrademark.sort(function (a, b) {return a.count - b.count});
    if (idConstructionType === 1) {
      setSurfacePopular(data);
    } else {
      setCoatingPopular(data);
    }
    return true;
  }
  return (
    <Background>
      <Container>
        <Image source={require('../../assets/banner-projects.jpg')} borderRadius={10} w={350} h={"100%"} alt={'banners'} />
        <LinearGradient
          colors={['#00000000', '#000000']}
          style={{height: '100%', width: '100%', position: 'absolute', borderRadius: 10}}>
          <ScrollView>
            <Stack alignItems={'center'} h={180} justifyContent={'center'}>
              <Image source={require('../../assets/logo-empresa.png')} w={240} h={120} alt={'logo-empresa'} />
            </Stack>
            <Stack w={'100%'} alignItems={'center'} h={70}>
              <Text color={'white'} fontSize={18}>Bienvenido a cubicados, una app que se creo para ayudarte a ti y a tu negocio</Text>
            </Stack>
            <Stack backgroundColor={'yellow.500'} h={320}>
              <Stack h={50} justifyContent={'center'} left={5}>
                <Text fontSize={20} color={'white'}>Nuestros Servicios</Text>
                <Divider my="1" _light={{
                  bg: "white"
                }} _dark={{
                  bg: "white"
                }} />
              </Stack>
              <Stack alignItems={'center'}>
                <HStack h={'100%'} w={'90%'} space={5}>
                  <VStack space={2}>
                    <Image source={require('../../assets/plano.png')} w={58} h={58} alt={'plano'} />
                    <Image source={require('../../assets/excel.png')} w={58} h={58} alt={'plano'} />
                    <Image source={require('../../assets/pago.png')} w={58} h={58} alt={'plano'} />
                    <Image source={require('../../assets/ai.png')} w={58} h={58} alt={'plano'} />
                  </VStack>
                  <VStack w={200} space={5}>
                    <Text fontSize={18} color={'white'}>Cubica tus proyectos</Text>
                    <Text fontSize={18} color={'white'}>Exporta tus cubicaciones</Text>
                    <Text fontSize={18} color={'white'}>Membresias al mejor precio</Text>
                    <Text fontSize={18} color={'white'}>Algoritmo que busca productos en tiempo real</Text>
                  </VStack>
                </HStack>
              </Stack>
            </Stack>
            <Stack w={'100%'} h={500}>
              <Stack h={50} justifyContent={'center'} left={5}>
                <Text fontSize={20} color={'white'}>Plan Popular</Text>
                <Divider my="2" _light={{
                  bg: "white"
                }} _dark={{
                  bg: "white"
                }} />
              </Stack>
              {memberPopular !== null && memberships !== 0 &&
                <Stack alignItems={'center'} w={'100%'}>
                  <Stack w={'100%'}>
                    <HStack w={'10%'} h={'10%'} top={5}>
                      {memberships[memberPopular]?.discount > 0 && (
                        <Stack
                          backgroundColor={'cyan.500'}
                          w={10}
                          h={10}
                          justifyContent={'center'}
                          borderRightRadius={50}>
                          <Text fontSize={15} color={'white'}>
                            %{memberships[memberPopular]?.discount}
                          </Text>
                        </Stack>
                      )}
                    </HStack>
                    <VStack alignItems={'center'} w={'100%'}>
                      <Text fontSize={20} color={'white'}>{memberships[memberPopular]?.name}</Text>
                    </VStack>
                  </Stack>
                  <VStack alignItems={'center'} space={2}>
                    <HStack>
                      <TextReact style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>
                        ${' '}
                        {memberships[memberPopular]?.final_amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                        clp /
                      </TextReact>
                      <TextReact style={{fontWeight: 'bold', fontSize: 15, top: 14, color: 'white'}}>
                        {memberships[memberPopular]?.id === 2
                          ? 'Mes'
                          : memberships[memberPopular]?.id === 3
                            ? '3 Meses'
                            : memberships[memberPopular]?.id === 4 && '1 Año'}
                      </TextReact>
                    </HStack>
                    <Stack w={'100%'} alignItems={'center'}>
                      <TextReact style={[styles.subtitleText, styles.textMedium, {color: 'white'}]}>
                        {memberships[memberPopular]?.id === 2
                          ? 'Plan básico para comenzar a vivir la experiencia cubicados.'
                          : memberships[memberPopular]?.id === 4
                            ? 'Plan PRO para vivir experiencia completa.'
                            : memberships[memberPopular]?.id === 3 &&
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
                        <Text fontSize={15} color={'white'}>Cubicaciones ilimitadas</Text>
                        <Text fontSize={15} color={'white'}>Proyectos ilimitados</Text>
                        <Text fontSize={15} color={'white'}>Habitaciones ilimitadas</Text>
                        <Text fontSize={15} color={'white'}>Soporte Full</Text>
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

                        {memberships[memberPopular]?.id === 4 ? (
                          <Icon
                            as={AntDesign}
                            name={'checkcircle'}
                            style={styles.icon}
                            size={6}
                            color={colors.otherGreen}
                          />
                        ) : (
                          <Icon
                            as={AntDesign}
                            name={'closecircle'}
                            style={styles.icon}
                            size={6}
                            color={colors.red}
                          />
                        )}
                      </VStack>
                    </HStack>
                  </VStack>
                  <Stack w={'100%'} alignItems={'center'}>
                    <TouchableOpacity style={styles.buttonLogin}>
                      <Text style={styles.textLogin}>Ir a Planes</Text>
                    </TouchableOpacity>
                  </Stack>
                </Stack>
              }
            </Stack>
            {storePopular?.length !== 0 &&
              <Stack w={'100%'} h={300}>
                <Stack h={50} justifyContent={'center'} left={5}>
                  <Text fontSize={20} color={'white'}>Tiendas Populares</Text>
                  <Divider my="2" _light={{
                    bg: "white"
                  }} _dark={{
                    bg: "white"
                  }} />
                </Stack>
                <Stack w={'100%'} left={5}>
                  <Text color={'white'} fontSize={15}>Los Usuarios estan comprando en</Text>
                </Stack>
                <Stack left={5}>
                  <Text fontSize={18} color={'white'}>{storePopular[2]?.name}: {storePopular[2]?.count} cotizaciones</Text>
                  <Text fontSize={18} color={'white'}>{storePopular[1]?.name}: {storePopular[1]?.count} cotizaciones</Text>
                  <Text fontSize={18} color={'white'}>{storePopular[0]?.name}: {storePopular[0]?.count} cotizaciones</Text>
                </Stack>
                <Stack w={'100%'} alignItems={'center'} h={150} justifyContent={'center'}>
                  {storePopular[2]?.name === 'Construmart' ?
                    <Image source={require('../../assets/store-construmart.jpg')} w={100} borderRadius={100} h={100} alt={'images'} />
                    : <Image source={require('../../assets/store-sodimac.png')} w={100} borderRadius={100} h={100} alt={'imagev'} />}
                </Stack>
              </Stack>
            }
            <Stack w={'100%'} h={250}>
              <Stack h={50} justifyContent={'center'} left={5}>
                <Text fontSize={20} color={'white'}>Marcas Populares</Text>
                <Divider my="2" _light={{
                  bg: "white"
                }} _dark={{
                  bg: "white"
                }} />
              </Stack>
              <Stack space={2}>
                <Stack left={5}>
                  <Text color={'white'} fontSize={15}>En superficies lidera:</Text>
                  <Text fontSize={18} color={'white'}>{surfacePopular[2]?.trademark}: {surfacePopular[2]?.count} cotizaciones</Text>
                  <Text fontSize={18} color={'white'}>{surfacePopular[1]?.trademark}: {surfacePopular[1]?.count} cotizaciones</Text>
                  <Text fontSize={18} color={'white'}>{surfacePopular[0]?.trademark}: {surfacePopular[0]?.count} cotizaciones</Text>
                </Stack>
                <Stack left={5}>
                  <Text color={'white'} fontSize={15}>En Revestimiento lidera:</Text>
                  {coatingPopular[2]?.trademark !== undefined &&
                    <Text fontSize={18} color={'white'}>{coatingPopular[2]?.trademark}: {coatingPopular[2]?.count} cotizaciones</Text>
                  }
                  <Text fontSize={18} color={'white'}>{coatingPopular[1]?.trademark}: {coatingPopular[1]?.count} cotizaciones</Text>
                  <Text fontSize={18} color={'white'}>{coatingPopular[0]?.trademark}: {coatingPopular[0]?.count} cotizaciones</Text>
                </Stack>
              </Stack>
            </Stack>
            <Stack w={'100%'} h={250}>
              <Stack h={50} justifyContent={'center'} left={5}>
                <Text fontSize={20} color={'white'}>Dosificaciones en cemento</Text>
                <Divider my="2" _light={{
                  bg: "white"
                }} _dark={{
                  bg: "white"
                }} />
              </Stack>
              <Stack space={2} alignItems={'center'}>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => Linking.openURL('http://www.polpaico.cl/wp-content/uploads/NUEVO_VOL_DOSIFICACION-LEY.pdf')}>
                  <Text style={styles.textLogin}>Polpaico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => Linking.openURL('https://cbb.cl/wp-content/uploads/2022/04/Tabla-de-dosificacion.png')}>
                  <Text style={styles.textLogin}>CBB</Text>
                </TouchableOpacity>
              </Stack>
            </Stack>
            <Stack w={'100%'} h={250}>
              <Stack h={50} justifyContent={'center'} left={5}>
                <Text fontSize={20} color={'white'}>Contacto</Text>
                <Divider my="2" _light={{
                  bg: "white"
                }} _dark={{
                  bg: "white"
                }} />
              </Stack>
              <Stack space={2} alignItems={'center'} justifyContent={'center'} h={100}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.cubicados.cl/')}>
                  <Text underline color={colors.brand} fontSize={18}>https://www.cubicados.cl/</Text>
                </TouchableOpacity>
              </Stack>
            </Stack>
          </ScrollView>
        </LinearGradient>
      </Container>
    </Background >
  );
};
export default Home;

