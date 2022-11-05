import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack, {AuthStackParamsList} from './AuthStack';
import HomeStack, {HomeStackParamsList} from './HomeStack';

// import AuthStack from './StackNavigators/AuthStack';
// import {AUTH_STACK} from './screenNames';

const {Navigator, Screen} = createStackNavigator();

// get from redux state later;

export type RootStackParamsList = {
  AuthStack: AuthStackParamsList;
  HomeStack: HomeStackParamsList;
};

const RootNavigator = () => {
  return (
    <Navigator>
      <Screen
        name={'AuthStack'}
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Screen
        name={'HomeStack'}
        component={HomeStack}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default RootNavigator;
