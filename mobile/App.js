import React from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigation from './config/routes';
import {I18nManager} from "react-native";
// import * as Location from 'expo-location';
// import { Location, Permissions } from 'expo';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    isReady: false,
  }
  }

  async componentDidMount(){
    await Permissions.askAsync(Permissions.LOCATION);
  }

  async _loadFonts() {
    await Font.loadAsync({
      Noto: require('./assets/fonts/noto.ttf'),
    });
  }

  
    render() {
      if (!this.state.isReady) {
        return (
          <AppLoading
            startAsync={this._loadFonts}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />
        ); }
      I18nManager.forceRTL(true);
        return(<AppNavigation />);
    }
    
}
