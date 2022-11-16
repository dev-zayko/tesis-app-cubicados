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
//SLice Get Project By User
import {getProjectByUser} from '../../redux/features/Projects/projectSlice';
//Custom Components of list Projects
import ListProjects from '../../components/List/Projects';
//Components of React native
import {ActivityIndicator, TouchableOpacity} from 'react-native';
//React vector icon
import Ionicons from 'react-native-vector-icons/Ionicons';
//ActionSheet projects
import ActionSheetProjects from '../../components/ActionSheet/Projects';
//Modal projects
import ModalProject from '../../components/Modals/Projects';
//Alert Projects create limited
import AlertLimited from '../../components/AlertDialog/AlertLimited';

const Projects = ({navigation}) => {
  const [projectSelect, setProjectSelect] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [actionModal, setActionModal] = useState(0);
  const [isOpenAlertLimited, setIsOpenAlertLimited] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [status, setStatus] = useState('');
  const {user} = useSelector(state => ({...state.auth}));
  const {projects} = useSelector(state => ({...state.project}));
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const cancelRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      dispatch(getProjectByUser({token: user, toast: toast}));
    }, [update]),
  );

  const onSelectProject = project => {
    onOpen();
    setProjectSelect(project);
  };
  const onUpdate = () => {
    onClose();
    setUpdate(!update);
  };
  const onActionModal = define => {
    setIsOpenModal(true);
    setActionModal(define);
  };
  const onOpenAlertLimited = statusData => {
    if (statusData === 'limited' || statusData === 'discontinued') {
      setStatus(statusData);
      setIsOpenAlertLimited(true);
    }
  };

  const onCloseAlertLimited = () => setIsOpenAlertLimited(false);

  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} top={12}>
        <Stack
          w="85%"
          h={600}
          style={[styles.formAuthStyle, styles.shadow]}
          backgroundColor={colors.primary}
          alignItems="center">
          <Flex alignItems={'center'}>
            <Text bold fontSize={'4xl'}>
              Proyectos
            </Text>
            <Text bold fontSize={'xs'}>
              Lista de tus proyectos creados
            </Text>
          </Flex>
          <Stack
            w={300}
            h={450}
            top={5}
            justifyContent={'center'}
            alignItems={'center'}>
            {projects === 0 ? (
              <ActivityIndicator size={'large'} color={colors.orange} />
            ) : projects === null ? (
              <Text>No tienes proyectos creados</Text>
            ) : (
              <ListProjects
                projects={projects}
                update={() => setUpdate(!update)}
                onActionSheet={projectSelect => onSelectProject(projectSelect)}
              />
            )}
          </Stack>
          <Stack>
            <TouchableOpacity
              style={[styles.buttonLogin, styles.shadow]}
              onPress={() => onActionModal(1)}>
              <HStack space={2}>
                <Icon
                  as={Ionicons}
                  name="ios-add-circle"
                  size="6"
                  color={'white'}
                />
                <Text style={styles.textLogin}>Nuevo proyecto</Text>
              </HStack>
            </TouchableOpacity>
          </Stack>
        </Stack>
      </Flex>
      <>
        {onOpen && projectSelect !== null && (
          <ActionSheetProjects
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            project={projectSelect}
            actionModal={() => onActionModal(2)}
            update={onUpdate}
            navigation={navigation}
          />
        )}
        {isOpenAlertLimited && (
          <AlertLimited
            cancelRef={cancelRef}
            isOpen={isOpenAlertLimited}
            onClose={() => onCloseAlertLimited()}
            status={status}
          />
        )}
        {isOpenModal && (
          <ModalProject
            onClose={() => setIsOpenModal(false)}
            isOpen={isOpenModal}
            action={actionModal}
            project={projectSelect}
            onCloseAll={() => onUpdate()}
            toast={toast}
            alertLimited={statusData => onOpenAlertLimited(statusData)}
          />
        )}
      </>
    </Background>
  );
};

export default Projects;
