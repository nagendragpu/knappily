import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {icons} from '../constants';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import {RefreshControl} from 'react-native';

import FilterModal from './FilterModal';

const RED_COLOR = '#7c1518';

const Detail = () => {
  const navigation = useNavigation();

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 70);
  const [headerIndex, setHeaderIndex] = useState(0);
  const scrollviewX = React.useRef(new Animated.Value(0)).current;
  const flatlist = React.useRef();
  const [showFilterMode, setShowFilterMode] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onItemPress = React.useCallback(itemIndex => {
    flatlist?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  const route = useRoute();
  const data = route.params.detail;
  const title = route.params.title;

  const scrollView = React.useRef();

  function renderHeader() {
    return (
      <View
        style={{
          height: 65,
          backgroundColor: '#d0d0d0',
          padding: 8,
          paddingBottom: 2,
        }}>
        <Animated.ScrollView
          ref={scrollView}
          horizontal={true}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    onItemPress(index);
                    setHeaderIndex(index);
                  }}
                  onLayout={event => {
                    console.log(event.nativeEvent);
                  }}>
                  <View style={styles.box}>
                    <Text
                      style={[
                        styles.boxContent,
                        {color: headerIndex !== index ? 'grey' : 'black'},
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={{
            borderBottomWidth: 5,
            borderBottomColor: RED_COLOR,
            width: 80,
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, width, 2 * width, 3 * width, 4 * width],
                  outputRange: [0, 60, 140, 220, 300],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        />
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
          height: 70,
          backgroundColor: 'white',
          zIndex: 1,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          transform: [
            {
              translateY: diffClamp.interpolate({
                inputRange: [0, 70],
                outputRange: [0, 70],
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
            <Text style={{fontWeight: '700', fontSize: 18}}>{title}</Text>
          </View>
          <Image style={[styles.iconStyle]} source={icons.three_dot_menu} />
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* <SafeAreaView /> */}
      {renderHeader()}
      <FlatList
        ref={flatlist}
        data={data}
        onEndReachedThreshold={0}
        scrollEventThrottle={16}
        // refreshControl={
        //   <RefreshControl
        //     //refresh control used for the Pull to Refresh
        //     refreshing={refreshing}
        //     onRefresh={React.useCallback(() => {
        //       setRefreshing(true);
        //       console.log('Refreshing');
        //       setRefreshing(false);
        //     }, [])}
        //   />
        // }
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{height}}
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
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'red',
                  // height,
                  width,
                }}>
                <View>
                  <Image
                    source={require('../assets/images/joe.jpg')}
                    style={{
                      height: 300,
                      width,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: '600', padding: 16, fontSize: 18}}>
                    {item.content}
                  </Text>
                </View>
              </View>
              {/* <View style={{height: 50}} /> */}
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
    paddingHorizontal: 15,
  },
  boxContent: {
    fontWeight: '700',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
});
