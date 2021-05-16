import React from 'react';
import HeaderButton from '../components/HeaderButton';
import {I18nManager} from "react-native";

const withHeader = (WrappedComponent, title) => {
   return class extends React.Component{
      static navigationOptions = ({navigation}) => {
         return{
            title: title,
            headerStyle: {
               backgroundColor: '#007bff',
            },
            // headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
               // marginHorizantal: 10,
               textAlign: 'left',
               fontFamily: 'Noto',
               flex:1
            },
            headerRight:() => <HeaderButton direction="right" iconName="md-arrow-back" headerPressed={() => navigation.goBack(null)} />,
            headerLeft:() => <HeaderButton direction="left" iconName="md-menu" headerPressed={navigation.openDrawer} />,
         }
      }

      componentDidMount(){
         this.props.navigation.setParams({
            openDrawer: this.props.navigation.openDrawer,
            goBack: this.props.navigation.goBack,
         })
      }

      render(){
         I18nManager.forceRTL(true);
         return <WrappedComponent {...this.props} />
      }
   }
}

export default withHeader;