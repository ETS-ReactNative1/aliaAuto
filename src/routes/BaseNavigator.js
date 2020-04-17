import React from 'react';
import HomeScreen from '../screens/Home';
import FavorisScreen from '../screens/Favoris';
import ChatScreen from '../screens/Chat';
import AddScreen from '../screens/Add';
import MyAnnonces from '../screens/MyAnnonces';

import {Routes} from './navigationRoutes';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Feather from 'react-native-vector-icons/Feather';
import AddButton from '../components/AddButton';

const BaseNavigation = createBottomTabNavigator(
  {
    [Routes.TabHome]: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Feather name="grid" size={18} color={tintColor} />
        ),
      }),
    },
    [Routes.TabMyAnnonces]: {
      screen: MyAnnonces,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Feather name="clipboard" size={18} color={tintColor} />
        ),
      }),
    },
    [Routes.TabAdd]: {
      screen: AddScreen,
      navigationOptions: () => ({
        tabBarIcon: <AddButton />,
      }),
    },
    [Routes.TabFavoris]: {
      screen: FavorisScreen,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Feather name="heart" size={18} color={tintColor} />
        ),
      }),
    },
    [Routes.TabChat]: {
      screen: ChatScreen,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Feather name="message-square" size={18} color={tintColor} />
        ),
      }),
    },
  },
  {
    initialRouteName: Routes.TabHome,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#76EF4D',
      inactiveTintColor: '#ffffff',
      style: {
        backgroundColor: '#ffffff',
        height: 80,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderTopWidth: 0,
        shadowOpacity: 0.29,
        shadowRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {height: 3, width: 0},
        elevation: 12,
      },
      tabStyle: {},
    },
  },
);

export default BaseNavigation;
