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
} from 'react-native';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const RED_COLOR = '#7c1518';

const Detail = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const route = useRoute();
  //   console.log(route.params);
  const data = route.params.detail;
  // console.log(data);

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
            <ScrollView
              scrollEnabled={true}
              contentContainerStyle={{}}
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
            </ScrollView>
          );
        }}
      />
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
});
