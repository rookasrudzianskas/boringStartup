//@ts-nocheck
import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";
import {AntDesign} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";

const gradients = [
    ['#FFA17F', '#00223E55'],
    ['#FF5F6D', '#FFC37155'],
    ['#FF9966', '#FF5E6255'],
    ['#FF4B2B', '#FF416C55'],
    // green gradient
    ['#11998e', '#38ef7d55'],
    // blue gradient
    ['#00c6ff', '#0072ff55'],
    // purple gradient
    ['#8e2de2', '#4a00e055'],
    // yellow gradient
    ['#f5af19', '#f1271155'],
    // black gradient
    ['#1D976C', '#93F9B955'],
];


const TopicHeader = ({title, id}: {title: string, id: string}) => {
    const navigation = useNavigation();

    const kindaRandomNumber = (seed: string, max: number) => {
        return Math.floor(seed.split("").reduce((n, c) => n + c.charCodeAt(0), 0) % gradients.length);
    }

    const gradient = useMemo(() => {
        return gradients[kindaRandomNumber(id, gradients.length)];
    }, [title]);

    return (
        <LinearGradient
            // Background Linear Gradient
            colors={gradient}
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
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
