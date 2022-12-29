import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Flex, HStack, Image, Stack, Text, useToast, VStack} from 'native-base';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListRegion from '../Region';
import ListCommune from '../Commune';
import {styles} from '../../styles';
import {colors} from '../../colors';
import {getCommunes} from '../../../redux/features/Location/locationSlice';
import {
  getProducts,
  resetListProducts,
  setProductSelect,
} from '../../../redux/features/Quoter/quoterSlice';
import CollapsibleProducts from '../../Collapsible/Quoter/Products';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AlertEmpty from '../../AlertDialog/AlertEmpty';
import {TypeLoading} from '../../Animation/Loading';

const ListProducts = () => {
  const {regions} = useSelector(state => ({...state.location}));
  const {storeSelect} = useSelector(state => ({...state.store}));
  const {products, loading, typeProduct, status} = useSelector(state => ({
    ...state.products,
  }));
  const {user} = useSelector(state => ({...state.auth}));
  const {define, mineRegion, mineCommune} = useSelector(state => ({
    ...state.utility,
  }));
  const {name} = storeSelect;
  const dispatch = useDispatch();
  const [regionSelect, setRegionSelect] = useState('');
  const [communeSelect, setCommuneSelect] = useState('');
  const [disabledSelect, setDisabledSelect] = useState(false);
  const [isOpenAlertEmpty, setIsOpenAlertEmpty] = useState(true);
  const [renderList, setRenderList] = useState(true);
  const toast = useToast();

  const onClose = () => setIsOpenAlertEmpty(false);
  const cancelRef = useRef(null);
  const navigation = useNavigation();

  const onNavigateStore = () => navigation.navigate('ListStores');

  const onViewProduct = link => Linking.openURL(link);

  const onAddProducts = item => {
    navigation.navigate('ResultQuoter');
    dispatch(setProductSelect(item));
    setRenderList(false);
  };

  const onSearchProducts = () => {
    setDisabledSelect(true);
    dispatch(resetListProducts());
    setIsOpenAlertEmpty(true);
    dispatch(
      getProducts({
        token: user,
        storeName: name,
        typeProduct: typeProduct,
        region: define === 'other' ? regionSelect : mineRegion,
        commune: define === 'other' ? communeSelect : mineCommune.toUpperCase(),
      }),
    ).then(() => setDisabledSelect(false));
  };
  useEffect(() => {
    console.log(define);
    if (define === 'mine') {
      onSearchProducts();
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      setRenderList(true);
    }, []),
  );

  return (
    <Stack>
      <Stack alignItems={'center'} h={70} justifyContent={'center'}>
        <HStack>
          <Image
            source={
              name === 'Sodimac'
                ? require('../../../assets/logo-sodimac.png')
                : name === 'Easy'
                ? require('../../../assets/logo-easy.png')
                : name === 'Construmart' &&
                  require('../../../assets/logo-construmart.png')
            }
            alt="logo-stores"
            width={100}
            borderRadius={100}
            height={100}
          />
          <Stack justifyContent={'center'}>
            <Text fontSize={'3xl'}>{name}</Text>
          </Stack>
        </HStack>
      </Stack>
      {define === 'other' && (
        <Stack>
          <Flex alignItems={'center'} w={'100%'}>
            <Text fontSize={18}>Ubicación</Text>
          </Flex>
          <VStack w={'100%'} h={100} alignItems={'center'} space={5}>
            <>
              {regions !== 0 && (
                <ListRegion
                  listRegions={regions}
                  setRegion={region => {
                    setRegionSelect(region);
                    dispatch(
                      getCommunes({region: region, store: name, toast: toast}),
                    );
                  }}
                  disabledSelect={disabledSelect}
                />
              )}
              <ListCommune
                setCommune={commune => {
                  setCommuneSelect(commune);
                }}
                disabledSelect={disabledSelect}
              />
            </>
          </VStack>

          <Stack alignItems={'center'}>
            {loading === false ? (
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={() => onSearchProducts()}>
                <Text style={styles.textLogin}>Buscar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonLogin}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </TouchableOpacity>
            )}
          </Stack>
        </Stack>
      )}
      <Stack>
        {loading === true ? (
          <Stack
            w={'100%'}
            h={300}
            alignItems={'center'}
            justifyContent={'center'}
            space={10}>
            <TypeLoading.Square active />
            <Text fontSize={18}>Cargando</Text>
          </Stack>
        ) : (
          <>
            {renderList && (
              <>
                {status === 'success' ? (
                  <FlatList
                    data={products}
                    renderItem={({item}) => (
                      <>
                        {typeProduct !== 'Cemento' &&
                        !item.title.match(/(litros)|(5)|(4)|(400)/) ? (
                          <CollapsibleProducts
                            products={item}
                            showItem={link => onViewProduct(link)}
                            addItem={item => onAddProducts(item)}
                          />
                        ) : (
                          <CollapsibleProducts
                            products={item}
                            showItem={link => onViewProduct(link)}
                            addItem={item => onAddProducts(item)}
                          />
                        )}
                      </>
                    )}
                    keyExtractor={(value, index) => index.toString()}
                  />
                ) : (
                  status === 'empty' && (
                    <AlertEmpty
                      isOpen={isOpenAlertEmpty}
                      onClose={() => onClose()}
                      cancelRef={cancelRef}
                      otherStore={onNavigateStore}
                    />
                  )
                )}
              </>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default ListProducts;
