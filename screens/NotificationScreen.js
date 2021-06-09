import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import { render } from 'react-dom';

export default class NotificationScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
    }

    getNotifications=()=>{
        this.requestref=db.collection('Notifications')
        .where('notificationStatus','==','unread')
        .where('targetUserId','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map((doc)=>{
                var notifications=doc.data()
                notifications['docId']=doc.id
                allNotifications.push(notifications)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    
    componentDidMount(){
        this.getNotifications()
    }

render(){
  return(
      <View>
       {this.state.allNotifications.length===0?(
           <View>
           <Text>
               You have no notifications
           </Text>
           </View>
       ):(
           <SwipeableFlatlist allNotifications={
               this.state.allNotifications
           }/>
       )}
      </View>
  )
}
}