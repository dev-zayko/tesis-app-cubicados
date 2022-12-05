import React, {useEffect, useState, useCallback} from 'react';
//Backgrund Image
import Background from '../../components/Background';
//Components native base
import {Flex, HStack, Image, Stack, Text, VStack} from 'native-base';
//My Styles
import {styles} from '../../components/styles';
//Colors
import {colors} from '../../components/colors';
//Bar, circle Progress
import * as Progress from 'react-native-progress';
//Components Options
import OptionAccount from '../../components/List/OptionAccount';
//Progress day bar
import Days from '../../components/Progress/Days';
//Hook of redux
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getCount} from '../../redux/features/Projects/projectSlice';

const UserAccount = ({navigation}) => {
  const {user, userData} = useSelector(state => ({...state.auth}));
  const {countDataProject} = useSelector(state => ({...state.project}));
  const [counts, setCounts] = useState({cubages: 0, projects: 0, rooms: 0});
  const [circleProgress, setCircleProgress] = useState({
    cubages: 0,
    projects: 0,
    rooms: 0,
  });
  const dispatch = useDispatch();

  useFocusEffect(useCallback(() => {
    dispatch(getCount({token: user})).then(() => {
      if (countDataProject !== '') {
        setCounts({
          cubages: countDataProject.cubages,
          projects: countDataProject.projects,
          rooms: countDataProject.rooms,
        });
        ProgressCircleFormat(countDataProject.cubages, countDataProject.projects, countDataProject.rooms);
      }
    });
  }, [counts]),
  );

  const ProgressCircleFormat = (countCubages, countProjects, countRooms) => {
    setCircleProgress({
      cubages: (countCubages * 100) / 8 / 100,
      projects: (countProjects * 100) / 2 / 100,
      rooms: (countRooms * 100) / 4 / 100,
    });
  };
  return (
    <Background>
      {user && (
        <Stack h={'100%'} justifyContent={'center'} space={5} top={10}>
          <Stack alignItems={'center'}>
            <Stack
              w="85%"
              h={300}
              style={[styles.ContainerStyle, styles.shadow]}
              backgroundColor={colors.primary}>
              <Flex alignItems={'center'} marginTop={3}>
                <Text bold fontSize={'3xl'}>
                  Cuenta
                </Text>
              </Flex>
              <Flex>
                <HStack space={8}>
                  <Image
                    size={20}
                    style={styles.imagePerfil}
                    source={require('../../assets/image-profile.png')}
                    alt="Constructor"
                  />
                  <VStack w={'65%'} space={2} justifyContent={'center'}>
                    <Text>
                      {userData.first_name || ''}{' '}
                      {userData.father_last_name || ''}{' '}
                      {userData.mother_last_name || ''}
                    </Text>
                    <Text>{userData.email}</Text>
                    <HStack
                      w={'50%'}
                      justifyContent={'center'}
                      backgroundColor={
                        userData.user_status.id === 1
                          ? colors.otherGreen
                          : colors.orange
                      }
                      borderRadius={50}>
                      <Text color={'light.50'} fontSize={'md'} bold>
                        {userData.user_status.description}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Flex top={10}>
                  <HStack justifyContent={'center'} space={5}>
                    <Flex>
                      <Progress.Circle
                        size={80}
                        showsText={false}
                        color={colors.orange}
                        thickness={6}
                        progress={circleProgress.projects}
                        direction={'counter-clockwise'}
                      />
                      <Text style={styles.textProgress} fontSize={'md'}>
                        {countDataProject.projects}/2
                      </Text>
                    </Flex>
                    <Flex>
                      <Progress.Circle
                        size={80}
                        showsText={false}
                        color={colors.orange}
                        thickness={6}
                        progress={circleProgress.rooms}
                        direction={'counter-clockwise'}
                      />
                      <Text style={styles.textProgress} fontSize={'md'}>
                        {countDataProject.rooms}/4
                      </Text>
                    </Flex>
                    <Flex>
                      <Progress.Circle
                        size={80}
                        showsText={false}
                        color={colors.orange}
                        thickness={6}
                        progress={circleProgress.cubages}
                        direction={'counter-clockwise'}
                      />
                      <Text style={styles.textProgress} fontSize={'md'}>
                        {countDataProject.cubages}/8
                      </Text>
                    </Flex>
                  </HStack>
                  <HStack justifyContent={'center'} space={5}>
                    <Text>Proyectos</Text>
                    <Text left={2}>Habitaciones</Text>
                    <Text left={2}>Cubicaciones</Text>
                  </HStack>
                </Flex>
              </Flex>
            </Stack>
            {userData.membership_id > 1 && (
              <Stack
                w="85%"
                h={20}
                style={[styles.containerDayStyle, styles.shadow]}
                backgroundColor={colors.primary}>
                <VStack space={2} alignItems={'center'}>
                  <Text fontSize={'md'}>Dias</Text>
                  <Days />
                  <Text>0/3</Text>
                </VStack>
              </Stack>
            )}
          </Stack>
          <HStack left={8}>
            <OptionAccount navigator={navigation} />
          </HStack>
        </Stack>
      )}
    </Background>
  );
};

export default UserAccount;
