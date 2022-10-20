//@ts-nocheck
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import Colors from "../../constants/Colors";
import quiz from '../../../assets/data/quiz';
import Markdown from "react-native-markdown-display";
import MultipleChoiceAnswer from "../../components/MultipleChoiceAnswer";
import CustomButton from "../../components/CustomButton";
import ProgressBar from "../../components/ProgressBar";
import {RootStackScreenProps} from "../../types/navigation";
import Animated, {
    SlideInDown, SlideInUp,
} from 'react-native-reanimated';
import useApplyHeaderWorkaround from "../../hooks/useApplyHeaderWorkaround";

const QuizScreen = ({navigation}: RootStackScreenProps<"Quiz">) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [question, setQuestion] = useState(quiz[questionIndex]);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | undefined>(undefined);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const isButtonDisabled = selectedAnswers.length === 0;
    useApplyHeaderWorkaround(navigation.setOptions);

    useEffect(() => {
        if(questionIndex === quiz.length) {
            // @TODO does not work if restart
            // navigate to results screen
            setAnsweredCorrectly(undefined);
            setSelectedAnswers([]);
            navigation.navigate("QuizEndScreen", { nOfQuestions: quiz.length, nOfCorrectAnswers: numberOfCorrectAnswers });
            return;
        }
        setQuestion(quiz[questionIndex]);
        setAnsweredCorrectly(undefined);
        setSelectedAnswers([]);
    }, [questionIndex]);

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

    const onSubmit = () => {
        if(selectedAnswers.length !== question.correctAnswers.length) {
            setAnsweredCorrectly(false);
            return;
        }
        const isCorrect = question.correctAnswers.every((answer) => selectedAnswers.includes(answer));
        setAnsweredCorrectly(isCorrect);
        if(isCorrect) {
            setNumberOfCorrectAnswers((currentNumber) => currentNumber + 1);
        }
    }

    const onContinue = () => {
        setQuestionIndex((index) => index + 1);
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
            <ProgressBar progress={questionIndex / quiz.length} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50, flexGrow: 1}} style={styles.container}>
                <Text style={styles.question}>{question?.question || 'Loading...'}</Text>
                {!!question.image && (
                    <Image resizeMode={'contain'} className="-mt-10" source={{uri: question.image}} style={styles.questionImage} />
                )}

                {!!question.content && (<Markdown>{question.content}</Markdown>)}

                {/*    Choices */}
                <View style={styles.choicesContainer}>
                    {question.choices && (
                        <>
                            {question.choices.map((choice, index) => (
                                <MultipleChoiceAnswer disabled={answeredCorrectly !== undefined} key={index} choice={choice} onPress={onChoicePress} isSelected={selectedAnswers.includes(choice)}/>
                            ))}
                        </>
                    )}
                </View>
                {/*    Button */}

                    <CustomButton disabled={isButtonDisabled} text={'Submit'} onPress={onSubmit} style={styles.button} />

            </ScrollView>
            {answeredCorrectly === true && (
                <Animated.View entering={SlideInDown.duration(2000)}  exiting={SlideInDown.duration(2000)} className="bg-gray-100 rounded-t-xl px-4 pt-3 border border-gray-300 h-36" style={[styles.answerBox, styles.correctAnswerBox]}>
                    <Text style={styles.correctTitle}>Correct</Text>
                    <CustomButton text={'Continue'} onPress={onContinue} style={styles.button} />
                </Animated.View>
            )}

            {answeredCorrectly === false && (
                <Animated.View entering={SlideInDown.duration(2000)}  exiting={SlideInDown.duration(2000)} className="bg-gray-100 rounded-t-xl px-4 pt-3 h-36" style={[styles.answerBox, styles.wrongAnswerBox]}>
                    <Text style={styles.wrongTitle}>Bro wrong!</Text>
                    <CustomButton text={'Continue'} onPress={onContinue} style={styles.button} />
                </Animated.View>
            )}
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
    choicesContainer: {
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
        backgroundColor: Colors.light.backgroundError,
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
