import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header/Index';
import Button from '../components/Button';
import theme from '../Theme/GlobalTheme';
import { useNavigation } from '@react-navigation/native';
import { BaseUrl } from '../assets/Data';

// Function to get the cart from AsyncStorage
const getCart = async () => {


    try {
        const cartData = await AsyncStorage.getItem('cart');
        return cartData != null ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Failed to load cart:', error);
        return [];
    }
};

// Function to update the cart in AsyncStorage
const updateCart = async (newCart) => {
    try {
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
        console.error('Failed to update cart:', error);
    }
};

const Cart = () => {
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);

    // Load cart data on component mount
    useEffect(() => {
        const loadCart = async () => {
            const storedCart = await getCart();
            setCart(storedCart);
        };
        loadCart();
    }, []);

    // Function to increment quantity
    const incrementQty = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, qty: item.qty + 1 };
            }
            return item;
        });
        setCart(updatedCart);
        updateCart(updatedCart); // Update in AsyncStorage
    };

    // Function to decrement quantity
    const decrementQty = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.qty > 1) {
                return { ...item, qty: item.qty - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        updateCart(updatedCart); // Update in AsyncStorage
    };

    // Render each cart item
    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Product: {item.product}</Text>
                <Text>Price: ${item.price}</Text>
                <Text>Quantity: {item.qty}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => decrementQty(item.id)} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => incrementQty(item.id)} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <View style={{flexDirection:'column', width:'100%'}}>
            <Header text="Cart" onpress={()=>navigation.goBack()}/> 
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <Button text="Confirm" onPress={()=>navigation.navigate('Bill')}/>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        backgroundColor: theme.colors.blue,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        height: 50,
        // width:30, 
        // borderRadius:30,
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
