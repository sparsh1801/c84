import React from 'react';
import {Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class RecieverDetailsScreen extends Component{
constructor(){
    super();
    this.state={
        userID:firebase.auth().currentUser.email,
        recieverID:this.props.navigation.getParam('details')["user_id"],
        requestID:this.props.navigation.getParam('details')["request_id"],
        BookName:this.props.navigation.getParam('details')["book_name"],
        Reason_For_Requesting:this.props.navigation.getParam('details')["reason_to_request"],
        recieverName:'',
        recieverContact:'',
        recieverAddress:'',
        recieverRequestDocID:'',

    }
}
addNotification=()=>{
  var message = this.state.userName + " has shown interest in donating the book"
  db.collection("all_notifications").add({
    "targeted_user_id"    : this.state.recieverId,
    "donor_id"            : this.state.userId,
    "request_id"          : this.state.requestId,
    "book_name"           : this.state.bookName,
    "date"                : firebase.firestore.FieldValue.serverTimestamp(),
    "notification_status" : "unread",
    "message"             : message
  })
}

getRecieverDetails(){
    db.collection('users').where('email_id','==',this.state.recieverID).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
        this.setState=({
            recieverName:doc.data().first_name,
            recieverContact:doc.data().contact,
            recieverAddress:doc.data().Address,
        })
    })
})
db.collection('requested_books').where('request_id','==',this.state.requestID).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
    this.setState=({
        recieverRequestDocID:doc.id
})
    }
    )
}
)
}
UpdateBookStatus=()=>{
    db.collection('all_donation').add({
        book_name:this.state.BookName,
        request_ID:this.state.request_ID,
        requested_by:this.state.recieverName,
        donor_id:this.state.userID,
        request_status:"donor is intrested"
    })
}
render(){
    return(
        <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Book Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBookStatus()
                    this.addNotification()
                    this.props.navigation.navigate('MyDonations')
                  }}>
                <Text>I want to Donate</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
    
}
}
const Styles=StyleSheet.create({
container:{
flex:1,

},
buttonContainer:{
  flex:0.3,
  justifyContent:'centre',
  alignItem:'centre',

},
button:{
  width:200,
  height:50,
  justifyContent:'centre',
  alignItem:'centre',
  borderRadius:10,
  backgroundColor:'orange',
  shadowColor:'black',
  shadowOffset:{
    width:0,
    height:8
  },
  elevation:16,
},


})
