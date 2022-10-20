//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, PressableProps} from 'react-native';
import Colors from "../../constants/Colors";

interface CustomButtonProps extends PressableProps {
    text: string;
    type?: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
}

const CustomButton = ({ text, style, disabled, type="PRIMARY", ...otherProps }: CustomButtonProps) => {
    const buttonStyle = styles[`container_${type}`];
    const textStyle = styles[`text_${type}`];

    return (
        <TouchableOpacity style={[styles.container, buttonStyle, style as any, disabled && { backgroundColor: Colors.light.tabIconDefault}]} disabled={disabled} activeOpacity={0.7} {...otherProps}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
   container: {
       padding: 10,
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 10,
   },
    container_PRIMARY: {
        backgroundColor: Colors.light.primary,
    },
    container_SECONDARY: {
        borderWidth: 2,
        borderColor: Colors.light.primary,
    },
    container_TERTIARY: {

    },
    text: {
        color: Colors.light.white,
        fontSize: 16,
        fontWeight: '500',
    },
    text_PRIMARY: {

    },
    text_SECONDARY: {
        color: Colors.light.primary,
    },
    text_TERTIARY: {
        color: Colors.light.primary,
    }
});
