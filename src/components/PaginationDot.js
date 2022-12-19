import React from 'react';

import {View, StyleSheet} from 'react-native';
import {colors} from './colors';

function genCircleStyle(size) {
  if (!size) {
    return {};
  }
  return {width: size, height: size, borderRadius: size / 2};
}

function Dot({isActive, activeDotSize, inActiveDotSize, dotSeparator}) {
  const processedActiveDotStyle = [
    styles.activeDot,
    {
      backgroundColor: colors.orange,
      borderColor: colors.primary,
      marginHorizontal: dotSeparator / 2,
      ...genCircleStyle(activeDotSize),
    },
  ];
  const processedInActiveDotStyle = [
    styles.inActiveDot,
    {
      backgroundColor: colors.primary,
      borderColor: colors.darkLight,
      marginHorizontal: dotSeparator / 2,
      ...genCircleStyle(inActiveDotSize),
    },
  ];
  return (
    <View
      style={[
        styles.baseDot,
        isActive ? processedActiveDotStyle : processedInActiveDotStyle,
      ]}
    />
  );
}

const PaginationDot = (props) => {
  const {
    style,
    length,
    currentIndex = 0,
    activeDotSize = 14,
    inActiveDotSize = 10,
    dotSeparator = 10,
  } = props;
  function renderItem(item, index) {
    return (
      <Dot
        key={index}
        isActive={index === currentIndex}
        activeDotSize={activeDotSize}
        inActiveDotSize={inActiveDotSize}
        dotSeparator={dotSeparator}
      />
    );
  }
  return (
    <View style={[styles.container, style]}>
      {Array(length).fill(0).map(renderItem)}
    </View>
  );
}

export default PaginationDot;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseDot: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inActiveDot: {
    backgroundColor: 'transparent',
  },
});

