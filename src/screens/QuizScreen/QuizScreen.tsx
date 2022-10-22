//@ts-nocheck
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView, Alert, ActivityIndicator} from 'react-native';
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
import {styles} from "./QuizScreen.styles";
import {Auth, DataStore} from "aws-amplify";
import {Quiz, QuizQuestion, QuizResult, UserTopicProgress} from "../../models";
import {S3Image} from "aws-amplify-react-native";

const QuizScreen = ({navigation, route}: RootStackScreenProps<"Quiz">) => {
    const [quiz, setQuiz] = useState<Quiz | undefined>();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const question = questions[questionIndex];
    const [previousResults, setPreviousResults] = useState<QuizResult | undefined>();

    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | undefined>(undefined);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [wrongAnswersIDs, setWrongAnswersIDs] = useState<string[]>([]);
    const isButtonDisabled = selectedAnswers.length === 0;
    const quizId = route.params.id;
    useApplyHeaderWorkaround(navigation.setOptions);

    useEffect(() => {
        DataStore.query(Quiz, quizId).then(setQuiz);
    }, [quizId]);

    useEffect(() => {
        if(answeredCorrectly === false && !wrongAnswersIDs.includes(question.id)) {
            setWrongAnswersIDs([...wrongAnswersIDs, question.id]);
        }
    }, [answeredCorrectly])

    useEffect(() => {
        if(!quiz) return;
        const fetchQuestions = async () => {
            const questions = await DataStore.query(QuizQuestion).then(questions => questions.filter((q) => q.quizID === quiz?.id));
            setQuestions(questions);
        }
        fetchQuestions();

        const fetchPreviousResults = async () => {
            // get previous results
            const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });
            const quizResults = await DataStore.query(QuizResult);
            const myQuizResult = quizResults.filter((qr) => qr.quizID === quiz?.id && qr.sub === userData?.attributes.sub);
            const previousResult = myQuizResult.reduce((acc: undefined | QuizResult, curr) => !acc || curr.try > acc.try ? curr : acc, undefined);
            setPreviousResults(previousResult);
        }
        fetchPreviousResults();

        const subscription = DataStore.observe(QuizQuestion).subscribe(() => fetchQuestions());
        const subscriptionForPreviousResults = DataStore.observe(UserTopicProgress).subscribe(() => fetchPreviousResults());

        return () => {
            subscription.unsubscribe();
            subscriptionForPreviousResults.unsubscribe();
        };
    }, [quiz]);

    useEffect(() => {
        (async () => {
            if(questionIndex === questions.length && questionIndex > 1) {
                const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });
                // @TODO does not work if restart
                if(quiz && userData) {
                    await DataStore.save(new QuizResult({
                        sub: userData?.attributes.sub,
                        nofQuestions: questions.length,
                        nofCorrectAnswers: numberOfCorrectAnswers,
                        percentage: numberOfCorrectAnswers / questions.length,
                        failedQuestionsIDs: wrongAnswersIDs,
                        try: previousResults ? previousResults.try + 1 : 1,
                        quizID: quiz?.id,
                    }))
                }
                // navigate to results screen
                setAnsweredCorrectly(undefined);
                setSelectedAnswers([]);
                navigation.navigate("QuizEndScreen", { nOfQuestions: questions.length, nOfCorrectAnswers: numberOfCorrectAnswers });
                return;
            }
        })();
        // setQuestion(quiz[questionIndex]);
        setAnsweredCorrectly(undefined);
        setSelectedAnswers([]);
    }, [questionIndex]);

    const onChoicePress = (choice: string) => {
        // if(!question) return;
        setSelectedAnswers((currentSelectedAnswers) => {
            if(currentSelectedAnswers.includes(choice)) {
                return currentSelectedAnswers.filter(item => item !== choice);
            } else {
                if(question?.correctAnswers && question?.correctAnswers?.length > 1) {
                    return [...currentSelectedAnswers, choice];
                } else {
                    return [choice];
                }
            }
        });
    }

    const onSubmit = () => {
        if(!question) return;
        if(selectedAnswers.length !== question.correctAnswers?.length) {
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

    if(!question) {
        return (
            <View className="h-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        )
    }

    console.error = (error) => error.apply; // @TODO Disables the error message of Courier font, have to be replaced to Courier New

    return (
        <>
            <ProgressBar progress={questionIndex / questions?.length} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50, flexGrow: 1}} style={styles.container}>
                <Text style={styles.question}>{question?.question || 'Loading...'}</Text>
                {!!question.image && (
                    <S3Image resizeMode={'contain'} imgKey={question.image} style={styles.questionImage} />
                )}

                {!!question.content && (<Markdown>{question.content}</Markdown>)}

                {/*    Choices */}
                {question.choices && (
                    <View style={styles.choicesContainer}>
                        {question.choices && (
                            <>
                                {question.choices.map((choice, index) => (
                                    <MultipleChoiceAnswer disabled={answeredCorrectly !== undefined} key={index} choice={choice} onPress={onChoicePress} isSelected={selectedAnswers.includes(choice)}/>
                                ))}
                            </>
                        )}
                    </View>
                )}
                {/*    Button */}

                    <CustomButton disabled={isButtonDisabled} text={'Submit'} onPress={onSubmit} style={styles.button} />

            </ScrollView>
            {answeredCorrectly === true && (
                <Animated.View entering={SlideInDown}  exiting={SlideInDown} className="bg-gray-100 rounded-t-xl px-4 pt-3 border border-gray-300 h-36" style={[styles.answerBox, styles.correctAnswerBox]}>
                    <Text style={styles.correctTitle}>Correct</Text>
                    <CustomButton text={'Continue'} onPress={onContinue} style={styles.button} />
                </Animated.View>
            )}

            {answeredCorrectly === false && (
                <Animated.View entering={SlideInDown}  exiting={SlideInDown} className="bg-gray-100 rounded-t-xl px-4 pt-3 h-36" style={[styles.answerBox, styles.wrongAnswerBox]}>
                    <Text style={styles.wrongTitle}>Bro wrong!</Text>
                    <CustomButton text={'Continue'} onPress={onContinue} style={styles.button} />
                </Animated.View>
            )}
        </>
    );
};

export default QuizScreen;


