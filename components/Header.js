import React from 'react';
import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {icons} from '../constants';

const Header = ({headerHeight}) => {
  console.log(headerHeight);
  return (
    <>
      <LinearGradient
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: 1,
        }}
        colors={['rgba(0,0, 0, 1)', 'rgba(0, 0, 0, 0.0)']}></LinearGradient>
      <Animated.View
        style={{
          position: 'absolute',
          top: headerHeight,
          left: 0,
          right: 0,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: RED_COLOR,
          paddingHorizontal: 16,
          paddingVertical: 16 / 2,
          zIndex: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-evenly',
          }}>
          <Image style={styles.iconStyle} source={icons.menu_dots} />
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontWeight: '600',
              marginLeft: 10,
            }}>
            All Knapps
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // borderColor: 'white',
            // borderWidth: 2,
            // marginLeft: 80,
          }}>
          <Image style={styles.iconStyle} source={icons.coffee} />
          <Image
            style={[styles.iconStyle, {marginHorizontal: 10}]}
            source={icons.uparrow}
          />
          <Image style={styles.iconStyle} source={icons.menu} />
          <Image
            style={[styles.iconStyle, {marginLeft: -10}]}
            source={icons.search}
          />
        </View>
      </Animated.View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  iconStyle: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
});
