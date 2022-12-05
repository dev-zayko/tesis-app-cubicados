import React from 'react';
import Background from '../../components/Background';
import {Stack} from 'native-base';
import Container from '../../components/Container';
import QuoterStackScreen from '../../navigation/Quoter';

const Quoter = () => {
  return (
    <Background>
      <Container>
        <Stack h={'100%'} w={'100%'}>
          <QuoterStackScreen />
        </Stack>
      </Container>
    </Background>
  );
};
export default Quoter;
