//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {FlatList, LogBox, StyleSheet, View} from 'react-native';
import TopicNode from "../../components/TopicNode";
import TopicNodesRow from "../../components/TopicNodesRow";
import {groupByLevel} from "../../utils/topics";
import {Auth, DataStore} from "aws-amplify";
import {QuizResult, Topic} from "../../models";

LogBox.ignoreLogs(['DataStore - subscriptionError Connection failed: Connection handshake error', 'DataStore {"cause": {"error": {"errors"']);

// console.log(currentLevel);

const ModuleScreen = () => {
    const [levels, setLevels] = useState<Topic[][]>([]);
    const [currentLevel, setCurrentLevel] = useState<number>(0);

    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await DataStore.query(Topic);

            const topicsWithProgress = await addProgressToTopics(topics);

            const _levels = groupByLevel(topicsWithProgress);
            setLevels(_levels);
        }
        fetchTopics();
        // const subscription = DataStore.observe(Topic).subscribe(() => fetchTopics());
        // return () => subscription.unsubscribe();
    }, []);

    const addProgressToTopics = async (topics: Topic[]) => {
        return await Promise.all(topics.map(addProgressToTopic));
    }

    const addProgressToTopic = async (topic: Topic) => {
        if(!topic.Quiz) {
            // console.log('No quiz for topic', topic.id, topic.Quiz);
            return topic;
        }
        const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });
        const userResult = (await DataStore.query(QuizResult)).filter(result => result.quizID === topic.Quiz?.id && result.sub === userData?.attributes.sub);
        console.log("THIS IS >>>>", userResult);
        return topic;
    }


    // @TODO Current levels are not coded yet
    // useEffect(() => {
    //     setCurrentLevel(getCurrentActiveLevel(levels));
    // }, [levels]);

    return (
        <View style={styles.container}>

            <FlatList
                data={levels}
                keyExtractor={(item) => item[0].level?.toString()} // @TODO does it work?
                showsVerticalScrollIndicator={false}
                bounces={true}
                renderItem={({item}) => (
                    <TopicNodesRow>
                        {item.map((topic) => (
                            <TopicNode key={topic.id} topic={topic}
                                       // isDisabled={currentLevel < topic.level}
                            />
                        ))}
                    </TopicNodesRow>
                )}
            />
        </View>
    );
};

export default ModuleScreen;

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'white',
   }
});
