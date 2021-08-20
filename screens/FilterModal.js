import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Easing,
} from 'react-native';
import {COLORS, icons, SIZES} from '../constants';
const HEADER_HEIGHT = 70;

const FilterModal = ({isVisible, onClose}) => {
  const [showFilterMode, setShowFilterMode] = React.useState(isVisible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (showFilterMode) {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
        //   delay: 500,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
        //   delay: 500,
      }).start(() => onClose());
    }
  }, [showFilterMode]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          //   flex: 1,
          height: SIZES.height * 0.8,
          marginTop: HEADER_HEIGHT,
          backgroundColor: COLORS.transparentBlack5,
        }}>
        <TouchableWithoutFeedback onPress={() => setShowFilterMode(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 0,
            alignItems: 'flex-end',
          }}>
          <Animated.View style={[styles.rowView]}>
            <Animated.Text
              style={[
                [styles.textStyle, {transform: [{scale: scaleValue}]}],
                {transform: [{scale: scaleValue}]},
              ]}>
              Reference
            </Animated.Text>
            <Animated.View
              style={[styles.iconView, {transform: [{scale: scaleValue}]}]}>
              <Image style={styles.iconStyle} source={icons.menu} />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.rowView]}>
            <Animated.Text
              style={[styles.textStyle, {transform: [{scale: scaleValue}]}]}>
              Next Knapp
            </Animated.Text>
            <Animated.View
              style={[styles.iconView, {transform: [{scale: scaleValue}]}]}>
              <Image style={styles.iconStyle} source={icons.uparrow} />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.rowView]}>
            <Animated.Text
              style={[styles.textStyle, {transform: [{scale: scaleValue}]}]}>
              Bookmark
            </Animated.Text>
            <Animated.View
              style={[styles.iconView, {transform: [{scale: scaleValue}]}]}>
              <Image style={styles.iconStyle} source={icons.bookmark} />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.rowView]}>
            <Animated.Text
              style={[styles.textStyle, {transform: [{scale: scaleValue}]}]}>
              Text to speech
            </Animated.Text>
            <Animated.View
              style={[styles.iconView, {transform: [{scale: scaleValue}]}]}>
              <Image style={styles.iconStyle} source={icons.sound} />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.rowView]}>
            <Animated.Text
              style={[styles.textStyle, {transform: [{scale: scaleValue}]}]}>
              share
            </Animated.Text>
            <Animated.View
              style={[styles.iconView, {transform: [{scale: scaleValue}]}]}>
              <Image style={styles.iconStyle} source={icons.shareblack} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  iconView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginBottom: 15,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {width: 25, height: 25, tintColor: COLORS.primary},
  textStyle: {color: 'white', fontWeight: 'bold', fontSize: 15},
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
