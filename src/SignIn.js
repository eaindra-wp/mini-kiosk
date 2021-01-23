import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, View, Text } from 'react-native';
import firebase from 'firebase';
import UserProfileScreen from './UserProfile';
import { useNavigation } from '@react-navigation/native';

import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-community/async-storage';

import firebaseConfig from './Firebase';
import AuthContext from './Auth';

firebase.initializeApp(firebaseConfig);


export default function SignInScreen() {

    WebBrowser.maybeCompleteAuthSession();
    const navigation = useNavigation();

    // const AuthContext = React.createContext();
    // const { signIn } = React.useContext(AuthContext);
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '469642911432-m9gvp76ehtbjv14pnanhecn1fl801q3c.apps.googleusercontent.com',

        androidClientId: '469642911432-b86o3aov18k704uhih2i3fbm7q27fnuj.apps.googleusercontent.com',
        webClientId: '469642911432-c6bo7il56sskjfm3og9uansu0vtj67h7.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
    });

    const { signIn } = React.useContext(AuthContext);
    const [id, setId] = React.useState('');
    // const {signIn} = React.useContext(AuthContext);

    React.useEffect(() => {
        if (response?.type === 'success') {

            const { authentication } = response;
            // console.log(authentication);

            const credential = firebase.auth.GoogleAuthProvider.credential(authentication);
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
                                .then(() => {
                                    // Write user info to local
                                    AsyncStorage.setItem('signedInAt', JSON.stringify(new Date()))
                                    AsyncStorage.setItem('id', user.uid);
                                    AsyncStorage.setItem('displayName', user.displayName);
                                    AsyncStorage.setItem('photoUrl', user.photoURL);
                                    AsyncStorage.setItem('email', user.email);
                                    
                                })
                        }
                        else {

                            // console.log("signed in with existing one" + result.docs.length);
                            // Write user info to local
                            AsyncStorage.setItem('signedInAt', JSON.stringify(new Date()));
                            AsyncStorage.setItem('id', result.docs[0].data().id)
                            AsyncStorage.setItem('displayName', result.docs[0].data().displayName)
                            AsyncStorage.setItem('photoUrl', result.docs[0].data().photoUrl)
                            AsyncStorage.setItem('email', result.docs[0].data().email)
                            // setId('SIGN_IN').then(() => setSignedIn());
                            signIn(result.docs[0].data());

                        }
                        
                        
                    }
                })
        }

    }, [response]);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text h2>Mini Kiosk</Text>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                    // setSignedIn();
                }}
            />
        </View>
    );
}
