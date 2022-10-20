//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";

interface progressBarProps {
    progress: number;
}

const ProgressBar = ({progress}: progressBarProps) => {
    return (
        <View className="bg-gray-200/40" style={{ height: 10}}>
            <View className="bg-green-300 rounded-tr-lg rounded-br-lg" style={{width: `${Math.max(10, progress * 100)}%`, height: '100%'}}/>
        </View>
    );
};

export default ProgressBar;
