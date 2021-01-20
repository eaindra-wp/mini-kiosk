import cartProducts from './CartProducts'
import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import addToCart from './AddToCart';

const CheckOut = () => {
    const navigation = useNavigation();
    const [cartBtn, enableBtn] = useState(0);
    const helperFunction = () =>
    {
        if (cartProducts.length > 0) {
            enableBtn(1);
        }
        else{
            enableBtn(0);
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {helperFunction(), 1000} );
        
        return () => {
            clearInterval(interval);
          };
    });
    
    if (cartBtn == 0) {
        return (
            <Button title="Check out!" disabled />
        )
    }
    else if (cartBtn == 1) {
        return (
            <Button title="Check out!"
                onPress={() => navigation.navigate("Cart")}
            />
        )
    }

}

export default CheckOut;