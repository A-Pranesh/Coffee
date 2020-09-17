import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { AsyncStorage } from 'react-native';

const DropDown = props => {

    const [flavour, setFlavour] = useState(props.selectedFlavour ? props.selectedFlavour :"cappuccino 100");
    let totalCost = 100;

    saveDataHandler = async (value) => {
        const data = value.split(' ')
        try {
          await AsyncStorage.mergeItem(
            'user',
            JSON.stringify({'flavour': value, 'flavourCost': data[1]})
            );
        } catch (error) {
            console.log("Something went wrong")
        }
    };

    return(
    <View style={styles.pickerContainer}>
        <Text style={styles.text}>Flavour</Text>
        <Picker
        style={styles.picker}
        itemStyle={{color:'red'}}
        selectedValue={flavour}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue) => {
        setFlavour(itemValue)
        saveDataHandler(itemValue)
        }}
        >
          <Picker.Item label="cappuccino 100" value="cappuccino 100"/>
          <Picker.Item label="mocha 200" value="mocha 200"/>
          <Picker.Item label="Hazelnut 300" value="Hazelnut 300" />
          <Picker.Item label="latte 400" value="latte 400" />
          <Picker.Item label="Caramel 500" value="Caramel 500" />
        </Picker>
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
    picker:{
        fontWeight: 'bold',
        fontSize :20
    },
    pickerContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
    },
});

export default DropDown;