import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { getCart } from '../components/CartManage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '../assets/Data';

const Bill = () => {
    const [cart, setCart] = useState([]); // Start with an empty array
    const [totalAmount, setTotalAmount] = useState(0);

    // Fetch the cart data from AsyncStorage
    const fetchCart = async () => {
        try {
            const data = await getCart(); // Assuming getCart is properly defined in CartManage
            console.log('Cart data fetched:', data);
            setCart(data); // Set the fetched cart data to the state
        } catch (e) {
            console.log('Error fetching cart:', e);
        }
    };

    // Calculate total amount whenever the cart changes
    useEffect(() => {
        if (cart && cart.length > 0) {
            const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
            setTotalAmount(total);
        }
    }, [cart]);

    // Render each cart item
    const renderItem = ({ item }) => (
        <View style={styles.billItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Product: {item.product}</Text>
                <Text>Price: ${item.price}</Text>
                <Text>Quantity: {item.qty}</Text>
                <Text>Item Total: ${item.price * item.qty}</Text>
            </View>
        </View>
    );

    // Load the cart when the component mounts
    useEffect(() => {
        fetchCart();
    }, []);

    
    const postCartData = async () => {
        const email = await AsyncStorage.getItem('email');
        //  console.log('email:', email);
    
        if(!email){
            return;
        }

        try {
          const response = await fetch(`${BaseUrl}/cart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',  // Tell the server that you're sending JSON
            },
            body: JSON.stringify({
              email: email,
              items: cart,
            }),
          });
      
          const data = await response.json();
          
          if (response.ok) {
            // Cart created successfully
            console.log('Cart created:', data);
          } else {
            // Handle error response
            console.error('Failed to create cart:', data);
          }
        } catch (error) {
          console.error('Error posting cart data:', error);
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.billHeading}>Bill Summary</Text>

            {/* Render the cart items */}
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Amount: ${totalAmount}</Text>
            </View>
            <Button text="Confirm" onPress={postCartData} />
        </View>
    );
};

export default Bill;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
    },
    billHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    billItem: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
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
    totalContainer: {
        marginTop: 20,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});
