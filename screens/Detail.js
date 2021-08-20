import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  // ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {icons, SIZES, COLORS} from '../constants';
import {useNavigation} from '@react-navigation/native';
import FilterModal from './FilterModal';
import Indicator from '../components/Indicator';

const HEADER_HEIGHT = 70;

const Detail = () => {
  const navigation = useNavigation();

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 70);
  const [headerIndex, setHeaderIndex] = useState(0);
  const flatlist = React.useRef();
  const [showFilterMode, setShowFilterMode] = React.useState(false);
  const headerScrollX = React.useRef(new Animated.Value(0)).current;

  const onItemPress = React.useCallback(itemIndex => {
    flatlist?.current?.scrollToOffset({
      offset: itemIndex * SIZES.width,
    });
  });

  const route = useRoute();
  const data = route.params.detail;
  const title = route.params.title;
  const Img = route.params.Img;

  const scrollView = React.useRef();

  function renderHeader() {
    return (
      <View
        style={{
          height: HEADER_HEIGHT,
          backgroundColor: COLORS.lightGray,
          padding: SIZES.base,
          // paddingBottom: 2,
        }}>
        <Animated.ScrollView
          ref={scrollView}
          horizontal={true}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: headerScrollX}}}],
            {useNativeDriver: false},
          )}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: COLORS.white,
            }}>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`Index+${item.id}`}
                  onPress={() => {
                    onItemPress(index);
                    setHeaderIndex(index);
                  }}>
                  <View style={styles.box}>
                    <Text
                      style={[
                        styles.boxContent,
                        {
                          color:
                            headerIndex !== index ? COLORS.gray : COLORS.black,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Indicator scrollX={scrollX} />
        </Animated.ScrollView>
      </View>
    );
  }

  function renderFooter() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'white',
          zIndex: 1,
          padding: SIZES.base,
          flexDirection: 'row',
          alignItems: 'center',
          transform: [
            {
              translateY: diffClamp.interpolate({
                inputRange: [0, HEADER_HEIGHT],
                outputRange: [0, HEADER_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={[
                styles.iconStyle,
                {
                  transform: [{rotate: '-90deg'}],
                },
              ]}
              source={icons.upload}
            />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{fontWeight: '700', fontSize: SIZES.fontSize + 4}}>
              {title}
            </Text>
          </View>
          <Image style={[styles.iconStyle]} source={icons.three_dot_menu} />
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* <SafeAreaView /> */}
      {renderHeader()}
      <FlatList
        ref={flatlist}
        data={data}
        onEndReachedThreshold={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{height: SIZES.height}}
        style={{flex: 1}}
        onEndReached={() => {
          setShowFilterMode(true);
        }}
        pagingEnabled
        bounces={false}
        keyExtractor={(item, index) => item.id.toString()}
        horizontal={true}
        renderItem={({item, index}) => {
          // console.log(item.content);
          return (
            <Animated.ScrollView
              scrollEnabled={true}
              contentContainerStyle={{}}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: true},
              )}
              style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: COLORS.white,

                  width: SIZES.width,
                }}>
                <View>
                  <Image
                    source={{uri: Img}}
                    style={{
                      height: SIZES.height * 0.4,
                      width: SIZES.width,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View style={{flex: 1, paddingBottom: HEADER_HEIGHT}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      padding: SIZES.padding,
                      fontSize: 18,
                    }}>
                    {item.content}
                  </Text>
                </View>
              </View>
            </Animated.ScrollView>
          );
        }}
      />
      {renderFooter()}
      {showFilterMode && (
        <FilterModal
          isVisible={showFilterMode}
          onClose={() => setShowFilterMode(false)}
        />
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  box: {
    paddingVertical: 5,
    paddingHorizontal: SIZES.padding,
  },
  boxContent: {
    fontWeight: '700',
    fontSize: SIZES.padding,
    textTransform: 'uppercase',
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
});
