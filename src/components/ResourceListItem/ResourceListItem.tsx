//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ResourceItem} from "../../types/models";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

interface ResourceListItemProps {
    resource: ResourceItem;
    index: number;
    isLast?: boolean;
}

const ResourceListItem = ({ resource, index, isLast }: ResourceListItemProps) => {
    const onPress = () => {
        // Linking.openURL(resource.url || 'www.w3schools.com');
        WebBrowser.openBrowserAsync(resource?.url || 'https://expo.dev');
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <View style={[styles.indexContainer, resource.completed && styles.completed]}>
                <Text>{index + 1}</Text>
            </View>
            <Text>{resource?.title}</Text>
            <Ionicons name="open-outline" size={21} color="black" style={styles.icon} />
            {!isLast && (
                <View style={[styles.lineIndicator, {backgroundColor: resource.completed ? Colors.light.primary : Colors.light.dark}]} />
            )}
        </TouchableOpacity>
    );
};

export default ResourceListItem;

const styles = StyleSheet.create({
   container: {
       flexDirection: "row",
       marginVertical: 10,
       alignItems: 'center',
   },
    indexContainer: {
        width: 30,
        borderWidth: 2,
        borderColor: Colors.light.dark,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        marginRight: 5,
    },
    completed: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    icon: {
       marginLeft: "auto",
    },
    lineIndicator: {
        position: 'absolute',
        height: 20,
        width: 2,
        left: 15,
        top: 30,
        backgroundColor: Colors.light.primary,
    }
});
