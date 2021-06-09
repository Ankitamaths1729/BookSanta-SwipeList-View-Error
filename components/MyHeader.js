import React from 'react';
import {Header,Icon} from 'react-native-elements';

const MyHeader= props=>{
    return(
        <Header
        centerComponent={{text:props.title,style:{color:'orange',fontSize:20,fontWeight:'bold'}}}
        backgroundColor='grey'
        />
    )
}

export default MyHeader;