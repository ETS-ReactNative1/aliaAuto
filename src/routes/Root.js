import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import BaseNavigation from './BaseNavigator';
import NavigationService from './NavigationService';
import SignInScreen from '../screens/SignIn';

const AppNavigatorWrapper = (props) => {
  const AppNavigator = createAppContainer(
    createStackNavigator(
      {
        auth: {
          screen: SignInScreen,
        },
        home: {
          screen: BaseNavigation,
        },
      },
      {
        initialRouteName: 'auth',
        headerMode: 'none',
        mode: 'card',
        defaultNavigationOptions: {
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: false,
        },
      },
    ),
  );

  return (
    <AppNavigator
      ref={(navigationRef) => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}
      theme={props.theme}
    />
  );
};

export default AppNavigatorWrapper;
