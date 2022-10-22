//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import TopicNode from "../../components/TopicNode";
import TopicNodesRow from "../../components/TopicNodesRow";
import {getCurrentActiveLevel, groupByLevel} from "../../utils/topics";
import {DataStore} from "aws-amplify";
import {Topic} from "../../models";

// console.log(currentLevel);

const ModuleScreen = () => {
    const [levels, setLevels] = useState<Topic[][]>([]);
    const [currentLevel, setCurrentLevel] = useState<number>(0);

    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await DataStore.query(Topic);
            const _levels = groupByLevel(topics);
            setLevels(_levels);
        }

        fetchTopics();
        // const subscription = DataStore.observe(Topic).subscribe(() => fetchTopics());
        // return () => subscription.unsubscribe();
    }, []);

    // @TODO Current levels are not coded yet
    // useEffect(() => {
    //     setCurrentLevel(getCurrentActiveLevel(levels));
    // }, [levels]);

    return (
        <View style={styles.container}>

            <FlatList
                data={levels}
                keyExtractor={(item) => item[0].level.toString()} // @TODO does it work?
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
