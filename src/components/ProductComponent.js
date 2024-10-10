import React from 'react';
import { View, Button, Text } from 'react-native';
import { addToCart } from './CartManage';

const ProductComponent = ({ product }) => {

  const handleAddToCart = async () => {
    await addToCart(product);  // Add product to cart
    alert(`${product.product} added to cart`);
  };

  return (
    <View>
      <Text>{product.product} - ${product.price}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

export default ProductComponent;
