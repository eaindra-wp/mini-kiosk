// In App.js in a new project

import * as React from 'react';
// import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './src/Details'
import HomeScreen from './src/Home'
import CartScreen from './src/Cart';
import AuthScreen from './src/Auth';
import LoginScreen from './src/Auth-New';
import SignInScreen from './src/SignIn';
import UserProfileScreen from './src/UserProfile';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require('./assets/favicon.png')}
    />
  );
}

function App() {
  // console.log(SignInScreen.credentials);
  let initialRoute; 
  if(AsyncStorage.getItem("id") != null){
    initialRoute = "Home";
  }
  else{
    initialRoute = "SignIn";
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
        }}
        
      >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          title: 'My home',
          // headerTitle: props => <LogoTitle {...props} />
        }}
      />
      
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;