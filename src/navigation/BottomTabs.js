import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Login from '../screens/Login';
import Blogs from '../screens/Blogs';
export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Homes') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Blogs') {
            iconName = focused ? 'ios-film-outline' : 'ios-film-sharp';
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
      <Tab.Screen name="Blogs" component={Blogs} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Login} />
    </Tab.Navigator>
  );
}
