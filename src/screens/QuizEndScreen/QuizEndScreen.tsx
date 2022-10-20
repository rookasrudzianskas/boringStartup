//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {RootStackScreenProps} from "../../types/navigation";
import LottieView from 'lottie-react-native';
import CustomButton from "../../components/CustomButton";

const QuizEndScreen = ({route}: RootStackScreenProps<"QuizEndScreen">) => {
    const {nOfQuestions, nOfCorrectAnswers} = route?.params;
    const animation = useRef(null);

    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
        // animation.current?.play();
    }, []);

    return (
        <View style={styles.animationContainer} className="justify-center items-center px-4">
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
                source={require('../../../assets/lottie-ani.json')}
            />
            <Text className="text-4xl font-bold tracking-wider mt-20">{(nOfCorrectAnswers / nOfQuestions) * 100 || 'Loading...'}%</Text>
            <Text className="text-2xl font-bold mt-2">{nOfCorrectAnswers} <Text className="text-purple-500"> - out of - </Text> {nOfQuestions || 'Loading..'}</Text>
            <View style={styles.buttonContainer}>
                <CustomButton text={'Continue'} />
            </View>
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
        paddingTop: 100,
        alignSelf: 'stretch',
    },
});
