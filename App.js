import React from 'react';
import {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Animated,
  FlatList,
  PanResponder,
} from 'react-native';
import Card from './components/Card';
import {data} from './constants/data';
const {width, height} = Dimensions.get('window');

const App = () => {
  const swipe = useRef(new Animated.ValueXY()).current;
  const swipedcard = useRef(new Animated.ValueXY({x: 0, y: -height})).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gesture) => {
      if (currentIndex > 0 && gesture.dy > 150 && gesture.vy > 0.3) {
        Animated.timing(swipedcard, {
          toValue: {
            x: 0,
            y: 0,
          },
          duration: 400,
          useNativeDriver: false,
          // friction: 5,
        }).start(() => {
          setCurrentIndex(prevIndex => prevIndex - 1);

          swipedcard.setValue({x: 0, y: -height});
        });
      } else if (
        -gesture.dy > 50 &&
        -gesture.vy > 0.3 &&
        currentIndex < data.length - 1
      ) {
        console.log('reached');

        Animated.timing(swipe, {
          toValue: {
            x: 0,
            y: -height,
          },
          duration: 400,
          useNativeDriver: false,
          // friction: 5,
        }).start(() => {
          setCurrentIndex(prevIndex => prevIndex + 1);

          swipe.setValue({x: 0, y: 0});
        });
      } else {
        console.log('else');
        Animated.parallel([
          Animated.spring(swipe, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }),
          Animated.spring(swipedcard, {
            toValue: {x: 0, y: -height},
            useNativeDriver: false,
          }),
        ]).start();
      }
    },
    onPanResponderMove: (e, gesture) => {
      if (gesture.dy > 0 && currentIndex > 0) {
        console.log('swipe deow');
        swipedcard.setValue({x: 0, y: -height + gesture.dy});
      } else {
        swipe.setValue({x: 0, y: gesture.dy});
      }
    },
  });
  return (
    <SafeAreaView style={{backgroundColor: '#7c1518', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#7c1518" />
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
        {console.log('here')}
        {data
          ?.map((item, index) => {
            if (index === currentIndex - 1) {
              console.log('swipedcard');
              const dragHandlers = panResponder.panHandlers;
              const isSwipe = true;
              return (
                <Card
                  key={index}
                  index={index}
                  item={item}
                  currentIndex={currentIndex}
                  isSwipe={isSwipe}
                  swipedcard={swipedcard}
                  swipe={swipe}
                  {...dragHandlers}
                />
              );
            } else if (index < currentIndex) {
              return null;
            }
            const dragHandlers =
              currentIndex === index ? panResponder.panHandlers : {};
            return (
              <Card
                key={index}
                index={index}
                {...dragHandlers}
                swipedcard={swipedcard}
                swipe={swipe}
                item={item}
                currentIndex={currentIndex}
              />
            );
          })
          .reverse()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
