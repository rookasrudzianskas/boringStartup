//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, PressableProps} from 'react-native';
import Colors from "../../constants/Colors";

interface MultipleChoiceAnswerProps extends PressableProps {
    choice: string;
    isSelected?: boolean;
    onPress?: (choice: string) => void;
}

const MultipleChoiceAnswer = ({choice, isSelected = false, onPress = () => {}, ...otherProps}: MultipleChoiceAnswerProps) => {
    return (
        <TouchableOpacity {...otherProps} onPress={() => onPress(choice)} className="bg-gray-100" activeOpacity={0.7} style={[styles.container, isSelected ? { borderColor: Colors.light.primary } : {}]}>
            <Text className="font-semibold" style={[styles.text, isSelected ? { color: Colors.light.primary } : {}]}>
                {choice}
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
        color: Colors.light.text
    }
});
