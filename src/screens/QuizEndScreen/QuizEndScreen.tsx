//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {RootStackScreenProps} from "../../types/navigation";
import LottieView from 'lottie-react-native';

const QuizEndScreen = ({route}: RootStackScreenProps<"QuizEndScreen">) => {
    const {nOfQuestions, nOfCorrectAnswers} = route.params;
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
        animation.current?.play();
    }, []);

    return (
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#eee',
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={'https://assets4.lottiefiles.com/packages/lf20_dXNLiFDtBY.json'}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Restart Animation"
                    onPress={() => {
                        animation.current?.reset();
                        animation.current?.play();
                    }}
                />
            </View>
            <Text>{(nOfCorrectAnswers / nOfQuestions) * 100}%</Text>
            <Text>{nOfCorrectAnswers} / {nOfQuestions}</Text>
        </View>
    );
};

export default QuizEndScreen;

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});
