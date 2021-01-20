import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-google-app-auth';
import { Button, View, Text } from 'react-native';
import firebase from 'firebase';
import UserProfileScreen from './UserProfile';
import { useNavigation } from '@react-navigation/native';

import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-community/async-storage';

// import Expo from "expo";

import firebaseConfig from './Firebase';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

firebase.initializeApp(firebaseConfig);


export default function SignInScreen() {

    WebBrowser.maybeCompleteAuthSession();

    const navigation = useNavigation();
    const [signedIn, setSignedIn] = useState(false);
    const [credentials, setCredentials] = useState({});

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: '469642911432-c6bo7il56sskjfm3og9uansu0vtj67h7.apps.googleusercontent.com',
        },
    );

    React.useEffect(() => {
        // console.log(localStorage.getItem('displayName'));
        if (response?.type === 'success') {
            const { id_token } = response.params;

            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            firebase.auth().signInWithCredential(credential)
                .then(async result => {
                    let user = result.user
                    if (user) {
                        const result = await firebase.firestore()
                            .collection('users')
                            .where('id', '==', user.uid)
                            .get()

                        if (result.docs.length === 0) {
                            // Set new data since this is a new user
                            firebase.firestore()
                                .collection('users')
                                .doc(user.uid)
                                .set({
                                    id: user.uid,
                                    displayName: user.displayName,
                                    photoUrl: user.photoURL,
                                    email: user.email
                                })
                                .then(data => {
                                    // Write user info to local
                                    AsyncStorage.setItem('id', user.uid);
                                    AsyncStorage.setItem('displayName', user.displayName);
                                    localStorage.setItem('photoUrl', user.photoURL);
                                    localStorage.setItem('email', user.email);
                                })
                        }
                        else {
                            // Write user info to local
                            AsyncStorage.setItem('id', result.docs[0].data().id)
                            AsyncStorage.setItem('displayName', result.docs[0].data().displayName)
                            AsyncStorage.setItem('photoUrl', result.docs[0].data().photoUrl)
                            AsyncStorage.setItem('email', result.docs[0].data().email)

                        }
                        setSignedIn(true);
                        setCredentials({id: user.uid, 
                            name: user.displayName, photoUrl: user.photoURL, email: user.email})

                        // navigation.navigate("UserProfile",
                        //     {
                        //         name: localStorage.getItem("displayName"), 
                        //         email: localStorage.getItem("email"), 
                        //         photoUrl: localStorage.getItem("photoUrl")
                        //     });
                        navigation.navigate("Home");
                        // console.log(localStorage.getItem('displayName'));
                    }
                })
        }
        
    }, [response]);
    // console.log(AsyncStorage.getItem('displayName'));
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text h2>Mini Kiosk</Text>
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
        />
        </View>
    );
}
