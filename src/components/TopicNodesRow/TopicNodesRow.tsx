//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface TopicNodesRowProps {
    children: React.ReactNode;
}

const TopicNodesRow = ({children}: { children: React.ReactNode}) => {
    return (
        <View className="flex-row w-full justify-center" >
            {children}
        </View>
    );
};

export default TopicNodesRow;
