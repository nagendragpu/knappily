import React from 'react';
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

const RED_COLOR = '#7c1518';

const Detail = () => {
  const navigation = useNavigation();

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 70);

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
          // borderWidth: 2,
          // borderColor: 'red',
        }}>
        <ScrollView
          ref={scrollView}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          // onScroll={event => {
          //   console.log(event.nativeEvent.contentOffset.x);
          // }}
          style={{}}
          contentContainerStyle={{}}>
          <View
            style={{
              // height: 100,
              //   backgroundColor: 'yellow',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <View style={[styles.box]}>
              <Text style={styles.boxContent}>WHAT</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxContent}>WHY</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxContent}>WHEN</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxContent}>WHERE</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxContent}>WHO</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxContent}>HOW</Text>
            </View>
          </View>
        </ScrollView>
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
        data={data}
        onEndReachedThreshold={3}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{height}}
        style={{flex: 1}}
        onEndReached={() => {
          scrollView.current.scrollTo({x: 67, y: 0, animated: true});
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
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
});
