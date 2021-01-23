// In App.js in a new project

import * as React from 'react';
// import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DetailsScreen from './src/Details'
import HomeScreen from './src/Home'
import CartScreen from './src/Cart';
import SignInScreen from './src/SignIn';
import UserProfileScreen from './src/UserProfile';
import SignOutScreen from './src/SignOut';
import AuthContext from './src/Auth';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName={HomeScreen}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My home',
          // headerTitle: props => <LogoTitle {...props} />
        }}
      />

      {/* <Drawer.Screen name="SignIn" component={SignInScreen} /> */}
      {/* <Drawer.Screen name="Details" component={DetailsScreen} /> */}
      <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
      <Drawer.Screen name="SignOut" component={SignOutScreen} />
      {/* <Drawer.Screen name="Cart" component={CartScreen} /> */}
    </Drawer.Navigator>
  )
}

function App() {

  // const AuthContext = AuthContext;
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      console.log(foundUser);
      const userToken = String(foundUser.id);

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'SIGN_IN', token: userToken });
    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'SIGN_OUT' });
    },
  }), []
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('id');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  console.log(AsyncStorage.getItem('userToken'));
  // console.log(authContext);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator
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
          {state.userToken == null ?
            (<Stack.Screen name="SignIn" component={SignInScreen} />) :
            (
              <>
                <Stack.Screen name="AppStack" component={AppDrawer} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
              </>
            )}



        </Stack.Navigator>
      </NavigationContainer >
    </AuthContext.Provider>
  );
}

export default App;

