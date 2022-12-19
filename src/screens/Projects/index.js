import React, {useState, useCallback, useRef} from 'react';
//Components Native base
import {
  CheckIcon,
  Divider,
  Flex,
  HStack,
  Icon,
  Input,
  Menu,
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
//SLice Get Project By User
import {getProjectByUser, setListProjects} from '../../redux/features/Projects/projectSlice';
//Custom Components of list Projects
import ListProjects from '../../components/List/Projects';
//Components of React native
import {ActivityIndicator, TouchableOpacity} from 'react-native';
//React vector icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
//ActionSheet projects
import ActionSheetProjects from '../../components/ActionSheet/Projects';
//Modal projects
import ModalProject from '../../components/Modals/Projects';
//Alert Projects create limited
import AlertLimited from '../../components/AlertDialog/AlertLimited';
import HandDownAnimation from '../../components/Animation/EmptyValue';
import {filter} from 'lodash';
import moment from 'moment';
import Container from '../../components/Container';


const Projects = ({navigation}) => {
  const [projectSelect, setProjectSelect] = useState(null);
  const [fullData, setFullData] = useState(0);
  const [selectMonth, setSelectMonth] = useState('');
  const [selectYear, setSelectYear] = useState('');
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
      setSelectYear('');
      setSelectMonth('');
      dispatch(getProjectByUser({token: user, toast: toast}))
        .then((response) => {
          setFullData(response.payload.data);
        });
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

  const onSearch = text => {
    const formattedQuery = text;
    const data = filter(projects, projectForm => {
      return contains(projectForm, formattedQuery)
    });
    setFullData(data);
  }
  const contains = (project, query) => {
    const {name} = project;
    let reg = new RegExp(query, 'gi');
    if (name.match(reg) !== null) {
      return true;
    } else {
      return false;
    }
  };

  const onSearchMonth = text => {
    setSelectMonth(text)
    const formattedQuery = text;
    const data = filter(projects, projectForm => {
      return containsMonth(projectForm, formattedQuery)
    });
    if (data.length === 0) {
      toast.show({
        description: 'No hay proyectos en este mes'
      })
    } else {
      setFullData(data);
    }
  };
  const containsMonth = (project, query) => {
    const {created_at} = project;
    const monthInt = moment(created_at).format('MM');
    if (monthInt.includes(query)) {
      return true;
    } else {
      return false;
    }
  };
  const onSearchYear = text => {
    setSelectYear(text)
    const formattedQuery = text;
    const data = filter(fullData, projectForm => {
      return containsYear(projectForm, formattedQuery)
    });
    if (data.length === 0) {
      toast.show({
        description: 'No hay proyectos en este año'
      })
    } else {
      setFullData(data);
    }
  };
  const containsYear = (project, query) => {
    const {created_at} = project;
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
    setFullData(projects);
  }
  return (
    <Background>
      <Container>
        <Flex alignItems={'center'}>
          <Text bold fontSize={'4xl'}>
            Proyectos
          </Text>
          <Text bold fontSize={'lg'}>
            Lista de tus proyectos creados
          </Text>
        </Flex>
        <Stack w={'80%'} space={3} h={120} justifyContent={'center'}>
          <Stack>
            <Input
              variant="rounded"
              backgroundColor={'gray.200'}
              placeholder="BUSCAR"
              onChangeText={onSearch}
              InputLeftElement={<Icon as={<Ionicons name="search-circle" />} size={10} color={colors.orange} />} />
          </Stack>
          <HStack space={2} justifyContent={'center'}>
            <Select selectedValue={selectMonth} fontSize={14} backgroundColor={'gray.200'} minWidth={"120"} borderRadius={20} accessibilityLabel="MES" placeholder="MES" _selectedItem={{
              bg: "orange.500",
              endIcon: <CheckIcon size="5" />
            }} mt={1}
              onValueChange={(itemValue) => onSearchMonth(itemValue)}>

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
              selectedValue={selectYear}
              minWidth={"100"}
              borderRadius={20}
              accessibilityLabel="AÑO"
              placeholder="AÑO"
              fontSize={14}
              _selectedItem={{
                bg: "orange.500",
                endIcon: <CheckIcon size="5" color={'white'} />
              }} mt={1}
              onValueChange={(itemValue) => onSearchYear(itemValue)}>
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
                <Icon as={Entypo} name={"erase"} size={'8'} color={colors.orange} />
              </TouchableOpacity>
            </Stack>
          </HStack>
        </Stack>
        <Stack
          w={300}
          h={380}
          alignItems={'center'}>
          {fullData === 0 ? (
            <ActivityIndicator size={'large'} color={colors.orange} />
          ) : projects === null ? (
            <Stack h={250} alignItems={'center'} justifyContent={'center'}>
              <Text fontSize={'lg'}>No tienes proyectos creados</Text>
              <Text fontSize={'lg'}>¡Crea uno!</Text>
              <Stack w={280} alignItems={'center'} h={100} justifyContent={'flex-end'}>
                <HandDownAnimation />
              </Stack>
            </Stack>
          ) : (
            <ListProjects
              projects={fullData}
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
      </Container>
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
            typeConstruction={'Proyectos'}
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
