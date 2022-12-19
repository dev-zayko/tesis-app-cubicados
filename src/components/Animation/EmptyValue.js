import React from "react";
import {Icon, Stack} from 'native-base';
import {Animated, Easing, View} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from "../colors";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);


const HandDownAnimation = () => {
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
        translateY: springValue,
      },
    ],
  };

  return (
    <AnimatedIcon
      as={FontAwesome}
      style={animatedStyle}
      name={'hand-o-down'}
      size={'4xl'}
      color={colors.orange}
    />
  );
};

export default HandDownAnimation;
