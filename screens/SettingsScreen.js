import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state={
         emailId:'',
         firstName:'',
         lastName:'',
         address:'',
         contact:'',
         docId:'',
        }
    }

    getUserDetails(){
        var user=firebase.auth().currentUser;
        console.log(user)
        var email=user.email;
        db.collection('users').where('emailId','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                this.setState({
                    emailId:data.emailId,
                    firstName:data.firstName,
                     lastName:data.lastName,
                     address:data.address,
                     contact:data.contact,
                    docId:doc.id, 
                })
            })
        })
    }

    componentDidMount(){
        this.getUserDetails()
    }

    updateUserDetails=()=>{
      db.collection('users').doc(this.state.docId)
      .update({
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        contact:this.state.contact,
        address:this.state.address
      })
    }
 render(){
    return(
        <View style={{flex:1}}>
                 <MyHeader
               title="Settings"
               navigation={this.props.navigation}
               /> 
               <View>
                   
               <TextInput
          style={styles.formTextInput}
          placeholder="First Name"
          maxLength ={10}
          onChangeText={(text)=>{
           this.setState({
             firstName:text
           })
          }}
          value={this.state.firstName}
          />
            <TextInput
          style={styles.formTextInput}
          placeholder="Last Name"
          maxLength ={10}
          onChangeText={(text)=>{
           this.setState({
             lastName:text
           })
          }}
          value={this.state.lastName}
          />
            <TextInput
            style={styles.formTextInput}
          placeholder="Address"
          multiline={true}
          onChangeText={(text)=>{
           this.setState({
             address:text
           })
          }}
          value={this.state.address}
          />
          
             <TextInput
             style={styles.formTextInput}
          placeholder="Contact"
          maxLength ={10}
          onChangeText={(text)=>{
           this.setState({
             contact:text
           })
          }}
          value={this.state.contact}
          />
          <TouchableOpacity
          onPress={()=>{
          this.updateUserDetails()
          }}>
            <Text>Save</Text>
          </TouchableOpacity>
          </View>   
       </View>

    )
 }
}
const styles = StyleSheet.create({
  formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10
    },
  })