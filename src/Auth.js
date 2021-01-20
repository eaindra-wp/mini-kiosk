import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';


async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '469642911432-v7ibjai7rmeetef5if4l9hdohg4qrheo',
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

export default async function AuthScreen() {

    const onPress = () => {
        signInWithGoogleAsync();
        // if (user) {
        //     signOutAsync();
        // } else {
        //     signInAsync();
        // }
    };


    return (<Text onPress={onPress()}>Toggle Auth</Text>);

}
