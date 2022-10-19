//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const TopicNode = () => {
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Image style={styles.image} />
            </View>
            <Text style={styles.title}>Variables</Text>
        </View>
    );
};

export default TopicNode;

const styles = StyleSheet.create({
    container: {

    },
    circle: {
        width: 50,
        aspectRatio: 1,
        backgroundColor: 'red',
    },
    image: {

    },
    title: {

    }
});
