//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import quiz from '../../../assets/data/quiz';
import Markdown from "react-native-markdown-display";
import MultipleChoiceAnswer from "../../components/MultipleChoiceAnswer";

const question = quiz[0];

const QuizScreen = () => {
    const navigation = useNavigation();
    const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);

    const onChoicePress = (choice: string) => {
        // if(selectedAnswer.includes(choice)) {
        //     setSelectedAnswer(selectedAnswer.filter(item => item !== choice));
        // } else {
        //     setSelectedAnswer([...selectedAnswer, choice]);
        // }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Quiz'
        })
    }, []);

    // console.log(question);
    console.error = (error) => error.apply; // @TODO Disables the error message of Courier font, have to be replaced to Courier New

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question?.question || 'Loading...'}</Text>
            {!!question.image && (
                <Image resizeMode={'contain'} className="-mt-10" source={{uri: question.image}} style={styles.questionImage} />
            )}

            {!!question.content && (<Markdown>{question.content}</Markdown>)}

        {/*    Choices */}
            {question.options && (
                <>
                    {question.options.map((option, index) => (
                        <MultipleChoiceAnswer key={index} text={option} onPress={onChoicePress} />
                    ))}
                </>
            )}
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
        marginVertical: 10,
    },
    questionImage: {
        width: '100%',
        height: 300,
    }
});
