//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from "../../constants/Colors";

const QuizScreen = () => {
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
    },
    question: {

    },
    questionImage: {

    }
});
