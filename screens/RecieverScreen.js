import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {Card,Icon} from 'react-native-elements';

export default class RecieverScreen extends React.Component {
constructor(props){
super(props)
this.state={
    userId:firebase.auth().currentUser.email,
    recieverId:this.props.navigation.getParam('details')['userId'],
    requestId:this.props.navigation.getParam('details')['requestId'],
    bookName:this.props.navigation.getParam('details')['bookName'],
    requestReason:this.props.navigation.getParam('details')['requestReason'],
    recieverName:'',
    recieverContact:'',
    recieverAddress:'',
    recieverDocId:'',
    userName:''
}
}

updateBookStatus=()=>{
    db.collection('allDonations').add({
      bookName:this.state.bookName,
      requestId:this.state.requestId,
      requestedBy:this.state.recieverName,
      donorId:this.state.userId,
      requestStatus:"donor interested"  
    })
}

getUserDetails=(userId)=>{
   
 db.collection("users").where('emailId','==',userId).get()
 .then(snapshot=>{
     snapshot.forEach((doc)=>{
         this.setState({
           
             userName:doc.data().firstName+ " "+doc.data().lastName
            })
        
     })
 })
}
getRecieverDetails(){
    db.collection('users').where('emailId','==',this.state.recieverId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                recieverName:doc.data().firstName,
                recieverContact:doc.data().contact,
                recieverAddress:doc.data().address
            })
        })
    })

}
componentDidMount(){
    this.getRecieverDetails
    this.getUserDetails(this.state.userId)
}
 addNotifications=()=>{
    var message=this.state.userName+ " has shown interest in donating the book"
    db.collection("Notifications").add({
        targetUserId:this.state.recieverId,
        donorId:this.state.userId,
        requestId:this.state.requestId,
        bookName:this.state.bookName,
        date:firebase.firestore.FieldValue.serverTimestamp(),
        notificationStatus:"unread",
        message:message
    })
 }

render(){
    return(
        <View>
            <View>
            <MyHeader
               title="Reciever Details"
               />    
            </View>
            <View>
                <Card>
                    <Text>Name:{this.state.bookName}</Text>
                </Card>
                <Card>
                    <Text>Reason:{this.state.requestReason}</Text>
                </Card>
            </View>
            <View>
                <Card title={"Reciever Information"}>
                <Card>
                    <Text>Name:{this.state.recieverName}</Text>
                </Card>
                <Card>
                    <Text>Contact:{this.state.recieverContact}</Text>
                </Card>
                <Card>
                    <Text>Address:{this.state.recieverAddress}</Text>
                </Card>
                </Card>
                <View>
                    {
                        this.state.recieverId!==this.state.userId
                        ?(
                            <TouchableOpacity onPress={()=>{
                                this.updateBookStatus()
                                this.addNotifications()
                                this.props.navigation.navigate('MyDonations')
                            }}>
                               <Text>I want to donate</Text>
                            </TouchableOpacity>
                        )
                        :null
                    }
                </View>
            </View>
        </View>
    )
}
   }