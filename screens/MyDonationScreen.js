import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
  
import {Card,Icon,ListItem} from 'react-native-elements';
 import MyHeader from '../components/MyHeader.js' ;
import firebase from 'firebase'; import db from '../config.js';
import { FlatList } from 'react-native-gesture-handler';
  export default class MyDonationScreen extends Component{
      constructor(){
super()
this.state={
    userId:firebase.auth().currentUser.email,
    allDonation:[]
}
this.RequestRef=null
      }
      static navigationOptions = { header: null };

   getDonorDetails=(donorId)=>{
     db.collection("users").where("email_id","==", donorId).get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         this.setState({
           "donorName" : doc.data().first_name + " " + doc.data().last_name
         })
       });
     })
   }


      getAllDonations=()=>{
          this.RequestRef=db.collection('BookDonation').where("Donor_ID",'==',this.state.userId)
          .onSnapshot((snapshot)=>{
              var allDonation=snapshot.docs.map(document=>document.data());
              this.setState({
                allDonation:allDonation
              })
             
          })
      }

      sendBook=(bookDetails)=>{
        if(bookDetails.request_status === "Book Sent"){
          var requestStatus = "Donor Interested"
          db.collection("all_donations").doc(bookDetails.doc_id).update({
            "request_status" : "Donor Interested"
          })
          this.sendNotification(bookDetails,requestStatus)
        }
        else{
          var requestStatus = "Book Sent"
          db.collection("all_donations").doc(bookDetails.doc_id).update({
            "request_status" : "Book Sent"
          })
          this.sendNotification(bookDetails,requestStatus)
        }
      }
   
      sendNotification=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.request_id
        var donorId = bookDetails.donor_id
        db.collection("all_notifications")
        .where("request_id","==", requestId)
        .where("donor_id","==",donorId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var message = ""
            if(requestStatus === "Book Sent"){
              message = this.state.donorName + " sent you book"
            }else{
               message =  this.state.donorName  + " has shown interest in donating the book"
            }
            db.collection("all_notifications").doc(doc.id).update({
              "message": message,
              "notification_status" : "unread",
              "date"                : firebase.firestore.FieldValue.serverTimestamp()
            })
          });
        })
      }
   

      keyExtractor = (item, index) => index.toString()

      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.book_name}
            subtitle={"requestedBy:"+item.requestedby+"\nstatus:"+item.request_status}
            leftElement={<Icon name="book" type="font-awesome" color='grey'> 

            </Icon>}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={  styles.button} 
                onPress={()=>{
                  this.sendBook(item)
                }}
                >
                  <Text style={{color:'#ffff'}}>{item.request_status==="book sent"?"book sent":"send book"}</Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
      }
      render(){
          return(
              <View style={{flex:1}}>
            <MyHeader navigation={this.props.navigation} title="MyDonation"/>
            <View style={{flex:1}}> 
            {
                this.state.allDonation.length===0
                ?(
                    <View style={Styles.subtitle}> 
<Text style={{fontSize:20}}>
    List Of All Books Donation
</Text>
                    </View>
                )
:(
    <FlatList 
    keyExtractor={this.keyExtractor}
    data={this.state.allDonation}
    renderItem={this.renderItem}
    >

    </FlatList>
)

            }
            </View>    
              </View>
          )
      }
  }
  const styles=StyleSheet.create({
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },
        subtitle:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            fontSize:20,
            
        },
        
  })