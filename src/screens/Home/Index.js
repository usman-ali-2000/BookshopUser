import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import Styles from "./Style";
import FlatItem from "../../components/FlatItem/Index";
import { BaseUrl } from "../../assets/Data";

const Home = ({ navigation }) => {

    const [column, setColumn] = useState(2);
    const [data1, setData1] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/category`);
            const json = await response.json();
            console.log('json:', json);
            setData1(json);
        } catch (e) {
            console.log('error fetching...', e);
            // console.log('url:',`${BaseUrl}/register`);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    const renderItem = ({ item }) => (
        <View style={Styles.flatcontainer}>
            <FlatItem
                image={item.imageUrl}
                heading={item.category}
                onPress={()=>navigation.navigate('ProductView',{category: item.category})}
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
                <View style={Styles.header}>
                    <Image style={Styles.gear} source={require('../../assets/images/gear.png')} />
                </View>
            </Pressable>
            <Text style={Styles.heading}>Categories</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data1}
                keyExtractor={(item) => item.id}
                numColumns={column}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Home;