import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

export default class MyDonations extends React.Component {
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[]
        }
    }
    getAllDonations=()=>{
        var requestRef=db.collection("allDonations").where('donorId','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonations=[]
            snapshot.docs.map((doc)=>{
                var donations=doc.data()
                donations['docId']=doc.id
                allDonations.push(donations)
            })
            this.setState({
                allDonations:allDonations
            })
        })
    }
         sendBook=(bookDetails)=>{
             if(bookDetails.requestStatus==="Donor Interested"){
                 var requestStatus="Book Sent"
                 db.collection("allDonations").doc(bookDetails.docId).update({
                     requestStatus:requestStatus
                 })
                 this.sendNotification(bookDetails.requestStatus)
             }

         }
}