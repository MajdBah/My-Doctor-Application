import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import 'react-native-gesture-handler';
import 'react-native-screens';
import HomeScreen from '../screens/home';
import SignUpScreen from '../screens/signup';
import DoctorsScreen from '../screens/doctors';
import SignInScreen from "../screens/signin";
import ProfileScreen from "../screens/profile";
import Drawer from '../components/Drawer';

const DoctorsStack = createStackNavigator({
   DoctorsScreen: {screen: DoctorsScreen}
});

const ProfileStack = createStackNavigator({
   ProfileScreen: {screen: ProfileScreen}
});

const DrawerNavigation = createDrawerNavigator({
   Doctors: {
      screen: DoctorsStack,
      navigationOptions: {
         drawerLabel: 'الأطباء',
      }
   },
   Profile: {
      screen: ProfileStack,
      navigationOptions: {
         drawerLabel: 'الملف الشخصي',
      }
   },
},
{
      contentOptions: {
         labelStyle: {
            fontSize: 18,
            marginRight: 5,
            fontFamily: 'Noto',
         },
         activeTintColor: '#fff',
         activeBackgroundColor: '#007bff'
      },

      drawerPosition: 'right',
      drawerWidth: 300,
      contentComponent: props => (
         <Drawer drawerProps={props} />
      )
}
);

export default createAppContainer(
   createStackNavigator({
      Main: HomeScreen,
      SignUp: SignUpScreen,
      SignIn: SignInScreen,
      DrawerNav: DrawerNavigation,
   },
      {
         headerMode: 'none',
      })
)