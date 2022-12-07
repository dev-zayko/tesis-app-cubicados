import React, {useState, useCallback, useRef} from 'react';
//Components Native base
import {
  Flex,
  HStack,
  Icon,
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
import ListRooms from '../../components/List/Rooms/index';
import {getRoomsByProject} from '../../redux/features/Rooms/roomSlice';
//Modal Rooms
import ModalRooms from '../../components/Modals/Rooms';
import AlertLimited from '../../components/AlertDialog/AlertLimited';

const Rooms = ({route}) => {
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState('');
  const [isOpenAlertLimited, setIsOpenAlertLimited] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {project} = route.params?.params;
  const toast = useToast();
  const {user} = useSelector(state => ({...state.auth}));
  const {rooms} = useSelector(state => ({...state.room}));
  const cancelRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      dispatch(getRoomsByProject({token: user, idProject: project.id}));
    }, []),
  );

  const onCloseAlertLimited = () => setIsOpenAlertLimited(false);

  const onOpenAlertLimited = statusData => {
    if (
      statusData === 'limited' ||
      statusData === 'discontinued' ||
      statusData === 'duplicated'
    ) {
      setStatus(statusData);
      setIsOpenAlertLimited(true);
    }
  };

  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} top={12}>
        <Stack
          w="85%"
          h={600}
          borderRadius={10}
          style={[styles.formAuthStyle, styles.shadow]}
          backgroundColor={colors.primary}
          alignItems="center">
          <Flex alignItems={'center'}>
            <Text bold fontSize={'4xl'}>
              {project.name}
            </Text>
          </Flex>
          <Stack
            w={'85%'}
            h={450}
            justifyContent={'center'}
            alignItems={'center'}>
            {rooms === 0 ? (
              <ActivityIndicator size={'large'} color={colors.orange} />
            ) : rooms === null ? (
              <Text>No tienes tienes habitaciones creadas</Text>
            ) : (
              <ListRooms
                rooms={rooms}
                update={() => setUpdate(!update)}
                onActionSheet={roomsSelect => onSelectProject(roomsSelect)}
              />
            )}
          </Stack>
          <Stack>
            <TouchableOpacity
              style={[styles.buttonLogin, styles.shadow]}
              onPress={() => setIsOpenModal(true)}>
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
        </Stack>
      </Flex>
      <>
        {isOpenAlertLimited && (
          <AlertLimited
            cancelRef={cancelRef}
            isOpen={isOpenAlertLimited}
            onClose={() => onCloseAlertLimited()}
            status={status}
          />
        )}
        {isOpenModal && (
          <ModalRooms
            onClose={() => setIsOpenModal(false)}
            isOpen={isOpenModal}
            project={project.id}
            onCloseAll={onClose}
            toast={toast}
            alertLimited={statusData => onOpenAlertLimited(statusData)}
          />
        )}
      </>
    </Background>
  );
};
export default Rooms;
