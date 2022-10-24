//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {FlatList, LogBox, StyleSheet, View} from 'react-native';
import TopicNode from "../../components/TopicNode";
import TopicNodesRow from "../../components/TopicNodesRow";
import {getCurrentActiveLevel, groupByLevel} from "../../utils/topics";
import {Auth, DataStore} from "aws-amplify";
import {QuizResult, Topic} from "../../models";
import {TopicWithResult} from "../../types/models";

LogBox.ignoreLogs(['DataStore - subscriptionError Connection failed: Connection handshake error', 'DataStore {"cause": {"error": {"errors"']);

const ModuleScreen = () => {

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
                                       isDisabled={currentLevel < topic.level}
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
