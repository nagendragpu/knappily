import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {SIZES} from './constants';
import StackNavigator from './Navigation/StackNavigator';

const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: SIZES.primary, flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={SIZES.primary} />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
