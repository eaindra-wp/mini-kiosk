// src/Product.js
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import setCart from './AddToCart';
import styles from './Styles'

function ProductScreen(props) {
    const navigation = useNavigation();
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (count <= 0) {
            setCount(0);
        }
    });
    
    return (
        <Card>
            {/* <Card.Image source={'https://vader-prod.s3.amazonaws.com/1543958419-810KAtkwn6L.jpg'}></Card.Image> */}
            <Card.Image source={{uri: props.product.photoUrl}}></Card.Image>
            {/* image={{ uri: 'https://vader-prod.s3.amazonaws.com/1543958419-810KAtkwn6L.jpg' }} */}
            <Text style={{ marginBottom: 10, marginTop: 20 }} h2>
                {props.product.name}
            </Text>
            <Text style={styles.price} h4>
                $ {props.product.price}
            </Text>


            <View style={styles.row}>
                {/* <Button
                    type="clear"
                    title='Add to Cart'
                    onPress={() => navigation.navigate('Cart', {
                        name: props.product.name,
                        price: props.product.price,
                        img: props.product.img,
                        quantity: props.product.quantity
                    })} /> */}
                
                <Text style={styles.description}>
                    {count}
                </Text>
                <Icon reverse
                    name='plus'
                    type='font-awesome'
                    color='#d85f0f'
                    size={15}
                    styles={styles.btnIcon}
                    onPress={() => {
                        const value = count + 1;
                        setCount(value);
                        setCart(props.product, "plus")
                    }}
                />
                <Icon reverse
                    name='minus'
                    type='font-awesome'
                    color='#d85f0f'
                    size={15}
                    styles={styles.btnIcon}
                    onPress={() => {
                        const value = count - 1;
                        setCount(value);
                        setCart(props.product, "minus")
                    }}

                />

            </View>
        </Card >
    );
}

export default ProductScreen;
