//@ts-nocheck
import React, {useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import quiz from '../../../assets/data/quiz';
import Markdown from "react-native-markdown-display";
import MultipleChoiceAnswer from "../../components/MultipleChoiceAnswer";
import CustomButton from "../../components/CustomButton";

const question = quiz[0];

const QuizScreen = () => {
    const navigation = useNavigation();
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const isButtonDisabled = selectedAnswers.length === 0;

    const onChoicePress = (choice: string) => {
        setSelectedAnswers((currentSelectedAnswers) => {
            if(currentSelectedAnswers.includes(choice)) {
                return currentSelectedAnswers.filter(item => item !== choice);
            } else {
                if(question.correctAnswers.length > 1) {
                    return [...currentSelectedAnswers, choice];
                } else {
                    return [choice];
                }
            }
        });
    }

    const answeredCorrectly = () => {
        if(selectedAnswers.length !== question.correctAnswers.length) {
            return false;
        }
        return question.correctAnswers.every((answer) => selectedAnswers.includes(answer));
    }

    const onSubmit = () => {
        if(answeredCorrectly()) {
            Alert.alert("Fire Bro!", "You got the question right!");
        } else {
            Alert.alert("Ooops!", "You got the question wrong!");
        }
    }

    const onContinue = () => {

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Quiz'
        })
    }, []);

    console.error = (error) => error.apply; // @TODO Disables the error message of Courier font, have to be replaced to Courier New

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50, flexGrow: 1}} style={styles.container}>
                <Text style={styles.question}>{question?.question || 'Loading...'}</Text>
                {!!question.image && (
                    <Image resizeMode={'contain'} className="-mt-10" source={{uri: question.image}} style={styles.questionImage} />
                )}

                {!!question.content && (<Markdown>{question.content}</Markdown>)}

                {/*    Choices */}
                {question.choices && (
                    <>
                        {question.choices.map((choice, index) => (
                            <MultipleChoiceAnswer key={index} choice={choice} onPress={onChoicePress} isSelected={selectedAnswers.includes(choice)}/>
                        ))}
                    </>
                )}
                {/*    Button */}
                <View style={styles.buttonContainer}>
                    <CustomButton disabled={isButtonDisabled} text={'Submit'} onPress={onSubmit} style={styles.button} />
                </View>

            </ScrollView>
            <View style={styles.correctAnswerBox}>
                <CustomButton text={'Submit'} onPress={onContinue} style={styles.button} />
            </View>
        </>
    );
};

export default QuizScreen;

const styles = StyleSheet.create({
    container: {
        // flex:  1,
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
    },
    buttonContainer: {
        marginTop: 'auto',
    },
    button: {
        marginVertical: 5,
    },
    correctAnswerBox: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: Colors.light.background,
        width: '100%',
        left: 0,
        right: 0,
    }
});
