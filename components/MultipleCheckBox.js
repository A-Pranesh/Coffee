import React, {useState, useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { AsyncStorage } from 'react-native';
import CheckBox from 'react-native-check-box'

let amount = 0;

const MultipleCheckBox = props => {
    const [toppings, setToppings] = useState([])
    const cost = {
        oreo: 100,
        chocochips: 200,
        extradecoction: 300
    }

    const [oreo, setOreo] = useState(props.selected ? (props.selected.includes("oreo") ? true : false) : false);
    const [chocoChips, setChocoChips] = useState(props.selected ? (props.selected.includes("chocochips") ? true : false) : false);
    const [extraDecoction, setextraDecoction] = useState(props.selected ? (props.selected.includes("extradecoction") ? true : false) : false);


    stateHandler = (title, status ) => {
        if(title == "oreo"){
            setOreo(status);
        } else if(title == "chocochips"){
            setChocoChips(status)
        } else {
            setextraDecoction(status)
        }
    }
    
    
    costCalculator = (title) => {
        let top = toppings
        let status = false
        if(top.includes(title)){
            top.splice(top.indexOf(title), 1)
            amount -= cost[title]
        } else {
            top.push(title)
            amount += cost[title]
            status = true
        }
        setToppings(top);
        stateHandler(title, status)
        submitHandler()
    };

    submitHandler = async () => {
        try {
          await AsyncStorage.mergeItem(
            'user',
            JSON.stringify({'cost': amount, 'toppings': toppings})
            );
        } catch (error) {
            console.log("Something went wrong")
          }
    };

    return(
        <View style={styles.checkBoxContainer}>
            <Text style={styles.checkText}>Extra Toppings</Text>
            <View>
                <View style={styles.boxContainer}>
                    <CheckBox 
                    isChecked={oreo} 
                    disabled={props.enabled ? true : false}
                    onClick={() => costCalculator("oreo")} 
                    uncheckedCheckBoxColor="black" 
                    checkedCheckBoxColor="red"/>
                    <Text style={styles.checkText}>Oreo</Text>
                </View>
                <View style={styles.boxContainer}>
                    <CheckBox 
                    isChecked={chocoChips} 
                    disabled={props.enabled ? true : false}
                    onClick={() => costCalculator("chocochips")} 
                    uncheckedCheckBoxColor="black" 
                    checkedCheckBoxColor="red"/>
                    <Text style={styles.checkText}>ChocoChips</Text>
                </View>
                <View style={styles.boxContainer}>
                    <CheckBox 
                    isChecked={extraDecoction} 
                    disabled={props.enabled ? true : false}
                    onClick={() => costCalculator("extradecoction")} 
                    uncheckedCheckBoxColor="black" 
                    checkedCheckBoxColor="red"/>
                    <Text style={styles.checkText}>ExtraDecoction</Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    checkBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 100
    },
    boxContainer: {
        flexDirection: 'row'
    },
    checkText: {
        color: "red",
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default MultipleCheckBox;