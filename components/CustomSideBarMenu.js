import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert, StyleSheet,TouchableOpacity} from 'react-native';
import {DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{ 
render(){
    return(
        <View style = {{flex:1}}>
<View style={styles.DrawerItemContainer}> 
    <DrawerItems {...this.props}>

    </DrawerItems>

</View>

<View style={styles.logoutContainer}>
<TouchableOpacity style={styles.logoutButton} onPress={()=>{
    this.props.navigation.navigate('WelcomeScreen')
    firebase.auth().signOut()
}}>
<Text>logout</Text>
</TouchableOpacity>
</View>
        </View>
    )
}
}
const styles=StyleSheet.create({
    DrawerItemContainer:{
        flex:0.8,
    
    },
    logoutContainer:
    {
        flex:0.2,
        justifyContent:'flex-end',
        paddingBottom:30,
    },
    logoutButton:
    {
    height:30,
    width:'100%',
    justifyContent:'centre',
    padding:30,
    }
})

