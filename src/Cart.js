import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import cartProducts from './CartProducts';
import styles from './Styles'
import loadTotalPrice from './TotalPriceInCart';

function CartScreen() {
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
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <ScrollView
                style={{
                    flexGrow: 1,
                    width: "100%",
                    height: "100%",

                }}>
                <View style={styles.cartView}>
                    <Text h2> Customer Name: {credential.name}</Text>
                    <View style={styles.cartTableHeader}>
                        <View style={styles.cartTableNormalCell}>
                            <Text style={{ fontWeight: 'bold' }}>Product Name </Text>
                        </View>
                        <View style={styles.cartTableNormalCell}>
                            <Text style={{ fontWeight: 'bold' }}>Total Quantity</Text>
                        </View>
                        <View style={styles.cartTableNormalCell}>
                            <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
                        </View>
                    </View>
                    {
                        cartProducts.map((product, index) => {
                            return (
                                <View style={styles.cartProductView} key={index}>
                                    <View style={styles.cartTableNormalCell}>
                                        <Text style={{ fontWeight: 'bold' }}>{product.name} </Text>
                                    </View>
                                    <View style={styles.cartTableNormalCell}>
                                        <Text >{product.quantity} </Text>
                                    </View>
                                    <View style={styles.cartTableNormalCell}>
                                        <Text >{product.quantity * product.price} </Text>
                                    </View>
                                   
                                </View>
                            )

                        })
                    }
                    <View style={styles.cartTableNormalCell}>
                        <Text >{loadTotalPrice()} </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default CartScreen;