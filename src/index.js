import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import BottomTabs from './navigation/BottomTabs';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Login from './screens/Login';
import {COLORS} from './config';
import Payment from './screens/Payment';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Register from './screens/Register';

function AppContainer() {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Accept'] = 'application/json';
  const [token, setToken] = useState('');
  const tokens = async () => {
    const data = await AsyncStorage.getItem('token');
    setToken(data);
  };
  useEffect(() => {
    tokens();
  }, []);
  axios.defaults.headers.common['token'] = 'Bearer ' + token;
  console.log('token', axios.defaults.headers.common['token']);

  const Stack = createStackNavigator();
  const {isLogin, user} = useSelector((state) => state.app.auth);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {isLogin && Object.keys(user).length !== 0 ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={BottomTabs} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Payment" component={Payment} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppContainer;
