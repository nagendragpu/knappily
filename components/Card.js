import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

import {icons} from '../constants';

const RED_COLOR = '#7c1518';

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
          backgroundColor: '#fafafa',
          position: 'absolute',
          height,
          width,
        },
        isSwipe
          ? swipedcard.getLayout()
          : currentIndex === index
          ? swipe.getLayout()
          : null,
      ]}>
      <Image
        style={{
          height: height * 0.55,
          width,
          borderWidth: 1,
          resizeMode: 'cover',
        }}
        source={require('../assets/images/joe.jpg')}
      />
      <View style={{paddingHorizontal: 16, flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            paddingVertical: 16 / 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: '600', fontSize: 18}}>{item.title}</Text>
          <Image
            style={{
              height: 40,
              width: 30,
              tintColor: RED_COLOR,
              marginTop: -10,
            }}
            source={icons.bookmark}
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: 'gray',
            }}>
            {item.content}
          </Text>
        </View>
        <LinearGradient colors={['rgba(0,0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: 'gray',
              marginBottom: 20,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: RED_COLOR,
                fontSize: 16,
              }}>
              Sports
            </Text>
            <Text style={{marginRight: 50, color: 'gray', fontSize: 16}}>
              Aug 9,2021
            </Text>
          </View>
        </LinearGradient>

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 16,
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: RED_COLOR,
            elevation: 10,
          }}>
          <Image
            source={icons.shareblack}
            style={{
              overflow: 'hidden',
              height: 25,
              width: 25,
              tintColor: 'white',
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({});
