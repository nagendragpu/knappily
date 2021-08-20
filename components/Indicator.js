import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../constants';

const INDICATOR_WIDTH = 60;
const Indicator = ({scrollX}) => {
  const inputRange = [
    0,
    SIZES.width,
    2 * SIZES.width,
    3 * SIZES.width,
    4 * SIZES.width,
    5 * SIZES.width,
  ];

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: 5,
        borderBottomColor: COLORS.primary,
        width: INDICATOR_WIDTH,
        marginLeft: SIZES.base,
        transform: [
          {
            translateX: scrollX.interpolate({
              inputRange,
              outputRange: [0, 70, 145, 230, 300, 380],
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
