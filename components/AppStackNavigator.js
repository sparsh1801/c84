import React from 'react';
import {createStackNaviagtor} from'react-navigation-Stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';

export const AppStackNavigator=createStackNaviagtor({
BookDonateList:{
    screen:BookDonateScreen,
    navigationOptions:{
        HeaderShown:false,
    }
},
RecieverDetails:{
    screen:RecieverDetailsScreen, 
    navigationOptions:{
        HeaderShown:false,
    }

}


},
{initialRouteName:'BookDonateList'}

)