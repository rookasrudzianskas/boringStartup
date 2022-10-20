//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {RootStackScreenProps} from "../../types/navigation";
import LottieView from 'lottie-react-native';

const QuizEndScreen = ({route}: RootStackScreenProps<"QuizEndScreen">) => {
    const {nOfQuestions, nOfCorrectAnswers} = route?.params;
    const animation = useRef(null);

    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
        // animation.current?.play();
    }, []);

    return (
        <View style={styles.animationContainer} className="justify-center items-center">
            <LottieView
                autoPlay
                loop
                speed={1}
                ref={animation}
                style={{
                    width: 400,
                    height: 400,
                    backgroundColor: 'whit',
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source="https://assets4.lottiefiles.com/packages/lf20_dXNLiFDtBY.json"
            />
            <Text className="text-4xl font-bold tracking-wider">{(nOfCorrectAnswers / nOfQuestions) * 100 || 'Loading...'}%</Text>
            <Text className="text-xl font-bold mt-2">{nOfCorrectAnswers} / {nOfQuestions || 'Loading..'}</Text>
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
