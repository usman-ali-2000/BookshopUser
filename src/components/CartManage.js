import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to get the cart from AsyncStorage
export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem('cart');
    return cart != null ? JSON.parse(cart) : [];
  } catch (error) {
    console.log('Error getting cart:', error);
    return [];
  }
};

// Helper function to save the cart to AsyncStorage
const saveCart = async (cart) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.log('Error saving cart:', error);
  }
};

// Add product to cart or update quantity if it already exists
export const addToCart = async (product) => {
  const cart = await getCart();
  const index = cart.findIndex(item => item.id === product.id);

  if (index >= 0) {
    // If product already exists, update quantity
    cart[index].qty += 1;
  } else {
    // Otherwise, add new product to the cart
    cart.push({ ...product, qty: 1 });
  }

  await saveCart(cart);
};

// Increment product quantity
export const incrementQty = async (productId) => {
  const cart = await getCart();
  const index = cart.findIndex(item => item.id === productId);

  if (index >= 0) {
    cart[index].qty += 1;
    await saveCart(cart);
  }
};

// Decrement product quantity
export const decrementQty = async (productId) => {
  const cart = await getCart();
  const index = cart.findIndex(item => item.id === productId);

  if (index >= 0 && cart[index].qty > 1) {
    cart[index].qty -= 1;
    await saveCart(cart);
  } else if (index >= 0 && cart[index].qty === 1) {
    cart.splice(index, 1);  // Remove item if qty reaches 0
    await saveCart(cart);
  }
};

// Remove product from the cart
export const removeFromCart = async (productId) => {
  const cart = await getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  await saveCart(updatedCart);
};
