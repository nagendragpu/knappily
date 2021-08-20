import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, icons, SIZES} from '../constants';

const HEADER_HEIGHT = 60;

const Header = ({headerHeight}) => {
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
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: RED_COLOR,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
          zIndex: 2,
          transform: [{translateY: headerHeight}],
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image style={styles.iconStyle} source={icons.menu_dots} />
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.fontSize + SIZES.base,
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
          }}>
          <Image style={styles.iconStyle} source={icons.coffee} />
          <TouchableOpacity>
            <Image
              style={[styles.iconStyle, {marginHorizontal: 10}]}
              source={icons.uparrow}
            />
          </TouchableOpacity>
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
