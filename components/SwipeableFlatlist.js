import React from 'react';
import { render } from 'react-dom';
import { Dimensions } from 'react-native';
import { View,StyleSheet,Text } from 'react-native';
import { RecyclerViewBackedScrollViewComponent,Animated } from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            allNotifications:this.props.allNotifications
        }
    }
    
    updateAsRead=notifications=>{
        db.collection('Notifications')
        .doc(notifications.docId)
        .update({
            notificationStatus:"Read"
        })
    }
    onSwipeValueChange=swipeData=>{
        var allNotifications=this.state.allNotifications
        const {key,value} =swipeData
        if (value<-Dimensions.get("window").width){
           const newData= [...allNotifications]
            const prevIndex= allNotifications.findIndex(item=> item.key===key)
            this.updateAsRead(allNotifications[key])
            newData.splice(prevIndex,1)
            this.setState({allNotifications:newData})
        }
    }
     
    renderItem =data=>(
        <Animated.View>
            <ListItem
            leftElement={<Icon name="book" type="font-awesome" color='#696969'/> }
            title={data.item.bookName}
            titleStyle={{color:"black",fontWeight:"bold"}}
            subtitle={data.item.message}
            bottomDivider
            />
        </Animated.View>
    )

renderHiddenItem=()=>(
    <View style={styles.rowBack}>
        <View style={styles.backRightButton}>
            <Text style={styles.backTextWhite}>
                markAsRead
            </Text>
        </View>
    </View>
);
render(){
    return(
        <View style={styles.container}>
            <SwipeListView
            disableRightSwipe
            data={this.state.allNotifications}
            renderItem={this.renderItem}
            renderHiddenItem={this.renderHiddenItem}
            rightOpenValue={-Dimensions.get("window").width}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onSwipeValueChange={this.onSwipeValueChange}
            keyExtractor={(item,index)=>index.toString()}
            />
        </View>
    )
}
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
    },
    backTextWhite:{
        color:"white",
        fontWeight:"bold",
        fontSize:15,
        textAlign:"center",
        alignSelf:"flex-start",
    },
    rowBack:{
        alignItems:"center",
        backgroundColor:"blue",
        flexDirection:"row",
        flex:1,
        justifyContent:"space-between",
        paddingLeft:15,
    },
    backRightButton:{
        alignItems:"center",
        bottom:0,
        justifyContent:"center",
    },
})