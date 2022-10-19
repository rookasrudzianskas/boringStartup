//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import TopicTreeCell from "../../components/TopicTreeCell";

const ModuleScreen = () => {
    return (
        <View style={styles.container}>
            <TopicTreeCell />
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
