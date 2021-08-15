import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Main from './screens/Main';
import Detail from './screens/Detail';

const Stack = createStackNavigator();

const App = () => {
  // function MyStack() {
  //   return (

  //   );
  // }

  return (
    <SafeAreaView style={{backgroundColor: '#7c1518', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#7c1518" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
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
