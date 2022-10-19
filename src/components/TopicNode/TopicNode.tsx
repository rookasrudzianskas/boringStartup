//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";
import {Topic} from "../../types/models";

interface TopicNodeProps {
    topic: Topic;
    isDisabled?: boolean;
}

const TopicNode = ({topic, isDisabled = true}: TopicNodeProps) => {
    return (
        <TouchableOpacity activeOpacity={isDisabled ? 1 : 0.7} style={styles.container}>
            <View style={[styles.progress]}>
                <View style={[styles.circle, {backgroundColor: isDisabled ? Colors.light.dark : Colors.light.primary}]}>
                    <Image source={{uri: topic?.icon}} style={styles.image} />
                </View>
            </View>
                <Text style={styles.title}>{topic?.title || 'Loading...'}</Text>
        </TouchableOpacity>
    );
};


export default TopicNode;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10, // Find the right one @TODO
        width: "30%",
        maxWidth: 150,
    },
    progress: {
        backgroundColor: Colors.light.dark,
        padding: 10,
        borderRadius: 999,
    },
    circle: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 999,
        backgroundColor: Colors.light.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.light.background,
    },
    image: {
        width: "50%",
        aspectRatio: 1,
    },
    title: {
        marginVertical: 5,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    }
});
