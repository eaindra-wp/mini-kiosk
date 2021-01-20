import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductScreen from './Product'
import styles from './Styles'
import CheckOut from './CheckOut'


const productsFromDB = [
  {
    id: 101,
    name: 'Khaki Suede Polish Work Boots',
    price: 149.99,
    img: '../assets/chocolates.jpeg',
  },
  {
    id: 102,
    name: 'Camo Fang Backpack Jungle',
    price: 39.99,
    img: '../assets/snacks.jpeg',
  },
  {
    id: 103,
    name: 'Parka and Quilted Liner Jacket',
    price: 49.99,
    img: '../assets/notebooks.jpeg',
  },
  {
    id: 104,
    name: 'Cotton Black Cap',
    price: 12.99,
    img: '..assets/feminine-products.jpeg',
  },
];

function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flexGrow: 0,
          width: "100%",
          height: "100%",
        }}>
        {
          productsFromDB.map((product, index) => {

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
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: -35 }}>
        <CheckOut/>
      </View>
    </View>
  );
}
export default HomeScreen;