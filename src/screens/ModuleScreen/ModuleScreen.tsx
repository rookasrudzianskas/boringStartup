//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import TopicNode from "../../components/TopicNode";

const ModuleScreen = () => {
    return (
        <View style={styles.container}>
            <TopicNode />
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
