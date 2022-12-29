import React, {useState} from 'react';
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
import {getDays} from '../../redux/features/Memberships/membershipsSlice';
import {ActivityIndicator} from 'react-native';

const UserAccount = ({navigation}) => {
  const {user, userData} = useSelector(state => ({...state.auth}));
  const {countDataProject} = useSelector(state => ({...state.project}));
  const {dayRest, loadingDays} = useSelector(state => ({...state.memberships}));
  const [counts, setCounts] = useState({cubages: 0, projects: 0, rooms: 0});
  const [circleProgress, setCircleProgress] = useState({
    cubages: 0,
    projects: 0,
    rooms: 0,
  });
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCount({token: user})).then(response => {
        const {projects, cubages, rooms} = response.payload.data;
        ProgressCircleFormat(cubages, projects, rooms);
      });
      dispatch(getDays({token: user}));
    }, []),
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
                        userData?.user_status.id === 1
                          ? colors.otherGreen
                          : colors.orange
                      }
                      borderRadius={50}>
                      <Text color={'light.50'} fontSize={'md'} bold>
                        {userData?.user_status.description}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Stack justifyContent={'center'}>
                  <HStack justifyContent={'center'} space={5} top={5}>
                    <Flex>
                      <Progress.Circle
                        size={80}
                        showsText={false}
                        color={colors.orange}
                        thickness={6}
                        progress={
                          userData?.membership_id !== 1
                            ? 1
                            : circleProgress.projects
                        }
                        direction={'counter-clockwise'}
                      />
                      <Stack style={{bottom: 50}} alignItems={'center'}>
                        <Text fontSize={'md'} color={colors.orange}>
                          {countDataProject.projects}{' '}
                          {userData?.memberships.id === 1 && '/2'}
                        </Text>
                      </Stack>
                    </Flex>
                    <Flex>
                      <Progress.Circle
                        size={80}
                        showsText={false}
                        color={colors.orange}
                        thickness={6}
                        progress={
                          userData.membership_id !== 1
                            ? 1
                            : circleProgress.rooms
                        }
                        direction={'counter-clockwise'}
                      />
                      <Stack style={{bottom: 50}} alignItems={'center'}>
                        <Text fontSize={'md'} color={colors.orange}>
                          {countDataProject.rooms}{' '}
                          {userData.memberships.id === 1 && '/4'}
                        </Text>
                      </Stack>
                    </Flex>
                    <Flex>
                      <Progress.Circle
                        size={80}
                        showsText={false}
                        color={colors.orange}
                        thickness={6}
                        progress={
                          userData.membership_id !== 1
                            ? 1
                            : circleProgress.cubages
                        }
                        direction={'counter-clockwise'}
                      />
                      <Stack style={{bottom: 50}} alignItems={'center'}>
                        <Text fontSize={'md'} color={colors.orange}>
                          {countDataProject.cubages}{' '}
                          {userData.memberships.id === 1 && '/8'}
                        </Text>
                      </Stack>
                    </Flex>
                  </HStack>
                  <HStack justifyContent={'center'} space={5}>
                    <Text>Proyectos</Text>
                    <Text left={2}>Habitaciones</Text>
                    <Text left={2}>Cubicaciones</Text>
                  </HStack>
                </Stack>
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
                  {loadingDays === true ? (
                    <ActivityIndicator
                      size={'large'}
                      color={colors.darkLight}
                    />
                  ) : (
                    <>
                      <Days
                        days={userData.memberships.days}
                        dayRest={dayRest}
                      />
                      <Text>
                        {dayRest} / {userData.memberships.days}
                      </Text>
                    </>
                  )}
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
