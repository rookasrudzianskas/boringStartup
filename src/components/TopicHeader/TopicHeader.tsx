//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";

const TopicHeader = ({title}: {title: string}) => {
    const navigation = useNavigation();
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#1D976C', '#93F9B9']}
            style={styles.background}
        >
            <View className="mt-10 relative h-[250px] mx-5 justify-end">
                <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-5 left-0" activeOpacity={0.7}>
                    <AntDesign name="closecircle" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-4xl font-bold text-gray-100 justify-center items-center">{title || 'Loading...'}</Text>
                <TouchableOpacity activeOpacity={0.7} className="">
                    <Text className="text-xl font-semibold text-white">JS 1.01</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default TopicHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.white,
        flex: 1,
        padding: 20,
    },
    background: {
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1,
        marginTop: 20,
        marginBottom: 25,
        marginTop: 10
    }
});
