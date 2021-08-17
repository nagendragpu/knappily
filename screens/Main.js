import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Easing,
  Animated,
  FlatList,
  PanResponder,
} from 'react-native';
import {useRef} from 'react';
import Card from '../components/Card';
import {data} from '../constants/data';
const {width, height} = Dimensions.get('window');
import Header from '../components/Header';

const Main = () => {
  const swipe = useRef(new Animated.ValueXY()).current;
  const swipedcard = useRef(new Animated.ValueXY({x: 0, y: -height})).current;
  const headerHeight = React.useRef(new Animated.Value(0)).current;
  const [headerHide, setHeaderHide] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderRelease: (e, gesture) => {
      console.log('onP', gesture.dy);

      if (gesture.dy == 0) {
        if (headerHide) {
          Animated.timing(headerHeight, {
            toValue: -60,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => {
            setHeaderHide(!headerHide);
          });
        } else {
          Animated.timing(headerHeight, {
            toValue: 0,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(setHeaderHide(!headerHide));
        }
      }
      if (currentIndex > 0 && gesture.dy > 50 && gesture.vy > 0.2) {
        Animated.timing(swipedcard, {
          toValue: {
            x: 0,
            y: 0,
          },
          duration: 200,
          useNativeDriver: false,
          // friction: 5,
        }).start(() => {
          setCurrentIndex(prevIndex => prevIndex - 1);

          swipedcard.setValue({x: 0, y: -height});
        });
      } else if (
        -gesture.dy > 50 &&
        -gesture.vy > 0.2 &&
        currentIndex < data.length - 1
      ) {
        console.log('reached');

        Animated.timing(swipe, {
          toValue: {
            x: 0,
            y: -height,
          },
          duration: 200,
          useNativeDriver: false,
          // friction: 5,
        }).start(() => {
          setCurrentIndex(prevIndex => prevIndex + 1);

          swipe.setValue({x: 0, y: 0});
        });
      } else {
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
        console.log('swipeUp', gesture.dy);
        if (currentIndex < data.length - 1 && gesture.dy < 0) {
          swipe.setValue({x: 0, y: gesture.dy});
        }
      }
    },
  });
  return (
    <Animated.View style={{flex: 1, backgroundColor: 'yellow'}}>
      <Header headerHeight={headerHeight} />

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
    </Animated.View>
  );
};

export default Main;

const styles = StyleSheet.create({});
