import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {icons, SIZES, COLORS} from '../constants';

const Card = ({
  item,
  index,
  currentIndex,
  isSwipe,
  swipedcard,
  swipe,
  ...dragHandlers
}) => {
  const navigation = useNavigation();

  return (
    <Animated.View
      {...dragHandlers}
      style={[
        {
          backgroundColor: COLORS.white2,
          position: 'absolute',
          height: SIZES.height,
          width: SIZES.width,
        },
        isSwipe
          ? swipedcard.getLayout()
          : currentIndex === index
          ? swipe.getLayout()
          : null,
      ]}>
      <Image
        style={{
          height: SIZES.height * 0.55,
          width: SIZES.width,
          borderWidth: 1,
          resizeMode: 'cover',
        }}
        source={{uri: item.Img}}
      />
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            paddingVertical: SIZES.padding / 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPressOut={() => navigation.navigate('Detail', item)}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 20,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            style={{
              height: 40,
              width: 30,
              tintColor: COLORS.primary,
              marginTop: -10,
            }}
            source={icons.bookmark}
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: SIZES.fontSize,
              fontWeight: '400',
              color: 'gray',
            }}>
            {item.content}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: 'gray',
            marginBottom: 20,
            // paddingBottom: SIZES.padding,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: '600',
              color: COLORS.primary,
              fontSize: SIZES.fontSize,
            }}>
            Sports
          </Text>
          <Text
            style={{marginRight: 50, color: 'gray', fontSize: SIZES.fontSize}}>
            Aug 9,2021
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: SIZES.padding,
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.primary,
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
