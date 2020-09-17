import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { AsyncStorage } from 'react-native';
import Textarea from 'react-native-textarea';

const TextArea = props => {
    const [textAreaInput, setTextAreaInput] = useState('')

    saveTextAreaHandler = async () => {
        try {
          await AsyncStorage.mergeItem(
            'user',
            JSON.stringify({'fortuneMessage': textAreaInput})
            );
        } catch (error) {
            console.log("Something went wrong")
          }
    };
    
    return(
        <View style={styles.textAreaContainer}>
            <Text style={styles.textAreaText}>Fortune Message</Text>
            <Textarea 
            editable={props.selectedText ? false : true}
            maxLength={200} 
            placeholder={props.selectedText ? props.selectedText : "Message"} 
            placeholderTextColor={'brown'} 
            onChangeText={text => {setTextAreaInput(text)
            saveTextAreaHandler()}} 
            style={styles.textArea}/>
        </View>
    );
}

const styles = StyleSheet.create({
    textAreaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 40,
        marginTop: 50,
    },
    textArea: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'brown',
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1
    },
    textAreaText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20
    },
});

export default TextArea;