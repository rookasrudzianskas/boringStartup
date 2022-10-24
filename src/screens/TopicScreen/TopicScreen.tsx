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
import {Analytics, Auth, DataStore} from "aws-amplify";
import {useModuleContext} from "../../contexts/ModuleContext";

const TopicScreen = ({ route, navigation }: NativeStackScreenProps<"Topic">) => {
    const topicId = route.params.id;
    const {updateTopicProgress} = useModuleContext();
    const [topic, setTopic] = useState<Topic[]>();
    const [userTopicProgress, setUserTopicProgress] = useState<UserTopicProgress>();
    const [resources, setResources] = useState<Resource[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [completedExerciseIDs, setCompletedExerciseIDs] = useState<string[]>([]);
    const [completedResourceIDs, setCompletedResourceIDs] = useState<string[]>([]);

    useEffect(() => {
        if(topicId) {
            Analytics.record({
                name: 'topicOpened',
                attributes: { id: topicId }
            });
        }
    }, [topicId]);

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
        setLoading(true);
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

        console.log("REFRESING TOPIC!")
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
                setCompletedExerciseIDs(userProgress.completedExerciseIDs);
                setCompletedResourceIDs(userProgress.completedResourceIDs);
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
            setLoading(false);
        }
        fetchTopicDetails();


    }, [topic]);


    // useEffect(() => {
    //     if(!userTopicProgress) return;
    //     const sub = DataStore.observeQuery(UserTopicProgress, (c) =>
    //         c.id("eq", userTopicProgress.id)
    //     ).subscribe(({items}) => {
    //         console.log("Subscription");
    //         console.log(items);
    //         setUserTopicProgress(items[0]);
    //         updateTopicProgress(topicId, items[0]);
    //     });
    //
    //     return () => {
    //         sub.unsubscribe();
    //     }
    // }, [userTopicProgress?.id])

    const onStartQuiz = () => {
        if(topic?.topicQuizId) {
            navigation.navigate("Quiz", {id: topic?.topicQuizId });
        }
    };

    const onResourceComplete = async (resource: Resource) => {
        if(loading || !userTopicProgress || completedResourceIDs.includes(resource.id)) {
            console.log("Loading or already completed");
            return;
        }
        // recalculate progress
        // setLoading(true);
        // const ids = [...completedResourceIDs, resource.id]

        // const updated = await DataStore.save(UserTopicProgress.copyOf(userTopicProgress, (updated) => {
        //     updated.completedResourceIDs = ids;
        //     const progress = getNextProgress();
        //     updated.progress = progress;
        // }));
        setCompletedResourceIDs((existing) => existing.includes(resource.id)) ? existing : [...existing, resource.id];
        // updateTopicProgress(topicId, updated);
        // setLoading(false);
    }


    useEffect(() => {
        if(!userTopicProgress || completedResourceIDs.length === userTopicProgress?.completedResourceIDs.length) return;
        setLoading(true);
        (async () => {
            const updated = await DataStore.save(
                UserTopicProgress.copyOf(userTopicProgress, (updated) => {
                updated.completedResourceIDs = completedResourceIDs;
                updated.progress = getNextProgress();
            }));
            setUserTopicProgress(updated);
            updateTopicProgress(topicId, updated);
            setLoading(false);
        })();
    }, [completedResourceIDs]);

    const onExerciseComplete = async (exercise: Exercise) => {
        if(loading || !userTopicProgress ||completedExerciseIDs.includes(exercise.id)) return;
        // recalculate progress
        setLoading(true);
        const ids = [...completedExerciseIDs, exercise.id];

        const updated = await DataStore.save(UserTopicProgress.copyOf(userTopicProgress, (updated) => {
            updated.completedExerciseIDs = ids;
            updated.progress = getNextProgress();
        }));
        setCompletedExerciseIDs(ids);
        setUserTopicProgress(updated);
        updateTopicProgress(topicId, updated);
        setLoading(false);
    }


    const getNextProgress = () => {
        return (completedResourceIDs.length + completedExerciseIDs.length + 1) / (resources.length + exercises.length);
    }

    if(!topic && !userTopicProgress) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

    console.log("🚀", completedResourceIDs)
    console.log(":🍏", completedExerciseIDs)

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
                                <ResourceListItem resource={resource} key={resource.id} index={index} isLast={index + 1 === resources.length} onComplete={onResourceComplete} isCompleted={completedResourceIDs?.includes(resource.id)} />
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
                                <ResourceListItem resource={exercise} key={exercise.id} index={index} isLast={index + 1 === exercises.length} onComplete={onExerciseComplete}  isCompleted={completedExerciseIDs.includes(exercise?.id)} />
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
