//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import TopicNode from "../../components/TopicNode";
import TopicNodesRow from "../../components/TopicNodesRow";
import topics from '../../../assets/data/topics.ts';

// const levels = {
//     "1": [topic1],
//     "2": [topic2, topic3],
//     "3": [topic4],
// }

const levels: {[key: number]: []} = {}
topics.forEach(topic => {
    if (!levels[topic.level]) {
        levels[topic.level] = [];
    }
    levels[topic.level].push(topic);
});

const ModuleScreen = () => {
    return (
        <View style={styles.container}>
            <TopicNodesRow>
                <TopicNode />
            </TopicNodesRow>

            <TopicNodesRow>
                <TopicNode />
                <TopicNode />
            </TopicNodesRow>

            <TopicNodesRow>
                <TopicNode />
            </TopicNodesRow>
        </View>
    );
};

export default ModuleScreen;

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: 'white',
       padding: 20,
   }
});
