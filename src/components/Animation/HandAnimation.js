import React, {useState, useEffect, useRef} from 'react';
import {Icon, Stack} from 'native-base';
import {Animated, Easing, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../colors';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const HandAnimation = props => {
  let springValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(springValue, {
      toValue: 15,
      duration: 1000,
      tension: 50,
      friction: 2,
      easing: Easing.elastic(5),
      useNativeDriver: true,
    }),
  ).start();

  const animatedStyle = {
    transform: [
      {
        translateX: springValue,
      },
    ],
  };

  return (
    <Stack justifyContent="center" h={35} w={10} right={5}>
      <AnimatedIcon
        as={FontAwesome}
        style={animatedStyle}
        name={props.name}
        size="6"
        color={colors.orange}
      />
    </Stack>
  );
};

export default HandAnimation;
