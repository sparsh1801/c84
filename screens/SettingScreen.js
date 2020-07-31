import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,TextCopmponent} from 'react-native';
import MyHeader from '../components/MyHeader';
export default class  SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            firstName:"",
            lastName:"",
            contact:"",
            docId:'',

        }
    }
    getUserDetils(){
        var user=firebase.auth().currentUser;
        var email=usern.email
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_name,
                 lastName:data.last_name,
                contact:data.contact,
                addres:data.address,
                docId:doc.id
                })
            })
        })
    }
    render(){
        return(
            <View style={styles.container}> 
<MyHeader title="Settings" navigation={this.props.navigation}>

</MyHeader>
<View style={styles.formContainer}>
<TextInput
style={styles.formTextInput}
placeholder={"first name"}
maxLength={8}
onChangeText={(Text)=>{
    this.setState({
        firstName:text
    })
}}
value={this.state.firstName}
/>
<TextInput
style={styles.formTextInput}
placeholder={"last name"}
maxLength={8}
onChangeText={(Text)=>{
    this.setState({
        lastName:text
    })
}}
value={this.state.lastName}
/>
<TextInput
style={styles.formTextInput}
placeholder={"contact"}
maxLength={10}
keyboardType={'numeric'}
onChangeText={(Text)=>{
    this.setState({
        contact:text
    })
}}
value={this.state.contact}
/>
<TextInput
style={styles.formTextInput}
placeholder={"address"}
multiLine={true}
onChangeText={(Text)=>{
    this.setState({
       address:text
    })
}}
value={this.state.address}
/>
<TouchableOpacity style={styles.button} 
onPress={()=>{
    this.updateUserDetails()
}}
>
    <Text style={styles.buttonText}>
        Save
    </Text>
</TouchableOpacity>
</View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
justifyContent:'center',

    },
    formContainer:{
        flex:1,
        width:200,
        alignItems:'center'

    },
    formTextInput:{
        width:100,
        height:35,
        alignSelf:"center",
        borderColor:"#FFAB91",
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
    width:100,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderColor:"#FF5722",
    borderRadius:10,
    shadowColor:"black",
    shadowOffset:{
        width:0,
        height:8,
    },
shadowOpacity:0.33,
shadowRadius:10.32,
elevation:16,
marginTop:20,


    },
    buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:'white'
    }
})