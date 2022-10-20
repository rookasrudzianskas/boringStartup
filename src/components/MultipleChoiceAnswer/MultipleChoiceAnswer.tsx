//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";

interface MultipleChoiceAnswerProps {
    text: string;
    isSelected?: boolean;
}

const MultipleChoiceAnswer = ({text, isSelected = false}: MultipleChoiceAnswerProps) => {
    return (
        <TouchableOpacity className="bg-gray-100" activeOpacity={0.7} style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default MultipleChoiceAnswer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.light.tabIconDefault,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,

    },
    text: {

    }
});
