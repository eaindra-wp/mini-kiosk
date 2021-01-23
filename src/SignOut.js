import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button, View, Text, Alert } from 'react-native';
import firebase from 'firebase';
import UserProfileScreen from './UserProfile';
import { useNavigation } from '@react-navigation/native';

import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles';
import  AuthContext   from './Auth';

import firebaseConfig from './Firebase';

export default function SignOutScreen() {
    // const clearCredential = async () => {
    //     await AsyncStorage.clear();
    //     console.log(await AsyncStorage.getItem("displayName"));
    // }
    const navigation = useNavigation();

    const {signOut} = React.useContext(AuthContext);
    const createTwoButtonAlert = () =>
        Alert.alert(
            "Warning",
            "Are you sure to sign out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        firebase.auth().signOut().then(async () => {
                            AsyncStorage.clear();
                            signOut();
                        })
                        
                    }
                }
            ],
            { cancelable: false }
        );
    return (
        <View style={styles.row}>
            <Button title={"Sign Out Button"} onPress={createTwoButtonAlert} />
        </View>
    );
}