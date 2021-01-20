import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { name, price, img, quantity } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>name: {JSON.stringify(name)}</Text>
      <Text>price: {JSON.stringify(price)}</Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={img}
      />
      <Text>quantity: {JSON.stringify(quantity)}</Text>
      <Button style={{ marginBottom: 10, marginTop: 20 }} title="Go to Home"
       onPress={() => navigation.navigate('Home')} />
       
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
export default DetailsScreen;