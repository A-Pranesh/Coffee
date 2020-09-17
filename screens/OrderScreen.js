import React, { useState, useEffect, useRef } from 'react';
import {Text, StyleSheet, View, Button, ScrollView, ActivityIndicator, SafeAreaView, Image} from 'react-native';
import { AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import DropDown from '../components/DropDown';
import Switch from '../components/Switch';
import MultipleCheckBox from '../components/MultipleCheckBox';
import TextArea from '../components/TextArea';
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";

const OrderScreen = props => {
  const [userDetail, setUserDetail] = useState();
  const viewShotRef = useRef(null);
  const [screenShotUri, setScreenShotUri] = useState('');
  
  useEffect( () => {
    getDataHandler = async () => {
      const value = await AsyncStorage.getItem('user');
      setUserDetail(JSON.parse(value))
    }
    getDataHandler()
  }, []);

  shareHandler = async() => {
    const shareOptions = {message: "Your Order Details"}
    try{
      const shareResponse = await Share.open(shareOptions)
    } catch(error) {
      console.log("Something Went Wrong")
    }
  }

  if(screenShotUri) {
    return(
      <View style={styles.screenShotCotainer}>
        <Image source={{uri: screenShotUri}} style={styles.screenShotImage}/>
        <Button title="Share" onPress={shareHandler} />
      </View>
    );
  }

  return(
    <>{!userDetail ? <View style={styles.loader}><ActivityIndicator size="small" color="#0000ff" /></View> :
    <SafeAreaView style={styles.container}>
      <ViewShot ref={viewShotRef}  options={{format: 'jpg', quality: 0.9}} >
      <ScrollView >
        <DropDown selectedFlavour={userDetail.flavour}/>
        <Switch selectedTemp={userDetail.temperature}/>
        <MultipleCheckBox selected={userDetail.toppings} enabled={true}/>
        <TextArea selectedText={userDetail.fortuneMessage}/>
        <View style={styles.costContainer}>
          <Text style={styles.costText}>Total Amount: {parseInt(userDetail.cost) + parseInt(userDetail.flavourCost)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Prepare Coffee" onPress={async() => {
            const uri = await viewShotRef.current.capture()
            setScreenShotUri(uri)
          }}/>
        </View>
    </ScrollView>
    </ViewShot>
    </SafeAreaView>
    }
    </>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: 130,
    backgroundColor: 'yellow',
    width: 150,
    borderRadius: 50,
    height: 40
  },
  costText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20
  },
  costContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenShotCotainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenShotImage: {
    height: 500,
    width: 300,
  }
});

OrderScreen.navigationOptions = navData => {
    return{
        headerTitle: "Order"
    };
};

export default OrderScreen;