import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, CheckBox, Text, Platform } from 'react-native';
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';
import * as Location from 'expo-location';
// import { Location, Permissions } from 'expo';

class SignUpScreen extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         name: '',
         email: '',
         password: '',
         specialization: '',
         workingHours: '',
         phone: '',
         address: '',
         userType: false,
         location: null,
         isLoading: false,
         alert: {
            messages: '',
            type: ''
         }
      }
   }


    _getLocation = async () => {
      try{
         let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
         this.setState({location});
      }catch(e){
         this.setState({location: null});
      }
   }
   
   UNSAFE_componentWillMount() {
      this._getLocation();
   }

   componentDidUpdate() {
      if (this.state.alert.messages) {
        setTimeout(() => {
          this.setState({ alert: { messages: null } });
        }, 3000);
      }
    }
  
    componentWillUnmount() {
      clearTimeout();
    }
  

   changeName = value => {
      this.setState({name: value});
   };

   changeEmail = value => {
      this.setState({email: value});
   };

   changePassword = value => {
      this.setState({password: value});
   };

   changeUserType = () => {
      this.setState({userType: !this.state.userType});
   };

   changePhone = value => {
      this.setState({phone: value});
   };

   changeSpecialization = value => {
      this.setState({specialization: value});
   };

   changeWorkingHours = value => {
      this.setState({workingHours: value});
   };

   changeAddress = value => {
      this.setState({address: value});
   };

   validate() {
      const { name, email, password, userType, specialization, address, phone, workingHours } = this.state;
      let validationErrors = [];
      let passed = true;
      if (!name) {
        validationErrors.push("???????????? ?????????? ?????? ????????????????");
        passed = false;
      }
  
      if (!email) {
        validationErrors.push("???????????? ?????????? ???????????? ????????????????????");
        passed = false;
      }
  
      if (!password) {
        validationErrors.push("???????????? ?????????? ???????? ????????????");
        passed = false;
      }
  
      if (userType) {
        if (!specialization) {
          validationErrors.push("???????????? ?????????? ???????????? ");
          passed = false;
        }
  
        if (!address) {
          validationErrors.push("???????????? ?????????? ??????????????");
          passed = false;
        }
  
        if (!workingHours) {
          validationErrors.push("???????????? ?????????? ?????????? ??????????");
          passed = false;
        }
  
        if (!phone) {
          validationErrors.push("???????????? ?????????? ?????? ????????????");
          passed = false;
        }
  
      }
  
      if (validationErrors.length > 0) {
        this.setState({ alert: { messages: validationErrors, type: "danger" } });
      }
      return passed;
    }

   _signUp = async () => {
      if (!this.validate()) return;
      this.setState({
         isLoading: true
      });
      const { name, email, password, specialization, address, phone, workingHours, userType, location } = this.state;
      const body = {
         name,
         email,
         password,
         userType: userType ? 'doctor' : 'normal',
         specialization,
         address,
         phone,
         workingHours,
         location: {
            latitude: location ? location.coords.latitude : null,
            longtude: location ? location.coords.longitude : null,
         }
      };
      try{
         const response = await axios.post(SIGNUP_URL, body);
         this.setState({
            name: '',
            email: '',
            password: '',
            specialization: '',
            workingHours: '',
            phone: '',
            address: '',
            location: null,
            userType: false,
            isLoading: false,
         });

         this.props.navigation.navigate('SignIn', {
            alert: {messages: '???? ?????????? ?????????? ??????????', type: 'success'}
          })
      }catch(e){
         this.setState({
            alert: { messages: e.response.data.message, type: "danger" },
            isLoading: false
          });
      }
   }

   render(){
      const { name, email, password, specialization, address, phone, workingHours, userType, location, isLoading, alert } = this.state;
      return(
         <ScrollView contentContainerStyle={{paddingVertical:40}}>
            <Loader title="???????? ?????????? ???????? ????????" loading={isLoading} />
            <Alert messages={alert.messages} type={alert.type} />
            <View style={styles.container}>
            <ScreenTitle title="?????????? ???????? ????????" icon="md-person-add" />
            <KeyboardAvoidingView behavior="padding" enabled>
               <Input placeholder="??????????" value={name} onChangeText={this.changeName} />
               <Input placeholder="???????????? ????????????????????" value={email} onChangeText={this.changeEmail}/>
               <Input secureTextEntry placeholder="???????? ????????????" value={password} onChangeText={this.changePassword}/>
               <View style={styles.checkBoxContainer}>
                  <CheckBox value={userType} onChange={this.changeUserType} />
                  <Text style={styles.checkBoxLabel}>????????</Text>
               </View>
               {userType && 
                  <React.Fragment>
                     <Input placeholder="????????????" value={specialization} onChangeText={this.changeSpecialization}/>
                     <Input placeholder="?????????? ??????????" value={workingHours} onChangeText={this.changeWorkingHours}/>
                     <Input placeholder="??????????????" value={address} onChangeText={this.changeAddress}/>
                     <Input placeholder="?????? ????????????" value={phone} onChangeText={this.changePhone}/>
                  </React.Fragment>
               }
               
               <Button text="?????????? ????????" onPress={this._signUp} />
            </KeyboardAvoidingView>
            </View>
         </ScrollView>
      )
   }
}

export default SignUpScreen;