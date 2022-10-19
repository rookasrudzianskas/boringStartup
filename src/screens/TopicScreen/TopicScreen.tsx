//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from "../../constants/Colors";
import ResourceListItem from "../../components/ResourceListItem";
import resource from '../../../assets/data/topics';

const TopicScreen = () => {
    return (
        <View className="pt-10" style={styles.container}>
            <Image />
            <Text style={styles.title}>Resources</Text>
            <ResourceListItem />
            <ResourceListItem />
        </View>
    );
};

export default TopicScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.white,
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1,
    }
});
