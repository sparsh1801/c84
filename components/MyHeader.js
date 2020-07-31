import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';

export default class MyHeader extends Component{
  constructor(props){
    super(props);
    this.state={
      value:''
    }
  }
  getNumberofUnreadNotifications(){
db.collection("all_notifications").where("notification_status","==", "unread")
.onSnapshot((snapshot)=>{
  var unreadNotification=snapshot.docs.map((doc)=>{
    doc.data()
  })
  this.setState({
    value:unreadNotification.length
  })
})
  }
  componentDidMount(){
    this.getNumberofUnreadNotifications()
  }

 bellIconwithBadge=(props)=>{
return(
<View> 
<Icon name="bell" type="font-awesome" color="#696969" size={25} onPress={()=>props.navigation.navigate("Notification")}></Icon>
<Badge  value={this.state.value} containerStyle={{position:'absolute',top:-4,right:-4}}/>
</View>  
)
}
render(){
  return (
    <Header
    leftComponent = {<Icon name="bars" type="font-awesome" color="#696969" onPress={()=>props.navigation.toggleDrawer()}></Icon>}
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
    rightComponent={<bellIconwithBadge {...props}>

    </bellIconwithBadge>}
      backgroundColor = "#eaf8fe"
    />

  );
};
}

