import React, {useRef, useState} from 'react';
import Background from '../../../components/Background';
import {Box, Flex, Stack, Text} from 'native-base';
import {styles} from '../../../components/styles';
import CoatingStackScreen from '../../../navigation/Coating';
import {Text as TextReact, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Container from '../../../components/Container';
import {useNavigation} from '@react-navigation/native';

const Coating = () => {
  const {constructionSelect} = useSelector(state => ({...state.construction}));
  const formRefPhaseOne = useRef(null);
  const formRefPhaseTwo = useRef(null);
  const [phase, setPhase] = useState(0);
  const navigation = useNavigation();
  const onNavigate = () => {
    navigation.navigate('Quoter');
  };

  const onSubmitFormOne = async () => {
    await formRefPhaseOne.current.submitForm();
  };
  const onSubmitFormTwo = async () => {
    await formRefPhaseTwo.current.submitForm();
  };
  return (
    <Background>
      <Container>
        <Flex
          alignItems={'center'}
          w={'100%'}
          h={100}
          justifyContent={'center'}>
          <Text bold fontSize={'xl'}>
            {constructionSelect === 0
              ? 'Revestimiento'
              : constructionSelect.name}
          </Text>
          {phase === 0 && (
            <TextReact style={styles.subtitleText}>
              Ingrese las medidas de su proyecto (mts)
            </TextReact>
          )}
        </Flex>
        <Stack w={300} h={490} alignItems={'center'}>
          <CoatingStackScreen
            formRefPhaseOne={formRefPhaseOne}
            formRefPhaseTwo={formRefPhaseTwo}
            phaseOne={() => setPhase(0)}
            phaseTwo={() => setPhase(1)}
            phaseThree={() => setPhase(2)}
          />
        </Stack>
        <Box>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPressIn={() =>
              phase === 0
                ? onSubmitFormOne()
                : phase === 1
                ? onSubmitFormTwo()
                : phase === 2 && onNavigate()
            }>
            <Text style={styles.textLogin} fontSize={18}>
              {phase === 0
                ? 'Siguiente'
                : phase === 1
                ? 'Cubicar'
                : phase === 2 && 'Cotizar'}
            </Text>
          </TouchableOpacity>
        </Box>
      </Container>
    </Background>
  );
};
export default Coating;
