//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import TopicNode from "../../components/TopicNode";
import TopicNodesRow from "../../components/TopicNodesRow";
import topics from '../../../assets/data/topics.ts';
import {groupByLevel} from "../../utils/topics";

const levels = groupByLevel(topics);

const ModuleScreen = () => {
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
                            <TopicNode key={topic.id} topic={topic} />
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
