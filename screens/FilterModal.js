import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Easing,
} from 'react-native';
import {icons} from '../constants';
const {width, height} = Dimensions.get('window');

const RED_COLOR = '#7c1518';

const FilterModal = ({isVisible, onClose}) => {
  const [showFilterMode, setShowFilterMode] = React.useState(isVisible);
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (showFilterMode) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => onClose());
    }
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
      }).start();
    }
  }, [showFilterMode]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 5],
  });

  console.log('Modal', height - 650);
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          //   flex: 1,
          height: height * 0.8,
          marginTop: 65,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
            // width: '100%',
            alignItems: 'flex-end',
          }}>
          <Animated.View style={[styles.rowView]}>
            <Animated.Text
              style={[styles.textStyle, {transform: [{scale: scaleValue}]}]}>
              Reference
            </Animated.Text>
            <Animated.View
              style={[styles.iconView, {transform: [{scale: scaleValue}]}]}>
              <Image style={styles.iconStyle} source={icons.menu} />
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={[styles.rowView, {transform: [{scale: scaleValue}]}]}>
            <Text style={styles.textStyle}>Next Knapp</Text>
            <View style={styles.iconView}>
              <Image style={styles.iconStyle} source={icons.uparrow} />
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.rowView, {transform: [{scale: scaleValue}]}]}>
            <Text style={styles.textStyle}>Bookmark</Text>
            <View style={styles.iconView}>
              <Image style={styles.iconStyle} source={icons.bookmark} />
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.rowView, {transform: [{scale: scaleValue}]}]}>
            <Text style={styles.textStyle}>Text to speech</Text>
            <View style={styles.iconView}>
              <Image style={styles.iconStyle} source={icons.sound} />
            </View>
          </Animated.View>
          <Animated.View
            style={[styles.rowView, {transform: [{scale: scaleValue}]}]}>
            <Text style={styles.textStyle}>share</Text>
            <View style={styles.iconView}>
              <Image style={styles.iconStyle} source={icons.shareblack} />
            </View>
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
  iconStyle: {width: 25, height: 25, tintColor: RED_COLOR},
  textStyle: {color: 'white', fontWeight: 'bold', fontSize: 15},
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
