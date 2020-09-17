import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Image, Button, Alert} from 'react-native';
import Colors from '../constants/Colors';
import { AsyncStorage } from 'react-native';

const LoginScreen = props => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const usernameHandler = text => {
        setUsername(text);
    }

    const passwordHandler = text => {
        setPassword(text);
    }

    saveDataHandler = async () => {
        if(username?.length > 0 && password?.length > 0){
            try {
                await AsyncStorage.setItem(
                'user',
                JSON.stringify({'username': username, 'password': password})
                );
                props.navigation.navigate({routeName: 'Shop'})
            } catch (error) {
                console.log("Something went wrong")
            }
        } else {
            Alert.alert("Wrong Username/Password", "Please Enter a valid username/password", [{text: "Ok"}]);
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/coffee-cup.png")} style={styles.image}/>
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Username</Text>
                    <TextInput 
                    autoFocus={true}
                    placeholder="Enter Your Username" 
                    placeholderTextColor="white" 
                    onChangeText={text => usernameHandler(text)} 
                    style={styles.inputText} 
                    value={username}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Password</Text>
                    <TextInput 
                    placeholder="Enter Your Password" 
                    placeholderTextColor="white" 
                    secureTextEntry={true} 
                    onChangeText={text => passwordHandler(text)} 
                    style={styles.inputText} 
                    value={password}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={saveDataHandler}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    loginContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    text: {
        color: "white"
    },
    inputText: {
        height: 50,
        width: '50%',
        borderWidth: 1,
        borderRadius: 50,
        textAlign: 'center',
        color: "white",
        borderColor: "white",
    },
    imageContainer: {
        height: 100,
        width: 100,
        marginLeft: 150, 
        marginTop: 300,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'yellow',
        width: 150,
        borderRadius: 50,
        marginBottom: 100,
        marginLeft: 150,
    }
});

LoginScreen.navigationOptions = navData => {
    return{
        headerTitle: "Login"
    };
};

export default LoginScreen;