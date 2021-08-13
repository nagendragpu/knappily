import React from 'react';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const Card = ({
  item,
  index,
  currentIndex,
  isSwipe,
  swipedcard,
  swipe,
  ...dragHandlers
}) => {
  return (
    <Animated.View
      onTouchStart={() => {
        console.log('Touch start');
      }}
      {...dragHandlers}
      style={[
        {
          backgroundColor: 'white',
          position: 'absolute',
          borderColor: 'white',
          borderWidth: 4,
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
        },
        isSwipe
          ? swipedcard.getLayout()
          : currentIndex === index
          ? swipe.getLayout()
          : null,
      ]}>
      <Text style={{fontSize: 100, fontWeight: 'bold', color: 'black'}}>
        {item.id}
      </Text>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({});
