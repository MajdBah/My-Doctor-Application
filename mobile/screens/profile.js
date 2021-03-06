import React from 'react';
import { Text, AsyncStorage, View, Alert } from 'react-native';
import withHeader from '../hoc/withHeader';
import Button from '../components/Button';
import Loader from "../components/Loader";
import { PROFILE_URL } from "../config/urls";
import axios from "../config/axios";
import {transformName}  from "../config/helpers";
import styles from "./styles/profileStyles";

class ProfileScreen extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          user: null,
      }
  }

   componentDidMount(){
      this._getProfile();
   }

   _getProfile = async () => {
      const user = this.state;
      this.setState({isLoading: true});
      try{
         const token = await AsyncStorage.getItem("accessToken");
         axios.defaults.headers.common.Authorization = `JWT ${token}`;
         const response = await axios.get(PROFILE_URL);
         this.setState({user: response.data, isLoading:false});
         
      }catch(e){
         alert(e);
         this.setState({isLoading: false});
      }
  };

  _signOut = async () => {
     Alert.alert('',
     'هل أنت متأكد انك تريد تسجيل الخروج؟',
     [
        {
           text: 'إغلاق',
           style: 'cancel',
        },
        {
           text: 'موافق',
           onPress: async () => {
              await AsyncStorage.clear();
              this.props.navigation.navigate("Main");
           }
        },
     ],
     {cancelable: false}
     )
  }

   render(){
         const { user, isLoading } = this.state;
      return(
         // <Text>{user.name}</Text>
         <View style={styles.container}>
       <Loader title="إحضار بيانات الملف الشخصي" loading={isLoading} />
       {user && (
         <View>
           <View style={styles.userMetaContainer}>
             <View style={styles.userAvtar}>
               <Text style={styles.userAvtarText}>
                 {transformName(user.name)}
               </Text>
             </View>
             <View style={styles.userMeta}>
               <Text style={styles.userName}>{user.name}</Text>
               <Text>{user.email}</Text>
             </View>
           </View>
           {user.profile && (
             <View>
               <View style={styles.doctorInfo}>
                 <View style={styles.infoCell}>
                   <Text style={styles.infoTitle}>الإختصاص:</Text>
                   <Text style={styles.infoText}>
                    {user.profile.specialization}
                   </Text>
                 </View>
                 <View style={styles.infoCell}>
                   <Text style={styles.infoTitle}>العنوان:</Text>
                   <Text style={styles.infoText}>
                   {user.profile.address}
                   </Text>
                 </View>
                 <View style={styles.infoCell}>
                   <Text style={styles.infoTitle}>ساعات العمل:</Text>
                   <Text style={styles.infoText}>
                   {user.profile.workingHours}
                   </Text>
                 </View>
                 <View style={styles.lastCell}>
                   <Text style={styles.infoTitle}>رقم الهاتف:</Text>
                   <Text style={styles.infoText}>
                   {user.profile.phone}
                   </Text>
                 </View>
               </View>
             </View>
           )}
           <Button
             buttonStyles={styles.logoutButton}
             textStyles={styles.buttonText}
             text="تسجيل خروج"
             onPress={this._signOut}
           />
         </View>
       )}
     </View>
      )
   }
}

export default withHeader(ProfileScreen, 'الملف الشخصي');