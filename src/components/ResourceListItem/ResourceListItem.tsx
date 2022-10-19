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
}

const ResourceListItem = ({ resource, index }: ResourceListItemProps) => {
    const onPress = () => {
        // Linking.openURL(resource.url || 'www.w3schools.com');
        WebBrowser.openBrowserAsync(resource?.url || 'https://expo.dev');
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <View style={styles.indexContainer}>
                <Text>{index + 1}</Text>
            </View>
            <Text>{resource?.title}</Text>
            <Ionicons name="open-outline" size={21} color="black" style={styles.icon} />
        </TouchableOpacity>
    );
};

export default ResourceListItem;

const styles = StyleSheet.create({
   container: {
       flexDirection: "row",
       marginVertical: 5,
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
    icon: {
       marginLeft: "auto",
    }
});
