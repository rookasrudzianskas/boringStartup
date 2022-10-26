//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Colors from "../../constants/Colors";
import {Entypo, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import * as WebBrowser from 'expo-web-browser';
import {Exercise, Resource} from "../../models";
import {Analytics} from "aws-amplify";
import {useNavigation} from "@react-navigation/native";
import {adapty} from "react-native-adapty";

const ResourceTypeIcon = {
    VIDEO: <Entypo name="youtube" size={17} color="gray" />,
    DOCS: <SimpleLineIcons name="docs" size={17} color="gray" />,
    BLOG: <Entypo name="book" size={17} color="gray" />,
    BOOK: <Entypo name="bookmarks" size={17} color="gray" />,
    COURSE: <Ionicons name="construct-outline" size={17} color="gray" />,
    NEWSLETTER: <MaterialIcons name="email" size={17} color="gray" />
}

interface ResourceListItemProps {
    resource: Resource | Exercise;
    index: number;
    isLast?: boolean;
    onComplete?: (resource: Resource | Exercise) => void;
    isCompleted?: boolean;
}

const ResourceListItem = ({ resource, index, isLast, onComplete = () => {}, isCompleted = false }: ResourceListItemProps) => {
    const navigation = useNavigation();

    const isUserPro = async () => {
        try {
            const info = await adapty.purchases.getInfo({forceUpdate: true});
            return info.accessLevels?.premium?.isActive || true; // should be false
        } catch (e) {
            // Alert.alert("Whoops!", 'Could not get user info');
        }
    }

    const onPress = async () => {
        const userPro = await isUserPro();
        if(resource.pro && !userPro) {
            navigation.navigate("Paywall");
            return;
        }
        // Linking.openURL(resource.url || 'www.w3schools.com');
        if(!resource.url) return;
        await WebBrowser.openBrowserAsync(resource?.url || 'https://expo.dev');
        onComplete(resource);
        Analytics.record({
            name: resource instanceof Exercise ? 'exerciseOpened' : 'resourceOpened',
            attributes: { id: resource.id }
        });
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <View style={[styles.indexContainer, isCompleted && styles.completed]}>
                {!!resource.pro ? (
                    <MaterialCommunityIcons name="professional-hexagon" size={17} color="gray" />
                )  : isCompleted ? (
                    <Ionicons name="checkmark" size={22} color="white" />
                ) : (
                    <Text>{index + 1}</Text>
                )}
            </View>
            <View className="flex-col">
                <Text>{resource?.title}</Text>
                <View className="flex-row items-center space-x-1">
                    <Entypo name="youtube" size={17} color="gray" />
                    <Text className="text-xs font-semibold">Rokas</Text>
                </View>
            </View>
            {resource?.url && (<Ionicons name="open-outline" size={21} color="black" style={styles.icon} />)}
            {!isLast && (
                <View style={[styles.lineIndicator, {backgroundColor: isCompleted ? Colors.light.primary : Colors.light.dark}]} />
            )}
        </TouchableOpacity>
    );
};

export default ResourceListItem;

const styles = StyleSheet.create({
   container: {
       flexDirection: "row",
       marginBottom: 20,
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
        height: 27,
        width: 2,
        left: 15,
        top: 32,
        backgroundColor: Colors.light.primary,
    }
});
