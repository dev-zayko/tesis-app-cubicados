import React, {useEffect, useState} from 'react';
import {
  Modal,
  VStack,
  Text,
  HStack,
  Icon,
  Stack,
  Button
} from 'native-base';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {updateFinalized} from '../../../redux/features/Cubages/cubagesSlice';
import {colors} from '../../colors';
import {PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import base64 from 'react-native-base64';
import moment from 'moment';

const ModalCubages = props => {
  const {cubageSelect} = useSelector(state => ({...state.cubages}));
  const {materials, constructions} = cubageSelect;
  const {constructionType} = constructions;
  const {stores, communes} = materials;
  const {regions} = communes;
  const dispatch = useDispatch();
  const {user, userData} = useSelector(state => ({...state.auth}));
  const {memberships} = userData;
  const [collapsedMeasures, setCollapsedMeasures] = useState(true);
  const [collapsedMaterials, setCollapsedMaterials] = useState(true);
  const [isCoating, setIsCoating] = useState();
  const [description, setDescription] = useState({
    thinnerType: '',
    tool: '',
    gallonsCount: '',
  });

  useEffect(() => {
    if (cubageSelect.description !== '') {
      setIsCoating(true);
      const {thinnerType, thinnerCount, tool, gallonsCount} = cubageSelect.description;
      setDescription({
        thinnerType: thinnerType,
        thinnerCount: thinnerCount,
        tool: tool,
        gallonsCount: gallonsCount,
      });
    } else {
      setIsCoating(false);
    }
  }, []);

  const onUpdateFinalized = (isFinalized) => {
    dispatch(updateFinalized({token: user, isFinalized: isFinalized, idCubages: cubageSelect.id})).then(() => {
      props.updateList();
    });
  }

  const toggleExpanded = define => {
    switch (define) {
      case 1:
        setCollapsedMeasures(!collapsedMeasures);
        break;
      case 2:
        setCollapsedMaterials(!collapsedMaterials);
        break;
    }
  };

  const priceFormat = price => {
    return price
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  const checkPermission = async () => {
    try {
      const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (result === true) {
        exportToPdf();
      } else if (result === false) {
        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (status === 'never_ask_again') {

        }
        else if (status === 'denied') {
          checkPermission();
        }
        else if (status === 'granted') {
          exportToPdf();
        }
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const exportToPdf = async () => {
    try {
      let options = {
        html:
          `<html>
  <head>
    <style>
      table,
      th,
      td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 5px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div 
    style="width: 80%; text-align: center">
        <h1>Cotizacion</h1>
    </div>
    <div>
        <h1>Detalles</h1>
        <h3>A nombre de: ${userData.first_name} ${userData.father_last_name} ${userData?.mother_last_name}</h3>
        <h3>Proyecto: ${props?.project.name}<h3>
        <h3>Habitación ${props?.nameRoom}</h3>
    <table style="width: 80%">
      <tr>
        <th>Tipo de construccion</th>
        <td>${constructionType.name}</td>
      </tr>
      <tr>
        <th>Construccion</th>
        <td>${constructions.name}</td>
      </tr>
      <tr>
        <th>${constructionType.id === 1 ? 'M3' : 'M2'}</th>
        <td>${constructionType.id === 1 ? cubageSelect.m3 : cubageSelect.area}</td>
      </tr>
      <tr>
        <th>Dosificacion</th>
        <td>${cubageSelect.dosage} ${constructionType.id === 1 ? 'saco/m3 aprox.' : 'mts2/litro aprox.'}</td>
      </tr>
      <tr>
        <th>Cantidad</th>
        <td>${cubageSelect.count} ${isCoating === true ? 'Litro(s) aprox. necesitas' : 'sacos aprox.'}</td>
      </tr>
      <tr>
        <th>${isCoating === true ? 'Complemento' : 'Grava'}</th>
        <td>${isCoating === true ? description.tool.name : cubageSelect.gravel + ' sacos'}</td>
      </tr>
      <tr>
        <th>${isCoating === true ? 'Tipo diluyente' : 'Arena 5mm'}</th>
        <td>${isCoating === true ? description.thinnerType : cubageSelect.sand + ' sacos'}</td>
      </tr>
        ${isCoating === true ? (
            `
                <tr>
                  <th>Cantidad de Galones</th>
                  <td>${description.gallonsCount} gl</td>
                </tr>
                <tr>
                  <th>Cantidad de diluyente</th>
                  <td>
                    ${description.tool.id === 1
              ? `${description.thinnerCount} cm3 equivale al 5% de diluyente por la cantidad de pintura`
              : description.tool.id === 2 &&
              `${description.thinnerCount} cm3 equivale al 10% de diluyente por la cantidad de pintura`}
                  </td>
                </tr>
           `
          ) : (
            `
              <tr>
                <th>
                  ${isCoating === true ? 'Cantidad de diluyente' : 'Agua'}
                </th>
                <td color="green.500">
                  ${cubageSelect.water} baldes (10 lts)
                </td>
              </tr>
              `
          )}
        </table>
    </div>
    <div>
        <h1>Material</h1>
        <table style="width: 80%">
            <tr>
              <th>Marca</th>
              <td>${materials.trademark}</td>
            </tr>
            <tr>
              <th>titulo</th>
              <td>${materials.title}</td>
            </tr>
            <tr>
              <th>Precio</th>
              <td>${materials.price}</td>
            </tr>
            <tr>
              <th>Tienda</th>
              <td>${stores.name}</td>
            </tr>
            <tr>
              <th>Ubicación</th>
              <td>${regions.name + ', ' + communes.name}</td>
            </tr>
          </table>
    </div>
    <div>
        <h1 style="color: ${colors.orange}">TOTAL: $ ${priceFormat(materials.price * cubageSelect.count)}</h1>
    </div>
  
    <div style="text-align: center;">
     <h4 style='color: #808080'>Cubicados © ${moment().format('YYYY')}</h4>
    </div>
  </body>
</html>`,
        fileName: `${props.nameRoom}.${constructionType.id === 1 ? 'SP' : 'RV'}${Math.random()}`,
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(options)
      alert('PDF Creado')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal isOpen={props.showModal} onClose={() => props.onClose()} size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header backgroundColor={cubageSelect.finalized === true ? colors.otherGreen : 'warmGray.200'}>
          <Text fontSize={'xl'} color={cubageSelect.finalized === true ? 'white' : 'black'}>Detalles</Text>
        </Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight={'medium'}>Tipo de construcción</Text>
              <Text color="blueGray.400">{constructionType.name}</Text>
            </HStack>
            <HStack
              alignItems="center"
              w={constructions.name.length > 30 ? 205 : 280}
              justifyContent="space-between">
              <Text fontWeight="medium">Construcción</Text>
              <Text color="blueGray.400">{constructions.name}</Text>
            </HStack>
            <TouchableOpacity onPress={() => toggleExpanded(1)}>
              <VStack borderWidth={1} borderRadius={5}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Medidas</Text>
                  <Icon
                    as={
                      <Ionicons
                        name={
                          collapsedMeasures
                            ? 'arrow-forward-circle'
                            : 'arrow-down-circle'
                        }
                      />
                    }
                    size={5}
                    ml="2"
                    color={'black'}
                  />
                </HStack>
                <Stack w={'90%'} alignSelf={'center'}>
                  <Collapsible collapsed={collapsedMeasures} align="center">
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">
                        {constructionType.id === 1 ? 'M3' : 'M2'}
                      </Text>
                      <Text color="green.500">
                        {constructionType.id === 1
                          ? cubageSelect.m3
                          : cubageSelect.area}
                      </Text>
                    </HStack>
                    {constructionType.id === 1 && (
                      <>
                        {cubageSelect.area !== 0 &&
                          <HStack
                            alignItems="center"
                            justifyContent="space-between">
                            <Text fontWeight="medium">Area</Text>
                            <Text color="green.500">{cubageSelect.area}</Text>
                          </HStack>}
                        {cubageSelect.depth !== 0 &&
                          <HStack
                            alignItems="center"
                            justifyContent="space-between">
                            <Text fontWeight="medium">Altura</Text>
                            <Text color="green.500" bold>
                              {cubageSelect.depth} cms
                            </Text>
                          </HStack>
                        }
                      </>
                    )}
                    {cubageSelect.width !== 0 &&
                      <HStack alignItems="center" justifyContent="space-between">
                        <Text fontWeight="medium">Ancho</Text>
                        <Text color="green.500" bold>
                          {cubageSelect.width} mts
                        </Text>
                      </HStack>
                    }
                    {cubageSelect.length !== 0 &&
                      <HStack alignItems="center" justifyContent="space-between">
                        <Text fontWeight="medium">Largo</Text>
                        <Text color="green.500" bold>
                          {cubageSelect.length} mts
                        </Text>
                      </HStack>
                    }
                  </Collapsible>
                </Stack>
              </VStack>
            </TouchableOpacity>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Dosificación</Text>
              <Text color="green.500" bold>
                {cubageSelect.dosage}{' '}
                {constructionType.id === 1
                  ? 'saco/m3 aprox'
                  : 'mts2/litro aprox'}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Cantidad</Text>
              <Text color="green.500" bold>
                {cubageSelect.count}{' '}
                {isCoating === true
                  ? 'Litro(s) aprox. necesitas'
                  : 'sacos aprox.'}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">
                {isCoating === true ? 'Complemento' : 'Grava'}
              </Text>
              <Text color="green.500">
                {isCoating === true
                  ? description.tool.name
                  : cubageSelect.gravel + ' sacos'}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">
                {isCoating === true ? 'Tipo diluyente' : 'Arena 5mm'}
              </Text>
              <Text color="green.500">
                {isCoating === true
                  ? description.thinnerType
                  : cubageSelect.sand + ' sacos'}
              </Text>
            </HStack>
            {isCoating === true ? (
              <>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Cantidad de Galones</Text>
                  <Text color="green.500">{description.gallonsCount} gl</Text>
                </HStack>
                <VStack justifyContent="space-between">
                  <Text fontWeight="medium">Cantidad de diluyente</Text>
                  <Text color="green.500">
                    {description.tool.id === 1
                      ? `${description.thinnerCount} cm3 equivale al 5% de diluyente por la cantidad de pintura`
                      : description.tool.id === 2 &&
                      `${description.thinnerCount} cm3 equivale al 10% de diluyente por la cantidad de pintura`}
                  </Text>
                </VStack>
              </>
            ) : (
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">
                  {isCoating === true ? 'Cantidad de diluyente' : 'Agua'}
                </Text>
                <Text color="green.500">
                  {cubageSelect.water} baldes (10 lts)
                </Text>
              </HStack>
            )}
            <TouchableOpacity onPress={() => toggleExpanded(2)}>
              <VStack borderWidth={1} borderRadius={5}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Material</Text>
                  <Icon
                    as={
                      <Ionicons
                        name={
                          collapsedMaterials
                            ? 'arrow-forward-circle'
                            : 'arrow-down-circle'
                        }
                      />
                    }
                    size={5}
                    ml="2"
                    color={'black'}
                  />
                </HStack>
                <Stack w={'90%'} alignSelf={'center'}>
                  <Collapsible collapsed={collapsedMaterials} align="center">
                    <VStack>
                      <HStack justifyContent="space-between">
                        <Text>Marca</Text>
                        <Text color={'green.500'}>{materials.trademark}</Text>
                      </HStack>
                      <HStack justifyContent="space-between">
                        <Text>Titulo</Text>
                        <Text color={'green.500'}>{materials.title}</Text>
                      </HStack>
                      <HStack justifyContent="space-between">
                        <Text>Precio</Text>
                        <Text color={'green.500'}>
                          $ {priceFormat(materials.price)}
                        </Text>
                      </HStack>
                      <HStack justifyContent="space-between">
                        <Text>Tienda</Text>
                        <Text color={'green.500'}>{stores.name}</Text>
                      </HStack>
                      <HStack justifyContent="space-between">
                        <Text>Ubicación</Text>
                        <Text color={'green.500'}>
                          {regions.name + ', ' + communes.name}
                        </Text>
                      </HStack>
                    </VStack>
                  </Collapsible>
                </Stack>
              </VStack>
            </TouchableOpacity>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium" fontSize={'xl'}>
                Total
              </Text>
              <Text color="green.500" fontSize={'lg'}>
                $ {priceFormat(materials.price * cubageSelect.count)}
              </Text>
            </HStack>
            <HStack justifyContent={'center'} space={5}>
              <Button size="md" colorScheme={cubageSelect.finalized === true ? 'success' : 'warning'} onPress={() => onUpdateFinalized(cubageSelect.finalized === true ? false : true)} leftIcon={<Icon as={AntDesign} name={cubageSelect.finalized === true ? 'checkcircle' : 'closecircle'} size="sm" />}>
                {cubageSelect.finalized === true ? 'Finalizado' : 'Finalizar'}
              </Button>
              {memberships.id !== 1 &&
                <Button size="md" onPress={() => checkPermission()} colorScheme="danger" leftIcon={<Icon as={FontAwesome} name="file-pdf-o" size="sm" />}>
                  Exportar a PDF
                </Button>
              }
            </HStack>

          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal >
  );
};

export default ModalCubages;
