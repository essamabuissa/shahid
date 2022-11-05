import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ItemDetails from '../../Screens/Home/ItemDetails';
import Favorites from '../../Screens/Home/Favorites';
import ItemsList from '../../Screens/Home/ItemsList';

const {Navigator, Screen} = createStackNavigator();

export type HomeStackParamsList = {
  ItemsList: undefined;
  ItemDetails: undefined;
  Favorites: undefined;
};

const HomeStack = () => {
  return (
    <Navigator>
      <Screen
        name={'ItemsList'}
        component={ItemsList}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name={'ItemDetails'}
        component={ItemDetails}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Screen name={'Favorites'} component={Favorites} />
    </Navigator>
  );
};

export default HomeStack;
