import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../constants';

const INDICATOR_WIDTH = 80;
const Indicator = ({scrollX}) => {
  const inputRange = [
    0,
    SIZES.width,
    2 * SIZES.width,
    3 * SIZES.width,
    4 * SIZES.width,
  ];

  return (
    <Animated.View
      style={{
        borderBottomWidth: 5,
        borderBottomColor: COLORS.primary,
        width: INDICATOR_WIDTH,
        transform: [
          {
            translateX: scrollX.interpolate({
              inputRange,
              outputRange: [0, 60, 140, 220, 300],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    />
  );
};

export default Indicator;

const styles = StyleSheet.create({});
