//React
import React from 'react';
//Components native base
import {Box, Center, Progress, VStack} from 'native-base';

const Days = () => {
  return (
    <Center w="100%">
      <Box w="90%" maxW="400">
        <Progress
          bg="coolGray.100"
          _filledTrack={{
            bg: 'warning.600',
          }}
          value={20}
          mx="4"
        />
      </Box>
    </Center>
  );
};

export default Days;
