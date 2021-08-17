import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Main from './screens/Main';
import Detail from './screens/Detail';
import Easing from 'react-native/Libraries/Animated/Easing';

const Stack = createStackNavigator();

const App = () => {
  // function MyStack() {
  //   return (

  //   );
  // }
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };

  return (
    <SafeAreaView style={{backgroundColor: '#7c1518', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#7c1518" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
              // transitionSpec: {
              //   open: config,
              //   close: closeConfig,
              // },
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              headerShown: false,
              // transitionSpec: {
              //   open: config,
              //   close: config,
              // },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
