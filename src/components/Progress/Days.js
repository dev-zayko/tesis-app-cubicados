//React
import React, {useEffect, useState} from 'react';
//Components native base
import {Box, Center, Progress} from 'native-base';

const Days = props => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let sum = ((props.dayRest / props.days) * 100).toFixed(0);
    let rest = 100 - sum;
    setProgress(rest);
  }, []);
  return (
    <Center w="100%">
      <Box w="90%" maxW="400">
        <Progress
          bg="coolGray.300"
          _filledTrack={{
            bg: 'warning.600',
          }}
          value={progress}
          mx="4"
        />
      </Box>
    </Center>
  );
};

export default Days;
