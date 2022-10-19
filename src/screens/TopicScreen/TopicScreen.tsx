//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import Colors from "../../constants/Colors";
import ResourceListItem from "../../components/ResourceListItem";
import {useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../../types/navigation";
import topics from "../../../assets/data/topics";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Markdown from "react-native-markdown-display";

const TopicScreen = ({ route, navigation }: NativeStackScreenProps<"Topic">) => {
    const topicId = route.params.id;
    const topic = topics.find(topic => topic.id === topicId);

    useLayoutEffect(() => {
        if(!topic) return;
        navigation.setOptions({
            headerShown: true,
            title: topic?.title
        })
    }, []);
    console.error = (error) => error.apply; // @TODO Disables the error message of Courier font, have to be replaced to Courier New

    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}} className="" style={styles.container}>
            <Image />
            <Text style={styles.title}>Intro</Text>
            <Markdown>
                {topic?.description || 'Loading...'}
            </Markdown>
            <Text style={styles.title}>Resources</Text>
            {topic.resources && (
                <>
                    {topic?.resources.map((resource, index) => (
                        <ResourceListItem resource={resource} key={resource.id} index={index} isLast={index + 1 === topic.resources.length} />
                    ))}
                </>
            )}

            <Text style={styles.title}>Context</Text>
            <Markdown>{topic?.context || 'Loading...'}</Markdown>

            <Text style={styles.title}>Practice</Text>
            {topic.exercises && (
                <>
                    {topic?.resources.map((resource, index) => (
                        <ResourceListItem resource={resource} key={resource.id} index={index} isLast={index + 1 === topic.resources.length} />
                    ))}
                </>
            )}
        </ScrollView>
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
        marginTop: 20,
        marginBottom: 25,
        marginTop: 10
    }
});
