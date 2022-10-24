//@ts-nocheck
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Colors from "../../constants/Colors";
import ResourceListItem from "../../components/ResourceListItem";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Markdown from "react-native-markdown-display";
import TopicSection from "./TopicSection";
import CustomButton from "../../components/CustomButton";
import useApplyHeaderWorkaround from "../../hooks/useApplyHeaderWorkaround";
import {Exercise, Resource, Topic, UserTopicProgress} from "../../models";
import {Auth, DataStore} from "aws-amplify";
import {useModuleContext} from "../../contexts/ModuleContext";

const TopicScreen = ({ route, navigation }: NativeStackScreenProps<"Topic">) => {
    const topicId = route.params.id;
    const {updateTopicProgress} = useModuleContext();
    const [topic, setTopic] = useState<Topic[]>();
    const [userTopicProgress, setUserTopicProgress] = useState<UserTopicProgress>();
    const [resources, setResources] = useState<Resource[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useLayoutEffect(() => {
        // @TODO does it work?
        // if(!topic) return;
        navigation.setOptions({
            headerShown: true,
            title: topic?.title || "Loading...",
        })
    }, []);

    // @TODO does it work?
    useApplyHeaderWorkaround(navigation.setOptions);

    useEffect(() => {
        const fetchTopic = async () => {
            const topic = await DataStore.query(Topic, topicId);
            setTopic(topic);
        }
        fetchTopic();
    }, [topicId]);

    useEffect(() => {
        if(topic) {
            navigation.setOptions({ title: topic.title });
        }

        const fetchTopicDetails = async () => {
            if(!topic) return;
            const resource = await DataStore.query(Resource).then(resources => resources.filter(resource => resource.topicID === topic?.id));
            setResources(resource);
            // ----------------------------
            const exercises = await DataStore.query(Exercise).then(exercises => exercises.filter((r => r.topicID === topic?.id)));
            setExercises(exercises);
            // ----------------------------
            // Get user progress for this topic
            const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const userTopicProgresses = await DataStore.query(UserTopicProgress);
            const userProgress = userTopicProgresses.find((tp) => tp.topicID === topic?.id && tp.sub === userData?.attributes.sub);
            // Checks if there's progress. If not, create a new one
            if(userProgress) {
                setUserTopicProgress(userProgress);
            } else {
                const newUserProgress = await DataStore.save(new UserTopicProgress({
                    sub: userData?.attributes.sub,
                    completedResourceIDs: [],
                    completedExerciseIDs: [],
                    progress: 0,
                    topicID: topic?.id,
                }))
                setUserTopicProgress(newUserProgress);
            }
        }
        fetchTopicDetails();


    }, [topic]);

    const onStartQuiz = () => {
        if(topic?.topicQuizId) {
            navigation.navigate("Quiz", {id: topic?.topicQuizId });
        }
    };

    const onResourceComplete = async (resource: Resource) => {
        if(!userTopicProgress) return;
        // recalculate progress
        const updated = await DataStore.save(UserTopicProgress.copyOf(userTopicProgress, (updated) => {
            if(!updated.completedResourceIDs.includes(resource.id)) {
                updated.completedResourceIDs.push(resource.id);
                const progress = (userTopicProgress.completedResourceIDs.length + userTopicProgress.completedExerciseIDs.length + 1) / (resources.length + exercises.length);
                updated.progress = progress;
            }
        }));
        setUserTopicProgress(updated);
        // console.log("TOPIC", topicId)
        updateTopicProgress(topicId, updated);
    }

    const onExerciseComplete = async (exercise: Exercise) => {
        if(!userTopicProgress) return;
        // recalculate progress
        const updated = await DataStore.save(UserTopicProgress.copyOf(userTopicProgress, (updated) => {
            if(!updated.completedExerciseIDs.includes(exercise.id)) {
                updated.completedExerciseIDs.push(exercise.id);
                const progress = (userTopicProgress.completedResourceIDs.length + userTopicProgress.completedExerciseIDs.length + 1) / (resources.length + exercises.length);
                updated.progress = progress;
            }
        }));
        setUserTopicProgress(updated);
        // console.log("TOPIC", topicId)
        updateTopicProgress(topicId, updated);
    }

    if(!topic && !userTopicProgress) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }
    console.error = (error) => error.apply; // @TODO Disables the error message of Courier font, have to be replaced to Courier New

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100, flexGrow: 1}} className="" style={styles.container}>
            <SafeAreaView>
                <Image />
                <TopicSection display={!!topic?.description} title={'Intro'} >
                    <Markdown>
                        {topic?.description || 'Loading...'}
                    </Markdown>
                </TopicSection>

                <TopicSection display={!!resources.length} title={'Resources'} >
                    {resources && (
                        <>
                            {resources.map((resource, index) => (
                                <ResourceListItem resource={resource} key={resource.id} index={index} isLast={index + 1 === resources.length} onComplete={onResourceComplete} isCompleted={userTopicProgress?.completedResourceIDs.includes(resource?.id)} />
                            ))}
                        </>
                    )}
                </TopicSection>

                {/* @TODO Fix Context section */}
                {/*<TopicSection title={'Context'} display={!!topic?.context}>*/}
                {/*    <Markdown>{topic?.context || 'Loading...'}</Markdown>*/}
                {/*</TopicSection>*/}

                <TopicSection title={'Practice'} display={!!exercises.length}>
                    {exercises && (
                        <>
                            {exercises.map((exercise, index) => (
                                // @TODO resource or exercise?
                                <ResourceListItem resource={exercise} key={exercise.id} index={index} isLast={index + 1 === exercises.length} onComplete={onExerciseComplete}  isCompleted={userTopicProgress?.completedExerciseIDs.includes(exercise?.id)} />
                            ))}
                        </>
                    )}
                </TopicSection>

                {topic?.topicQuizId && (<CustomButton text={'Start Quiz'} onPress={onStartQuiz} />)}

            </SafeAreaView>
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
