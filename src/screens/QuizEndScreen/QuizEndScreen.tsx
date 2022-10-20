//@ts-nocheck
import React, {useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {RootStackScreenProps} from "../../types/navigation";
import LottieView from 'lottie-react-native';
import CustomButton from "../../components/CustomButton";

const QuizEndScreen = ({navigation, route}: RootStackScreenProps<"QuizEndScreen">) => {
    const {nOfQuestions, nOfCorrectAnswers} = route?.params;
    const percentage = (nOfCorrectAnswers / nOfQuestions) * 100;
    const isHappy = percentage > 70;
    const animation = useRef(null);

    const onPress = () => {
        navigation.navigate("Root");
    }

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
                source={isHappy ? require('../../../assets/lottie-ani-sad.json') : require('../../../assets/lottie-ani.json')}
            />
            <Text className={`text-5xl font-bold tracking-wider mt-20 ${isHappy ? 'text-green-300' : 'text-red-500'}`}>{percentage}%</Text>
            <Text className="text-2xl font-bold mt-2">{nOfCorrectAnswers} <Text className={`${isHappy ? 'text-green-300' : 'text-red-500'}`}> - out of - </Text> {nOfQuestions || 'Loading..'}</Text>
            <View style={styles.buttonContainer}>
                <CustomButton text={'Continue'} onPress={onPress} />
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
