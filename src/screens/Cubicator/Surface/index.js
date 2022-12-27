import React, {useRef, useState} from 'react';
import {Box, Flex, Stack, Text} from 'native-base';
import {Text as TextReact, TouchableOpacity} from 'react-native';
import Background from '../../../components/Background';
import {styles} from '../../../components/styles';
import SurfaceStackScreen from '../../../navigation/Surface';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Container from '../../../components/Container';

const Surface = () => {
  const {constructionSelect} = useSelector(state => ({...state.construction}));
  const [phase, setPhase] = useState(0);
  const formRefPhaseOne = useRef(null);
  const navigation = useNavigation();
  const onSubmitForm = async () => {
    await formRefPhaseOne.current.submitForm();
  };

  const onNavigate = () => {
    navigation.navigate('Quoter');
  };
  return (
    <Background>
      <Container>
        <Flex alignItems={'center'} h={100} justifyContent={'center'}>
          <Text bold fontSize={'xl'}>
            {constructionSelect === 0 ? 'Superficie' : constructionSelect.name}
          </Text>
          {phase === 0 && (
            <TextReact style={styles.subtitleText}>
              Ingrese las medidas de su proyecto (mts)
            </TextReact>
          )}
        </Flex>
        <Stack
          w={300}
          h={490}
          backgroundColor={'blue.800'}
          justifyItems={'center'}
          alignItems={'center'}>
          <SurfaceStackScreen
            formRefPhaseOne={formRefPhaseOne}
            phaseOne={() => setPhase(0)}
            phaseTwo={() => setPhase(1)}
          />
        </Stack>
        <Box>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPressIn={() =>
              phase === 0 ? onSubmitForm() : phase === 1 && onNavigate()
            }>
            <Text style={styles.textLogin} fontSize={18}>
              {phase === 0 ? 'Cubicar' : phase === 1 && 'Cotizar'}
            </Text>
          </TouchableOpacity>
        </Box>
      </Container>
    </Background>
  );
};

export default Surface;
