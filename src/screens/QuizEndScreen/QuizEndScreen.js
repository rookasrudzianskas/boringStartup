"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var lottie_react_native_1 = require("lottie-react-native");
var CustomButton_1 = require("../../components/CustomButton");
var QuizEndScreen = function (_a) {
    var navigation = _a.navigation, route = _a.route;
    var _b = route === null || route === void 0 ? void 0 : route.params, nOfQuestions = _b.nOfQuestions, nOfCorrectAnswers = _b.nOfCorrectAnswers;
    var percentage = (nOfCorrectAnswers / nOfQuestions) * 100;
    var isHappy = percentage > 70;
    var animation = (0, react_1.useRef)(null);
    var onPress = function () {
        navigation.navigate("Root");
    };
    return (<react_native_1.View style={styles.animationContainer} className="justify-center items-center px-4">
            <lottie_react_native_1["default"] autoPlay loop speed={1} ref={animation} style={{
            width: 350,
            height: 350,
            backgroundColor: 'whit'
        }} source={isHappy ? require('../../../assets/lottie-ani-sad.json') : require('../../../assets/lottie-ani.json')}/>
            <react_native_1.Text className={"text-5xl font-bold tracking-wider mt-20 ".concat(isHappy ? 'text-green-300' : 'text-red-500')}>{percentage}%</react_native_1.Text>
            <react_native_1.Text className="text-2xl font-bold mt-2">{nOfCorrectAnswers} <react_native_1.Text className={"".concat(isHappy ? 'text-green-300' : 'text-red-500')}> - out of - </react_native_1.Text> {nOfQuestions || 'Loading..'}</react_native_1.Text>
            <react_native_1.View style={styles.buttonContainer}>
                <CustomButton_1["default"] text={'Continue'} onPress={onPress}/>
            </react_native_1.View>
        </react_native_1.View>);
};
exports["default"] = QuizEndScreen;
var styles = react_native_1.StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonContainer: {
        paddingTop: 100,
        alignSelf: 'stretch'
    }
});
