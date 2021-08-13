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
const {width, height} = Dimensions.get('window');

const data = [
  {
    id: 1,
    name: 'nagendra234',
  },
  {
    id: 2,
    name: 'nagendra2',
  },
  {
    id: 3,
    name: 'nagendra2',
  },
  {
    id: 4,
    name: 'nagendra2sss34',
  },
  {
    id: 5,
    name: 'nagendra2fefefe34',
  },
  {
    id: 6,
    name: 'nagendra23tjyj4',
  },
  {
    id: 7,
    name: 'nagendra2yjyjn34',
  },
  {
    id: 8,
    name: 'nagendratrr234',
  },
  {
    id: 9,
    name: 'nagendra2rthth34',
  },
];

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
    <View style={{flex: 1, backgroundColor: 'yellow'}}>
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
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
