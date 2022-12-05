import React, {useEffect, useState} from 'react';
import {
  Modal,
  VStack,
  Text,
  HStack,
  Button,
  Icon,
  Stack,
  Image,
} from 'native-base';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../colors';
import {styles} from '../../styles';

const ModalCubages = props => {
  const {materials, constructions} = props.cubages;
  const {constructionType} = constructions;
  const {stores, communes} = materials;
  const {regions} = communes;
  const [collapsedMeasures, setCollapsedMeasures] = useState(true);
  const [collapsedMaterials, setCollapsedMaterials] = useState(true);
  const [isCoating, setIsCoating] = useState();
  const [description, setDescription] = useState({
    thinnerType: '',
    tool: '',
    gallonsCount: '',
  });

  useEffect(() => {
    console.log(props.cubages)
    if (props.cubages.description !== '') {
      setIsCoating(true);
      const {thinnerType, thinnerCount, tool, gallonsCount} = props.cubages.description;
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

  return (
    <Modal isOpen={props.showModal} onClose={() => props.onClose()} size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header backgroundColor={'warmGray.200'}>
          <Text fontSize={'xl'}>Detalles</Text>
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
                          ? props.cubages.m3
                          : props.cubages.area}
                      </Text>
                    </HStack>
                    {constructionType.id === 1 && (
                      <>
                        {props.cubages.area !== 0 &&
                          <HStack
                            alignItems="center"
                            justifyContent="space-between">
                            <Text fontWeight="medium">Area</Text>
                            <Text color="green.500">{props.cubages.area}</Text>
                          </HStack>}
                        {props.cubages.depth !== 0 &&
                          <HStack
                            alignItems="center"
                            justifyContent="space-between">
                            <Text fontWeight="medium">Altura</Text>
                            <Text color="green.500" bold>
                              {props.cubages.depth} cms
                            </Text>
                          </HStack>
                        }
                      </>
                    )}
                    {props.cubages.width !== 0 &&
                      <HStack alignItems="center" justifyContent="space-between">
                        <Text fontWeight="medium">Ancho</Text>
                        <Text color="green.500" bold>
                          {props.cubages.width} mts
                        </Text>
                      </HStack>
                    }
                    {props.cubages.length !== 0 &&
                      <HStack alignItems="center" justifyContent="space-between">
                        <Text fontWeight="medium">Largo</Text>
                        <Text color="green.500" bold>
                          {props.cubages.length} mts
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
                {props.cubages.dosage}{' '}
                {constructionType.id === 1
                  ? 'saco/m3 aprox'
                  : 'mts2/litro aprox'}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Cantidad</Text>
              <Text color="green.500" bold>
                {props.cubages.count}{' '}
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
                  : props.cubages.gravel + ' sacos'}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">
                {isCoating === true ? 'Tipo diluyente' : 'Arena 5mm'}
              </Text>
              <Text color="green.500">
                {isCoating === true
                  ? description.thinnerType
                  : props.cubages.sand + ' sacos'}
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
                  {props.cubages.water} baldes (10 lts)
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
                $ {priceFormat(materials.price * props.cubages.count)}
              </Text>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ModalCubages;
