//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";

const TopicNode = () => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container}>
            <View style={styles.circle}>
                <Image style={styles.image} />
            </View>
            <Text style={styles.title}>Variables</Text>
        </TouchableOpacity>
    );
};

export default TopicNode;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10
    },
    circle: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 50,
        backgroundColor: Colors.light.tertiary,
    },
    image: {

    },
    title: {
        marginVertical: 5,
        fontSize: 16,
        fontWeight: '600',
    }
});
