import React, {useRef, useState} from 'react';
import {Box, Center, HStack, Icon, IconButton, Stagger} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './colors';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertLogout from './AlertDialog/AlertLogout';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const MainMenu = props => {
  const [isOpen, setIsOpen] = useState(false);

  const cancelRef = useRef(null);
  const handleNavigate = destiny => {
    switch (destiny) {
      case 1:
        props.toggle();
        props.navigator.navigate('HomeScreen');
        break;
      case 2:
        props.toggle();
        props.navigator.navigate('CubicStack');
        break;
      case 3:
        props.toggle();
        props.navigator.navigate('ProfileStack');
        break;
      case 4:
        setIsOpen(!isOpen);
        break;
    }
  };


  const glowAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.2, {duration: 1500}),
            withTiming(1.4, {duration: 1500})
          ),
          -1,
          true
        ),
      },
    ],
  }));

  return (
    <Box>
      <Box alignItems="center" style={styles.menuNavigator}>
        <Stagger
          visible={props.open}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <IconButton
            mb="4"
            style={styles.shadow}
            onPress={() => handleNavigate(4)}
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Icon
                as={Ionicons}
                size="6"
                name="exit"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            style={styles.shadow}
            onPress={() => handleNavigate(3)}
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                as={MaterialCommunityIcons}
                _dark={{
                  color: 'warmGray.50',
                }}
                size="6"
                name={'shield-account'}
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            style={styles.shadow}
            onPress={() => handleNavigate(2)}
            variant="solid"
            bg="teal.400"
            colorScheme="teal"
            borderRadius="full"
            icon={
              <Icon
                as={Ionicons}
                _dark={{
                  color: 'warmGray.50',
                }}
                size="6"
                name="cube"
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            style={styles.shadow}
            onPress={() => handleNavigate(1)}
            variant="solid"
            bg="red.500"
            colorScheme="red"
            borderRadius="full"
            icon={
              <Icon
                as={Ionicons}
                size="6"
                name="home"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="warmGray.50"
              />
            }
          />
        </Stagger>
      </Box>
      <Animated.View style={[styles.dotNavigator, glowAnimation]}>
        <IconButton
          variant="solid"
          borderRadius="full"
          size={10}
          onPress={props.toggle}
          bg={colors.orange}
          style={styles.shadow}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="dots-horizontal"
              color="warmGray.100"
              _dark={{
                color: 'warmGray.100',
              }}
            />
          }
        />
      </Animated.View>
      {isOpen && (
        <AlertLogout
          open={isOpen}
          close={() => setIsOpen(false)}
          cancelRef={cancelRef}
          navigator={props.navigator}
        />
      )}
    </Box>
  );
};
export default MainMenu;
