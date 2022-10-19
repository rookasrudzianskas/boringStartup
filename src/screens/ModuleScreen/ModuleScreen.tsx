//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import TopicNode from "../../components/TopicNode";
import TopicNodesRow from "../../components/TopicNodesRow";

const ModuleScreen = () => {
    return (
        <View style={styles.container}>
            <TopicNodesRow>
                <TopicNode />
            </TopicNodesRow>
            <TopicNodesRow>
                <TopicNode />
                <TopicNode />
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
