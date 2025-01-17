import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home/Index';
import Detail from './src/screens/Detail/Index';
import Card from './src/screens/Card/Index';
import CardDetail from './src/screens/CardDetail/Index';
import Forums from './src/screens/Forums/Index';
import Surveys from './src/screens/Surveys/Index';
import NewsFeed from './src/screens/NewsFeed/Index';
import Settings from './src/screens/Settings/Index';
import PriavcyPolicy from './src/screens/PrivacyPolicy/Index';
import Terms from './src/screens/Terms/Index';
import ContactUs from './src/screens/ContactUs/Index';
import FAQs from './src/screens/FAQs/Index';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import AddCategory from './src/screens/AddCategory';
import Product from './src/screens/Product';
import ProductView from './src/screens/ProductView';
import Cart from './src/screens/Cart';
import Bill from './src/screens/Bill';
import MyOrders from './src/screens/MyOrders';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Card'
          component={Card}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CardDetail'
          component={CardDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Forums'
          component={Forums}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Surveys'
          component={Surveys}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NewsFeed'
          component={NewsFeed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Settings'
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PrivacyPolicy'
          component={PriavcyPolicy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Terms'
          component={Terms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ContactUs'
          component={ContactUs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddCategory'
          component={AddCategory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Product'
          component={Product}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProductView'
          component={ProductView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Cart'
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Bill'
          component={Bill}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MyOrders'
          component={MyOrders}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({})