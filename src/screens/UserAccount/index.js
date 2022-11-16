import React, {useEffect, useState} from 'react';
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
import {getProject} from '../../redux/actions/project';
import {useFocusEffect} from '@react-navigation/native';
import {getCount} from '../../redux/actions/utility';

const UserAccount = ({navigation}) => {
  const {user: currentUser} = useSelector(state => state.auth);
  const {token: currentToken} = useSelector(state => state.utility);
  const [counts, setCounts] = useState({cubages: 0, projects: 0, rooms: 0});
  const [circleProgress, setCircleProgress] = useState({
    cubages: 0,
    projects: 0,
    rooms: 0,
  });
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCount(currentToken)).then(response => {
        setCounts({
          cubages: response.cubages,
          projects: response.projects,
          rooms: response.rooms,
        });
        ProgressCircleFormat();
      });
    }, []),
  );

  const ProgressCircleFormat = () => {
    setCircleProgress({
      cubages: (counts.cubages * 100) / 8 / 100,
      projects: (counts.projects * 100) / 2 / 100,
      rooms: (counts.rooms * 100) / 4 / 100,
    });
  };
  return (
    <Background>
      {currentUser && (
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
                      {currentUser.first_name || ''}{' '}
                      {currentUser.father_last_name || ''}{' '}
                      {currentUser.mother_last_name || ''}
                    </Text>
                    <Text>{currentUser.email}</Text>
                    <HStack
                      w={'50%'}
                      justifyContent={'center'}
                      backgroundColor={
                        currentUser.user_status.id === 1
                          ? colors.otherGreen
                          : colors.orange
                      }
                      borderRadius={50}>
                      <Text color={'light.50'} fontSize={'md'} bold>
                        {currentUser.user_status.description}
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
                        {counts.projects}/2
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
                        {counts.rooms}/4
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
                        {counts.cubages}/8
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
            {currentUser.membership_id > 1 && (
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
