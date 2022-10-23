"use strict";
exports.__esModule = true;
exports.styles = void 0;
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
exports.styles = react_native_1.StyleSheet.create({
    container: {
        // flex:  1,
        backgroundColor: Colors_1["default"].light.white,
        padding: 10
    },
    question: {
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 10
    },
    questionImage: {
        width: '100%',
        height: 300
    },
    choicesContainer: {
        marginTop: 'auto'
    },
    button: {
        marginVertical: 5
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    correctAnswerBox: {
        borderColor: Colors_1["default"].light.tertiary
    },
    wrongAnswerBox: {
        borderColor: Colors_1["default"].light.secondary,
        backgroundColor: Colors_1["default"].light.backgroundError
    },
    correctTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors_1["default"].light.primary,
        marginVertical: 10
    },
    wrongTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors_1["default"].light.secondary,
        marginVertical: 10
    }
});
