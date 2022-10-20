//@ts-nocheck
import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import quiz from '../../../assets/data/quiz';

const question = quiz[0];

const QuizScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Quiz'
        })
    }, []);

    // console.log(question);

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question?.question || 'Loading...'}</Text>
            {!!question.image && (
                <Image resizeMode={'contain'} className="-mt-10" source={{uri: question.image}} style={styles.questionImage} />
            )}

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
        width: '100%',
        height: 300,
    }
});
