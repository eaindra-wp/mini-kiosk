import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductScreen from './Product'
import styles from './Styles'
import CheckOut from './CheckOut'
import firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';


function HomeScreen({ navigation }) {

  const [productsList, setProductsList] = useState([]);
  const ref = firebase.firestore().collection('items');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { name, price, photoUrl } = doc.data();
        list.push({
          id: doc.id,
          name,
          price,
          photoUrl,
        });
      });
      setProductsList(list);

      // if (loading) {
      //   setLoading(false);
      // }
    });
  }, []);

  console.log(AsyncStorage.getItem("id"));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flexGrow: 0,
          width: "100%",
          height: "100%",
          marginBottom: 40
        }}>
        {
          productsList.map((product, index) => {

            return (
              <View style={styles.row} key={index}>
                <View style={styles.col}>
                  <ProductScreen product={product} />
                </View>
              </View>
            )

          })
        }
      </ScrollView>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <CheckOut />
      </View>
    </View>
  );
}
export default HomeScreen;