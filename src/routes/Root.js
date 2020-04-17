import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import BaseNavigation from './BaseNavigator';
import NavigationService from './NavigationService';

const AppNavigatorWrapper = (props) => {
  const AppNavigator = createAppContainer(
    createStackNavigator(
      {
        home: {
          screen: BaseNavigation,
        },
      },
      {
        initialRouteName: 'home',
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
