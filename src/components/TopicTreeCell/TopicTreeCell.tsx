//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const TopicTreeCell = () => {
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Image style={styles.image} />
            </View>
            <Text style={styles.title}>Variables</Text>
        </View>
    );
};

export default TopicTreeCell;

const styles = StyleSheet.create({
    container: {

    },
    circle: {

    },
    image: {

    },
    title: {

    }
});
