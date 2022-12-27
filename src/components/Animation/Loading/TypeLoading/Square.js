import React, {useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {colors} from '../../../colors';

const styles = StyleSheet.create({
  group: {
    width: 100,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  diamond: {
    width: 50,
    height: 50,
    backgroundColor: colors.orange,
  },
  groupColumn: {
    flexDirection: 'column',
  },
  groupRow: {
    flexDirection: 'row',
  },
});

const ObjectAnimated = ({value, opacity, y}) => (
  <Animated.View
    style={[
      styles.diamond,
      {
        opacity: value.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
          outputRange: opacity,
        }),
        transform: [
          {
            rotateY: value.interpolate({
              inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
              outputRange: y,
            }),
          },
        ],
      },
    ]}
  />
);

const Square = props => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    animate();
  }, []);

  const setTimingAnimated = (originalValue, newValue, duration) => {
    return Animated.timing(originalValue, {
      toValue: newValue,
      duration,
      useNativeDriver: true,
    });
  };

  const animate = () => {
    Animated.sequence([
      setTimingAnimated(animatedValue, 0, 200),
      setTimingAnimated(animatedValue, 1, 200),
      setTimingAnimated(animatedValue, 2, 200),
      setTimingAnimated(animatedValue, 3, 200),
      setTimingAnimated(animatedValue, 4, 200),
      setTimingAnimated(animatedValue, 5, 200),
      setTimingAnimated(animatedValue, 6, 200),
      setTimingAnimated(animatedValue, 7, 200),
    ]).start(() => {
      animatedValue.setValue(0);
      animate();
    });
  };
  const {active} = props;
  return active ? (
    <View>
      <View
        style={[
          styles.groupColumn,
          {
            transform: [{rotateZ: '45deg'}],
          },
        ]}>
        <View style={styles.groupRow}>
          <ObjectAnimated
            value={animatedValue}
            opacity={[1, 0, 0, 0, 1, 1, 1, 1]}
            y={[
              '180deg',
              '0deg',
              '0deg',
              '0deg',
              '0deg',
              '0deg',
              '0deg',
              '0deg',
            ]}
          />
          <ObjectAnimated
            value={animatedValue}
            opacity={[1, 1, 0, 0, 0, 1, 1, 1]}
            y={[
              '0deg',
              '0deg',
              '180deg',
              '0deg',
              '0deg',
              '0deg',
              '0deg',
              '0deg',
            ]}
          />
        </View>
        <View style={styles.groupRow}>
          <ObjectAnimated
            value={animatedValue}
            opacity={[1, 1, 1, 1, 0, 0, 0, 1]}
            y={[
              '0deg',
              '0deg',
              '0deg',
              '0deg',
              '180deg',
              '0deg',
              '0deg',
              '0deg',
            ]}
          />
          <ObjectAnimated
            value={animatedValue}
            opacity={[1, 1, 1, 0, 0, 0, 1, 1]}
            y={[
              '0deg',
              '0deg',
              '0deg',
              '180deg',
              '0deg',
              '0deg',
              '0deg',
              '0deg',
            ]}
          />
        </View>
      </View>
    </View>
  ) : (
    <React.Fragment />
  );
};

export default Square;
