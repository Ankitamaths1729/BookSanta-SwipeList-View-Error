import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DonateScreen from '../screens/DonateScreen';
import RequestScreen from '../screens/RequestScreen';
import {AppStackNavigator} from './stackNavigator';

export const TabNavigator=createBottomTabNavigator({
    Donate:{screen:AppStackNavigator},
    Request:{screen:RequestScreen}
})

