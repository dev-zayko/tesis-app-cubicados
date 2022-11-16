import React, {useRef, useState} from 'react';
import {Flex, Stack, Text, Box} from 'native-base';
import {Text as TextReact, TouchableOpacity} from 'react-native';
import Background from '../../../components/Background';
import {colors} from '../../../components/colors';
import {styles} from '../../../components/styles';
import SurfaceStackScreen from '../../../navigation/Surface';
import {useSelector} from 'react-redux';

const Surface = () => {

  const {constructionSelect} = useSelector(state => ({...state.construction}));
  const [phase, setPhase] = useState(0)
  const formRefPhaseOne = useRef(null);

  const onSubmitForm = async () => {
    await formRefPhaseOne.current.submitForm();
  };

  return (
    <Background>
      <Flex h={'100%'} alignItems={'center'} top={12}>
        <Stack
          w={'85%'}
          h={600}
          style={[styles.formAuthStyle, styles.shadow]}
          backgroundColor={colors.primary}
          alignItems={'center'}>
          <Flex alignItems={'center'} top={5}>
            <Text bold fontSize={'xl'}>
              {constructionSelect === 0
                ? 'Superficie'
                : constructionSelect.name}
            </Text>
            {phase === 0 && (
              <TextReact style={styles.subtitleText}>
                Ingrese las medidas de su proyecto (mts)
              </TextReact>
            )}
          </Flex>
          <Stack
            w={300}
            h={480}
            top={8}
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
                phase === 0
                && onSubmitForm()}>
              <Text style={styles.textLogin} fontSize={18}>
                {phase === 0
                  ? 'Cubicar'
                  : phase === 1
                  && 'Cotizar'}
              </Text>

            </TouchableOpacity>

          </Box>
        </Stack>

      </Flex>
    </Background>
  );
}

export default Surface;

