//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, PressableProps} from 'react-native';
import Colors from "../../constants/Colors";

interface CustomButtonProps extends PressableProps {
    text: string;
}

const CustomButton = ({ text, style, disabled, ...otherProps }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={[styles.container, style as any, disabled && { backgroundColor: Colors.light.tabIconDefault}]} disabled={disabled} activeOpacity={0.7} {...otherProps}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
   container: {
       backgroundColor: Colors.light.primary,
       padding: 10,
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 10,
   },
    text: {
        color: Colors.light.white,
        fontSize: 16,
        fontWeight: '500',
    }
});
