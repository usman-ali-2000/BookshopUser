import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import FlatItem from "../components/FlatItem/Index";
import { BaseUrl } from "../assets/Data";
import Styles from "./Home/Style";
import CustomModal from "../components/Modal";
import { addToCart, getCart } from "../components/CartManage";

const ProductView = ({ navigation, route }) => {

    const [column, setColumn] = useState(2);
    const [data1, setData1] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const name = route.params.category;

    const fetchData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/productCreate`);
            const json = await response.json();
            const productGet = await json.filter((item) => item.category === name);
            console.log('json:', productGet);
            setData1(productGet);


            const cart = await getCart();
            console.log('cart:', cart);
        } catch (e) {
            console.log('error fetching...', e);
            // console.log('url:',`${BaseUrl}/register`);
        }
    }

    const handleModalData = (id, image, product, price, title) => {
        setModalData({
            id: id,
            image: image,
            product: product,
            price: price,
            title: title,
        });
        addToCart({
            id: id,      // Make sure the product has a unique ID
            image: image,
            product: product,
            price: price,
            title: title,
            qty: 1,
        })
        setModal(!modal);
        console.log('image:', modalData.image);
    }



    useEffect(() => {
        fetchData();
    }, []);



    const renderItem = ({ item }) => (
        <View style={Styles.flatcontainer}>
            <FlatItem
                image={item.imageUrl}
                heading={item.product}
                price={item.price}
                onPress={() => handleModalData(item._id, item.imageUrl, item.product, item.price, item.category)}
            // text={item.text}
            // lastupdate={item.lastupdate}
            // onpress={() => handleLearnMore()}
            />
        </View>
    );

    const handleLearnMore = () => {
        navigation.navigate('Detail');
    }

    useEffect(() => {
        // console.log('data:', Data);
    }, [])

    return (
        <View style={Styles.container}>
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={Styles.header}>
                    <Image style={Styles.gear} source={require('../assets/images/cart.png')} />
                </TouchableOpacity>
            </Pressable>
            <Text style={Styles.heading}>Products</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data1}
                keyExtractor={(item) => item.id}
                numColumns={column}
                renderItem={renderItem}
            />
            <CustomModal
                isVisible={modal}
                onClose={() => setModal(!modal)}
                title={modalData?.title}
                image={modalData?.image}
                product={modalData?.product}
                price={modalData?.price}
            />
        </View>
    )
}

export default ProductView;