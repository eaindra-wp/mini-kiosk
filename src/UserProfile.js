import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image } from 'react-native';



function UserProfileScreen() {

  const [credential, setCredential] = useState({});

  const getCredentials = async () => {

    const name = await AsyncStorage.getItem("displayName");
    const photoUrl = await AsyncStorage.getItem('photoUrl');
    const email = await AsyncStorage.getItem('email');
    console.log(await AsyncStorage.getItem("displayName"));
    const credential = {name: name, photoUrl: photoUrl, email: email};
    setCredential(credential);
  }

  useEffect(() => {
    getCredentials();
  }, []);

  const navigation = useNavigation();
  // console.log(credential);
  return (
   
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>User Profile Screen</Text>
      <Text>Name: {credential.name}</Text>
      <Text>Email: {credential.email}</Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={{uri: credential.photoUrl}}
      />
      <Button style={{ marginBottom: 10, marginTop: 20 }} title="Go to Home"
        onPress={() => navigation.navigate('AppStack')} />

      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

export default UserProfileScreen;