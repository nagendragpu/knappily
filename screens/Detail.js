import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const Detail = () => {
  const route = useRoute();
  //   console.log(route.params);
  const data = route.params.detail;
  //   console.log(dataR);

  function renderHeader() {
    return (
      <View style={{height: 60}}>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          style={{}}
          contentContainerStyle={{margin: 5}}>
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
            <View style={styles.box}>
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
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#c9c9c9'}}>
      <SafeAreaView />
      {/* {renderHeader()} */}
      <FlatList
        data={data}
        // snapToInterval={5}
        pagingEnabled
        keyExtractor={(item, index) => item.id.toString()}
        horizontal={true}
        renderItem={({item, index}) => {
          console.log(item.content);
          return (
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  height,
                  width,
                  backgroundColor: 'yellow',
                }}>
                <Text>{item.content}</Text>
              </View>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  boxContent: {
    fontWeight: '700',
    fontSize: 15,
  },
});
