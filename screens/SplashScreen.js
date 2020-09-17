import React, { useEffect } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';

const SplashScreen = props => {

    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate({routeName: 'Auth'})
        },3000)
    })

        return(
            <View style={styles.container}>
                <Image source={require("../assets/coffee-cup.png")} style={styles.image}/>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default SplashScreen;