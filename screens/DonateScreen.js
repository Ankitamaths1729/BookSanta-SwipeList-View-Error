import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {ListItem} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

export default class DonateScreen extends React.Component {
constructor(){
    super()
    this.state={
     requestList:[]
    }
 this.requestRef=null
}

getRequestList=()=>{
 this.requestRef=db.collection('bookRequest') 
 .onSnapshot((snapshot)=>{
     var requestList=snapshot.docs.map(document=>document.data())
     console.log(requestList)
     this.setState({
         requestList:requestList
     })
 })
}

componentDidMount(){
    this.getRequestList()
}

componentWillUnmount(){
    this.requestRef=null
}

keyExtractor=(item,index)=>index.toString()

renderItem=({item,i})=>{
    return(
        <ListItem 
        key={i}
        title={item.bookName}
        subtitle={item.reasonToRequest}
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity 
            onPress={()=>{
                this.props.navigation.navigate("RecieverDetails",{"details":item})
            }}
            >
                <Text>
                    View
                </Text>
            </TouchableOpacity>
        }
        bottomDivider
        />
    )

}
 render(){
        return(
            <View style={{flex:1}}>
                 <MyHeader
               title="Donate Book"
               /> 
               <View style={{flex:1}}>
                   {
                       this.state.requestList.length===0
                       ?(
                           <View>
                               <Text>List of all requested books</Text>
                           </View>
                       )
                       :(
                           <FlatList
                           keyExtractor={this.keyExtractor}
                           data={this.state.requestList}
                           renderItem={this.renderItem}
                          />
                       )
                   }
               </View>
            </View>
        )
    }
}