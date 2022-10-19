//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface TopicNodesRowProps {
    children: React.ReactNode;
}

const TopicNodesRow: React.FC = ({children}: TopicNodesRowProps) => {
    return (
        <View className="flex-row w-full justify-center" >
            {children}
        </View>
    );
};

export default TopicNodesRow;
