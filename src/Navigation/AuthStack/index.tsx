import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../Screens/Auth/Login';

const {Navigator, Screen} = createStackNavigator();
export type AuthStackParamsList = {
  LogIn: undefined;
};

const AuthStack = () => {
  return (
    <Navigator>
      <Screen name={'LogIn'} component={Login} />
    </Navigator>
  );
};

export default AuthStack;
