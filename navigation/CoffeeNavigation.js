import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import CoffeeScreen from '../screens/CoffeeScreen';
import OrderScreen from '../screens/OrderScreen';
import SplashScreen from '../screens/SplashScreen';
import Colors from '../constants/Colors';

const CoffeeNavigator = createStackNavigator({
    Coffee: CoffeeScreen,
    Order: OrderScreen
},{
    defaultNavigationOptions: {
        headerTintColor: Colors.primary
    }
});

const SplashNavigator = createStackNavigator({
    Splash: SplashScreen
},{
    defaultNavigationOptions: {
        headerShown: false
    }
});

const LoginNavigator = createStackNavigator({
    Login: LoginScreen
},{
    defaultNavigationOptions: {
        headerTintColor: Colors.primary
    }
});

  
const MainNavigator = createSwitchNavigator({
    SplashSwitch: SplashNavigator,
    Auth: LoginNavigator,
    Shop: CoffeeNavigator
});

  export default createAppContainer(MainNavigator);