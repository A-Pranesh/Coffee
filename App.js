import React, { useEffect } from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from './constants/Colors';
import LoginScreen from './screens/LoginScreen';
import MainNavigator from './navigation/CoffeeNavigation';

export default function App() {
  return(
    <MainNavigator />
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  }
});
