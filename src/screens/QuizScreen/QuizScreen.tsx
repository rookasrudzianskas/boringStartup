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
            {/*<View className="bg-gray-100 rounded-t-xl px-4 pt-3 border border-gray-300 h-36" style={[styles.answerBox, styles.correctAnswerBox]}>*/}
            {/*    <Text style={styles.correctTitle}>Correct</Text>*/}
            {/*    <CustomButton text={'Continue'} onPress={onContinue} style={styles.button} />*/}
            {/*</View>*/}

            <View className="bg-gray-100 rounded-t-xl px-4 pt-3 h-36" style={[styles.answerBox, styles.wrongAnswerBox]}>
                <Text style={styles.wrongTitle}>Bro wrong!</Text>
                <CustomButton text={'Continue'} onPress={onContinue} style={styles.button} />
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
    answerBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        left: 0,
        right: 0,
        borderWidth: 1,
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    correctAnswerBox: {
        borderColor: Colors.light.tertiary,
    },
    wrongAnswerBox: {
        borderColor: Colors.light.secondary,
    },
    correctTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.primary,
        marginVertical: 10,
    },

    wrongTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.secondary,
        marginVertical: 10,
    }
});
