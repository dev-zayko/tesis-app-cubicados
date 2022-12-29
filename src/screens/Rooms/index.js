import React, { useRef, useState} from 'react';
//Components Native base
import {
  CheckIcon,
  Flex,
  HStack,
  Icon,
  Input,
  Select,
  Stack,
  Text,
  useDisclose,
  useToast,
} from 'native-base';
//Custom Components styles, colors, background
import {styles} from '../../components/styles';
import {colors} from '../../components/colors';
import Background from '../../components/Background';
//Hook focus
import {useFocusEffect} from '@react-navigation/native';
//hook redux
import {useDispatch, useSelector} from 'react-redux';
//Components of React native
import {ActivityIndicator, TouchableOpacity} from 'react-native';
//React vector icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ListRooms from '../../components/List/Rooms/index';
import {getRoomsByProject} from '../../redux/features/Rooms/roomSlice';
//Modal Rooms
import ModalRooms from '../../components/Modals/Rooms';
import AlertLimited from '../../components/AlertDialog/AlertLimited';
import HandDownAnimation from '../../components/Animation/EmptyValue';
import {filter} from 'lodash';
import moment from 'moment';
import Container from '../../components/Container';
import AlertDelete from '../../components/AlertDialog/Rooms/AlertDelete';
import AlertPremium from '../../components/AlertDialog/AlertPremium';
import ModalMemberships from '../../components/Modals/Membership';

const Rooms = ({route, navigation}) => {
  const [update, setUpdate] = useState(false);
  const [isOpenAlertPr, setIsOpenAlerPr] = useState(false);
  const [status, setStatus] = useState('');
  const [fullData, setFullData] = useState(0);
  const [actionModal, setActionModal] = useState(0);
  const [roomSelect, setRoomSelect] = useState('');
  const [selectMonth, setSelectMonth] = useState('');
  const [selectYear, setSelectYear] = useState('');
  const [nameConstruction, setNameConstruction] = useState('');
  const [isOpenAlertLimited, setIsOpenAlertLimited] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalPlan, setIsOpenModalPlan] = useState(false);
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {project} = route.params?.params;
  const toast = useToast();
  const {user} = useSelector(state => ({...state.auth}));
  const {rooms} = useSelector(state => ({...state.room}));
  const cancelRef = useRef(null);
  const [isOpenAlertDl, setIsOpenDl] = useState(false);
  const cancelRefAlert = useRef(null);
  const onCloseAlertDl = () => setIsOpenDl(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRoomsByProject({token: user, idProject: project.id})).then(
        response => {
          setFullData(response.payload);
        },
      );
    }, [update]),
  );
  const onUpdate = () => {
    onClose();
    setUpdate(!update);
  };
  const onCloseAlertLimited = () => setIsOpenAlertLimited(false);

  const onOpenAlertLimited = (statusData, typeConstruction) => {
    if (
      statusData === 'limited' ||
      statusData === 'discontinued' ||
      statusData === 'duplicated'
    ) {
      setNameConstruction(typeConstruction);
      setStatus(statusData);
      setIsOpenAlertLimited(true);
    }
  };
  const onSearch = text => {
    const formattedQuery = text;
    const data = filter(rooms, roomForm => {
      return contains(roomForm, formattedQuery);
    });
    setFullData(data);
  };
  const contains = (proyect, query) => {
    const {name} = proyect;
    let reg = new RegExp(query, 'gi');
    if (name.match(reg) !== null) {
      return true;
    } else {
      return false;
    }
  };
  const onSearchMonth = text => {
    setSelectMonth(text);
    const formattedQuery = text;
    const data = filter(rooms, roomForm => {
      return containsMonth(roomForm, formattedQuery);
    });
    if (data.length === 0) {
      toast.show({
        description: 'No hay proyectos en este mes',
      });
    } else {
      setFullData(data);
    }
  };
  const containsMonth = (room, query) => {
    const {created_at} = room;
    const monthInt = moment(created_at).format('MM');
    if (monthInt.includes(query)) {
      return true;
    } else {
      return false;
    }
  };
  const onSearchYear = text => {
    setSelectYear(text);
    const formattedQuery = text;
    const data = filter(fullData, projectForm => {
      return containsYear(projectForm, formattedQuery);
    });
    if (data.length === 0) {
      toast.show({
        description: 'No hay proyectos en este año',
      });
    } else {
      setFullData(data);
    }
  };
  const containsYear = (room, query) => {
    const {created_at} = room;
    const monthInt = moment(created_at).format('YYYY');
    if (monthInt.includes(query)) {
      return true;
    } else {
      return false;
    }
  };
  const cleanFilter = () => {
    setSelectMonth('');
    setSelectYear('');
    setFullData(rooms);
  };
  return (
    <Background>
      <Container>
        <Flex alignItems={'center'}>
          <Text bold fontSize={'4xl'}>
            {project.name}
          </Text>
          <Text bold fontSize={'lg'}>
            Lista de tus habitaciones creadas
          </Text>
        </Flex>
        <Stack w={'80%'} space={3} h={120} justifyContent={'center'}>
          <Stack>
            <Input
              variant="rounded"
              placeholder="BUSCAR"
              backgroundColor={'gray.200'}
              onChangeText={onSearch}
              InputLeftElement={
                <Icon
                  as={<Ionicons name="search-circle" />}
                  size={10}
                  color={colors.orange}
                />
              }
            />
          </Stack>
          <HStack space={2} justifyContent={'center'}>
            <Select
              selectedValue={selectMonth}
              backgroundColor={'gray.200'}
              minWidth={'120'}
              borderRadius={20}
              accessibilityLabel="MES"
              placeholder="MES"
              _selectedItem={{
                bg: 'otange.500',
                endIcon: <CheckIcon size="5" color={'white'} />,
              }}
              mt={1}
              onValueChange={itemValue => onSearchMonth(itemValue)}>
              <Select.Item label="Enero" value="01" />
              <Select.Item label="Febrero" value="02" />
              <Select.Item label="Marzo" value="03" />
              <Select.Item label="Abril" value="04" />
              <Select.Item label="Mayo" value="05" />
              <Select.Item label="Junio" value="06" />
              <Select.Item label="Julio" value="07" />
              <Select.Item label="Agosto" value="08" />
              <Select.Item label="Septiembre" value="09" />
              <Select.Item label="Octubre" value="10" />
              <Select.Item label="Noviembre" value="11" />
              <Select.Item label="Diciembre" value="12" />
            </Select>
            <Select
              backgroundColor={'gray.200'}
              fontSize={14}
              selectedValue={selectYear}
              minWidth={'100'}
              borderRadius={20}
              accessibilityLabel="AÑO"
              placeholder="AÑO"
              _selectedItem={{
                bg: 'orange.500',
                endIcon: <CheckIcon size="5" color={'white'} />,
              }}
              mt={1}
              onValueChange={itemValue => onSearchYear(itemValue)}>
              <Select.Item label="2022" value="2022" />
              <Select.Item label="2023" value="2023" />
              <Select.Item label="2024" value="2024" />
              <Select.Item label="2025" value="2025" />
              <Select.Item label="2026" value="2026" />
              <Select.Item label="2027" value="2027" />
              <Select.Item label="2038" value="2028" />
            </Select>
            <Stack justifyContent={'center'}>
              <TouchableOpacity onPress={() => cleanFilter()}>
                <Icon
                  as={Entypo}
                  name={'erase'}
                  size={'8'}
                  color={colors.orange}
                />
              </TouchableOpacity>
            </Stack>
          </HStack>
        </Stack>
        <Stack
          w={'85%'}
          h={400}
          justifyContent={'center'}
          alignItems={'center'}>
          {fullData === 0 ? (
            <ActivityIndicator size={'large'} color={colors.orange} />
          ) : rooms === null ? (
            <Stack h={250} space={20}>
              <Stack alignItems={'center'}>
                <Text fontSize={'lg'}>No tienes Habitaciones creadas</Text>
                <Text fontSize={'lg'}>¡Crea una!</Text>
              </Stack>
              <Stack
                w={280}
                alignItems={'center'}
                h={100}
                justifyContent={'flex-end'}>
                <HandDownAnimation />
              </Stack>
            </Stack>
          ) : (
            <ListRooms
              rooms={fullData}
              project={project}
              edit={() => {
                setActionModal(2);
                setIsOpenModal(true);
              }}
              isOpenAlertPr={() => {
                setIsOpenAlerPr(true);
              }}
              roomSelect={room => setRoomSelect(room)}
              delete={() => setIsOpenDl(true)}
              update={() => setUpdate(!update)}
              alertLimited={(statusData, typeConstruction) =>
                onOpenAlertLimited(statusData, typeConstruction)
              }
              onActionSheet={roomsSelect => onSelectProject(roomsSelect)}
            />
          )}
        </Stack>
        <Stack>
          <TouchableOpacity
            style={[styles.buttonLogin, styles.shadow]}
            onPress={() => {
              setActionModal(1);
              setIsOpenModal(true);
            }}>
            <HStack space={2}>
              <Icon
                as={Ionicons}
                name="ios-add-circle"
                size="6"
                color={'white'}
              />
              <Text style={styles.textLogin}>Nueva habitación</Text>
            </HStack>
          </TouchableOpacity>
        </Stack>
      </Container>
      <>
        {isOpenAlertDl && (
          <AlertDelete
            update={() => setUpdate(!update)}
            cancelRef={cancelRef}
            isOpen={isOpenAlertDl}
            onClose={() => onCloseAlertDl()}
            roomSelect={roomSelect}
            project={project.id}
          />
        )}
        {isOpenAlertLimited && (
          <AlertLimited
            cancelRef={cancelRef}
            isOpen={isOpenAlertLimited}
            onClose={() => onCloseAlertLimited()}
            status={status}
            typeConstruction={nameConstruction}
          />
        )}
        {isOpenModal && (
          <ModalRooms
            onClose={() => setIsOpenModal(false)}
            isOpen={isOpenModal}
            action={actionModal}
            room={roomSelect}
            project={project.id}
            onCloseAll={() => onUpdate()}
            toast={toast}
            alertLimited={(statusData, typeConstruction) =>
              onOpenAlertLimited(statusData, typeConstruction)
            }
          />
        )}
        {isOpenModalPlan && (
          <ModalMemberships
            navigation={navigation}
            onClose={() => setIsOpenModalPlan(false)}
            isOpen={isOpenModalPlan}
          />
        )}
        {isOpenAlertPr && (
          <AlertPremium
            cancelRef={cancelRef}
            isOpen={isOpenAlertPr}
            isOpenPlan={() => setIsOpenModalPlan(true)}
            onClose={() => setIsOpenAlerPr(!isOpenAlertPr)}
          />
        )}
      </>
    </Background>
  );
};
export default Rooms;
