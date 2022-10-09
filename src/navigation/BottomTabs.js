import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Products from '../screens/Products';
import Shop from '../screens/Shop';
import Login from '../screens/Login';
export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Homes') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Products') {
            iconName = focused ? 'restaurant-outline' : 'restaurant-sharp';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'ios-cart' : 'ios-cart';
          } else if (route.name === 'Account') {
            iconName = focused
              ? 'person-circle-outline'
              : 'person-circle-sharp';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Homes" component={Home} />
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Login} />
    </Tab.Navigator>
  );
}
