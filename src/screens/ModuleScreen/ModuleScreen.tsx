//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, LogBox, StyleSheet, View} from 'react-native';
import TopicNode from "../../components/TopicNode";
import TopicNodesRow from "../../components/TopicNodesRow";
import {useModuleContext} from "../../contexts/ModuleContext";

LogBox.ignoreLogs(['DataStore - subscriptionError Connection failed: Connection handshake error', 'DataStore {"cause": {"error": {"errors"']);

const ModuleScreen = () => {

    const {levels, currentLevel} = useModuleContext();

    if(!levels || !currentLevel) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

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
