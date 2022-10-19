//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";

const QuizScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Quiz'
        })
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>What is the output?</Text>
            <Image source={{uri: 'https://byrookas.com/image'}} style={styles.questionImage} />

        {/*    Choices */}

        {/*    Button */}
        </View>
    );
};

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.white,
        padding: 10,
    },
    question: {
        fontSize: 20,
        fontWeight: '500',
    },
    questionImage: {

    }
});
