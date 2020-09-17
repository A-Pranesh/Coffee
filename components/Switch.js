import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { AsyncStorage } from 'react-native';
import SwitchSelector from "react-native-switch-selector";

const Switch = props => {
    const options = [
        { label: "Hot", value: "Hot" },
        { label: "Cold", value: "Cold" },
    ];

    saveSwitchHandler = async(value) => {
        try {
          await AsyncStorage.mergeItem(
            'user',
            JSON.stringify({'temperature': value})
            );
        } catch (error) {
            console.log("Something went wrong")
        }
    };

    return(
        <View style={styles.switchContainer}>
            <Text style={styles.text}>Form</Text>
            <SwitchSelector
            disabled={props.selectedTemp ? true : false}
            options={options}
            initial={props.selectedTemp ? (props.selectedTemp == "Hot" ? 0 : 1) : 0}
            onPress={value => {
            saveSwitchHandler(value)}}
            style={styles.switch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "red",
        marginTop: 100,
        fontWeight: 'bold',
        fontSize: 20
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    switch: {
        width: 100,
        marginTop: 90,
    },
});

export default Switch;