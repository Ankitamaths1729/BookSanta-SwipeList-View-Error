import React from 'react';
import { StyleSheet,Text,View,TextInput,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class SideBar extends React.Component{
    render(){
     return(
         <View>
             <View>
                 <DrawerItems{...this.props}/>
             </View>
             <View>
                 <TouchableOpacity
                 onPress={()=>{
                     this.props.navigation.navigate('Welcome')
                     firebase.auth().signOut()
                 }}
                 >
                     <Text>Logout</Text>
                 </TouchableOpacity>
             </View>
         </View>
     )   
    }
}
