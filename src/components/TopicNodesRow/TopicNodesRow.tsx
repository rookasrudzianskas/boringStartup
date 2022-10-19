//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface TopicNodesRowProps {
    children: React.ReactNode;
}

const TopicNodesRow = ({children}: TopicNodesRowProps) => {
    return (
        <View className="flex-row" >
            {children}
        </View>
    );
};

export default TopicNodesRow;
