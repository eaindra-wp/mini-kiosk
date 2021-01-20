import React, {useState, useEffect} from 'react';
import { Button, View, Text, Image } from 'react-native';

function UserProfileScreen({ route, navigation }) 
{
    const { name, email, photoUrl } = route.params;
    localStorage.clear();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User Profile Screen</Text>
        <Text>Name: {JSON.stringify(name)}</Text>
        <Text>Email: {JSON.stringify(email)}</Text>
        <Image
          style={{ width: 200, height: 200 }}
          source={photoUrl}
        />
        <Button style={{ marginBottom: 10, marginTop: 20 }} title="Go to Home"
         onPress={() => navigation.navigate('Home')} />
         
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
      </View>
    );
}

export default UserProfileScreen;