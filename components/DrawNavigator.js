import {createDrawerNavigator} from 'react-navigation-drawer';
import SettingsScreen from '../screens/SettingsScreen';
import SideBar from './SideBar';
import {TabNavigator} from './TabNavigator';
import NotificationScreen from '../screens/NotificationScreen';

export const DrawNavigator = createDrawerNavigator({
    Home:{
        screen:TabNavigator
    },
    Settings:{
        screen:SettingsScreen
    },
    Notification:{screen:NotificationScreen}
},
{
    contentComponent:SideBar
},{
    initialRouteName:'Home'
})