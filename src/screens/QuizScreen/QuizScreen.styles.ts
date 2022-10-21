import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
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
