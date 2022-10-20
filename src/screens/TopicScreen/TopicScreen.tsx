//@ts-nocheck
import React, {useEffect, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import Colors from "../../constants/Colors";
import ResourceListItem from "../../components/ResourceListItem";
import topics from "../../../assets/data/topics";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Markdown from "react-native-markdown-display";
import TopicSection from "./TopicSection";
import CustomButton from "../../components/CustomButton";

const TopicScreen = ({ route, navigation }: NativeStackScreenProps<"Topic">) => {
    const topicId = route.params.id;
    const topic = topics.find(topic => topic.id === topicId);

    const onStartQuiz = () => {
        navigation.navigate("Quiz", {id: topicId});
    };

    useEffect(() => {
        if(topic) {
            navigation.setOptions({ title: topic.title });
        }
    }, [topic]);

    useLayoutEffect(() => {
        if(!topic) return;
        navigation.setOptions({
            headerShown: true,
            title: topic?.title
        })
    }, []);
    console.error = (error) => error.apply; // @TODO Disables the error message of Courier font, have to be replaced to Courier New

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100, flexGrow: 1}} className="" style={styles.container}>
            <Image />
            <TopicSection display={!!topic?.description} title={'Intro'} >
                <Markdown>
                    {topic?.description || 'Loading...'}
                </Markdown>
            </TopicSection>

            <TopicSection display={!!topic?.resources} title={'Resources'} >
                {topic.resources && (
                    <>
                        {topic?.resources.map((resource, index) => (
                            <ResourceListItem resource={resource} key={resource.id} index={index} isLast={index + 1 === topic.resources.length} />
                        ))}
                    </>
                )}
            </TopicSection>

            <TopicSection title={'Context'} display={!!topic?.context}>
                <Markdown>{topic?.context || 'Loading...'}</Markdown>
            </TopicSection>

            <TopicSection title={'Practice'} display={!!topic?.exercises}>
                {topic.exercises && (
                    <>
                        {topic?.resources.map((resource, index) => (
                            <ResourceListItem resource={resource} key={resource.id} index={index} isLast={index + 1 === topic.resources.length} />
                        ))}
                    </>
                )}
            </TopicSection>

            <CustomButton text={'Start Quiz'} onPress={onStartQuiz} />

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
