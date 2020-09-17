import React, { useState } from 'react';
import {StyleSheet, View, ScrollView, ImageBackground, Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import MainNavigator from '../navigation/CoffeeNavigation';
import DropDown from '../components/DropDown';
import Switch from '../components/Switch';
import MultipleCheckBox from '../components/MultipleCheckBox';
import TextArea from '../components/TextArea';
import _retriveData from '../retrive';

const CoffeeScreen = props => {
  return(
    <ImageBackground source={require('../assets/IMG_1229.png')} style={styles.container}>
      <ScrollView style={styles.container}>
        <DropDown />
        <Switch />
        <MultipleCheckBox />
        <TextArea />
        <View style={styles.buttonContainer}>
          <Button title="Prepare Coffee" onPress={() => {
            props.navigation.navigate({routeName: 'Order'})}}/>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 50,
    marginLeft: 130,
    backgroundColor: 'yellow',
    width: 150,
    borderRadius: 50,
    height: 40
  },
});

CoffeeScreen.navigationOptions = navData => {
    return{
        headerTitle: "Coffee"
    };
};


export default CoffeeScreen;