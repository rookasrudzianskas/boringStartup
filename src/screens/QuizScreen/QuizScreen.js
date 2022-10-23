"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_markdown_display_1 = require("react-native-markdown-display");
var MultipleChoiceAnswer_1 = require("../../components/MultipleChoiceAnswer");
var CustomButton_1 = require("../../components/CustomButton");
var ProgressBar_1 = require("../../components/ProgressBar");
var react_native_reanimated_1 = require("react-native-reanimated");
var useApplyHeaderWorkaround_1 = require("../../hooks/useApplyHeaderWorkaround");
var QuizScreen_styles_1 = require("./QuizScreen.styles");
var aws_amplify_1 = require("aws-amplify");
var models_1 = require("../../models");
var aws_amplify_react_native_1 = require("aws-amplify-react-native");
var QuizScreen = function (_a) {
    var navigation = _a.navigation, route = _a.route;
    var _b = (0, react_1.useState)(), quiz = _b[0], setQuiz = _b[1];
    var _c = (0, react_1.useState)(0), questionIndex = _c[0], setQuestionIndex = _c[1];
    var _d = (0, react_1.useState)([]), questions = _d[0], setQuestions = _d[1];
    var question = questions[questionIndex];
    var _e = (0, react_1.useState)(), previousResults = _e[0], setPreviousResults = _e[1];
    var _f = (0, react_1.useState)([]), selectedAnswers = _f[0], setSelectedAnswers = _f[1];
    var _g = (0, react_1.useState)(undefined), answeredCorrectly = _g[0], setAnsweredCorrectly = _g[1];
    var _h = (0, react_1.useState)(0), numberOfCorrectAnswers = _h[0], setNumberOfCorrectAnswers = _h[1];
    var _j = (0, react_1.useState)([]), wrongAnswersIDs = _j[0], setWrongAnswersIDs = _j[1];
    var isButtonDisabled = selectedAnswers.length === 0;
    var quizId = route.params.id;
    (0, useApplyHeaderWorkaround_1["default"])(navigation.setOptions);
    (0, react_1.useEffect)(function () {
        aws_amplify_1.DataStore.query(models_1.Quiz, quizId).then(setQuiz);
    }, [quizId]);
    (0, react_1.useEffect)(function () {
        if (answeredCorrectly === false && !wrongAnswersIDs.includes(question.id)) {
            setWrongAnswersIDs(__spreadArray(__spreadArray([], wrongAnswersIDs, true), [question.id], false));
        }
    }, [answeredCorrectly]);
    (0, react_1.useEffect)(function () {
        if (!quiz)
            return;
        var fetchQuestions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var questions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.QuizQuestion).then(function (questions) { return questions.filter(function (q) { return q.quizID === (quiz === null || quiz === void 0 ? void 0 : quiz.id); }); })];
                    case 1:
                        questions = _a.sent();
                        setQuestions(questions);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchQuestions();
        var fetchPreviousResults = function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, quizResults, myQuizResult, previousResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aws_amplify_1.Auth.currentAuthenticatedUser({ bypassCache: true })];
                    case 1:
                        userData = _a.sent();
                        return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.QuizResult)];
                    case 2:
                        quizResults = _a.sent();
                        myQuizResult = quizResults.filter(function (qr) { return qr.quizID === (quiz === null || quiz === void 0 ? void 0 : quiz.id) && qr.sub === (userData === null || userData === void 0 ? void 0 : userData.attributes.sub); });
                        previousResult = myQuizResult.reduce(function (acc, curr) { return !acc || curr["try"] > acc["try"] ? curr : acc; }, undefined);
                        setPreviousResults(previousResult);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchPreviousResults();
        var subscription = aws_amplify_1.DataStore.observe(models_1.QuizQuestion).subscribe(function () { return fetchQuestions(); });
        var subscriptionForPreviousResults = aws_amplify_1.DataStore.observe(models_1.UserTopicProgress).subscribe(function () { return fetchPreviousResults(); });
        return function () {
            subscription.unsubscribe();
            subscriptionForPreviousResults.unsubscribe();
        };
    }, [quiz]);
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(questionIndex === questions.length && questionIndex > 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, aws_amplify_1.Auth.currentAuthenticatedUser({ bypassCache: true })];
                    case 1:
                        userData = _a.sent();
                        if (!(quiz && userData)) return [3 /*break*/, 3];
                        return [4 /*yield*/, aws_amplify_1.DataStore.save(new models_1.QuizResult({
                                sub: userData === null || userData === void 0 ? void 0 : userData.attributes.sub,
                                nofQuestions: questions.length,
                                nofCorrectAnswers: numberOfCorrectAnswers,
                                percentage: numberOfCorrectAnswers / questions.length,
                                failedQuestionsIDs: wrongAnswersIDs,
                                "try": previousResults ? previousResults["try"] + 1 : 1,
                                quizID: quiz === null || quiz === void 0 ? void 0 : quiz.id
                            }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        // navigate to results screen
                        setAnsweredCorrectly(undefined);
                        setSelectedAnswers([]);
                        navigation.navigate("QuizEndScreen", { nOfQuestions: questions.length, nOfCorrectAnswers: numberOfCorrectAnswers });
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
        setAnsweredCorrectly(undefined);
        setSelectedAnswers([]);
    }, [questionIndex]);
    var onChoicePress = function (choice) {
        // if(!question) return;
        setSelectedAnswers(function (currentSelectedAnswers) {
            var _a;
            if (currentSelectedAnswers.includes(choice)) {
                return currentSelectedAnswers.filter(function (item) { return item !== choice; });
            }
            else {
                if ((question === null || question === void 0 ? void 0 : question.correctAnswers) && ((_a = question === null || question === void 0 ? void 0 : question.correctAnswers) === null || _a === void 0 ? void 0 : _a.length) > 1) {
                    return __spreadArray(__spreadArray([], currentSelectedAnswers, true), [choice], false);
                }
                else {
                    return [choice];
                }
            }
        });
    };
    var onSubmit = function () {
        var _a;
        if (!question)
            return;
        if (selectedAnswers.length !== ((_a = question.correctAnswers) === null || _a === void 0 ? void 0 : _a.length)) {
            setAnsweredCorrectly(false);
            return;
        }
        var isCorrect = question.correctAnswers.every(function (answer) { return selectedAnswers.includes(answer); });
        setAnsweredCorrectly(isCorrect);
        if (isCorrect) {
            setNumberOfCorrectAnswers(function (currentNumber) { return currentNumber + 1; });
        }
    };
    var onContinue = function () {
        setQuestionIndex(function (index) { return index + 1; });
    };
    (0, react_1.useLayoutEffect)(function () {
        navigation.setOptions({
            headerShown: true,
            title: 'Quiz'
        });
    }, []);
    if (!question) {
        return (<react_native_1.View className="h-screen items-center justify-center">
                <react_native_1.ActivityIndicator />
            </react_native_1.View>);
    }
    console.error = function (error) { return error.apply; }; // @TODO Disables the error message of Courier font, have to be replaced to Courier New
    return (<>
            <ProgressBar_1["default"] progress={questionIndex / (questions === null || questions === void 0 ? void 0 : questions.length)}/>
            <react_native_1.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }} style={QuizScreen_styles_1.styles.container}>
                <react_native_1.Text style={QuizScreen_styles_1.styles.question}>{(question === null || question === void 0 ? void 0 : question.question) || 'Loading...'}</react_native_1.Text>
                {!!question.image && (<aws_amplify_react_native_1.S3Image resizeMode={'contain'} imgKey={question.image} style={QuizScreen_styles_1.styles.questionImage}/>)}

                {!!question.content && (<react_native_markdown_display_1["default"]>{question.content}</react_native_markdown_display_1["default"]>)}

                {/*    Choices */}
                {question.choices && (<react_native_1.View style={QuizScreen_styles_1.styles.choicesContainer}>
                        {question.choices && (<>
                                {question.choices.map(function (choice, index) { return (<MultipleChoiceAnswer_1["default"] disabled={answeredCorrectly !== undefined} key={index} choice={choice} onPress={onChoicePress} isSelected={selectedAnswers.includes(choice)}/>); })}
                            </>)}
                    </react_native_1.View>)}
                {/*    Button */}

                    <CustomButton_1["default"] disabled={isButtonDisabled} text={'Submit'} onPress={onSubmit} style={QuizScreen_styles_1.styles.button}/>

            </react_native_1.ScrollView>
            {answeredCorrectly === true && (<react_native_reanimated_1["default"].View entering={react_native_reanimated_1.SlideInDown} exiting={react_native_reanimated_1.SlideInDown} className="bg-gray-100 rounded-t-xl px-4 pt-3 border border-gray-300 h-36" style={[QuizScreen_styles_1.styles.answerBox, QuizScreen_styles_1.styles.correctAnswerBox]}>
                    <react_native_1.Text style={QuizScreen_styles_1.styles.correctTitle}>Correct</react_native_1.Text>
                    <CustomButton_1["default"] text={'Continue'} onPress={onContinue} style={QuizScreen_styles_1.styles.button}/>
                </react_native_reanimated_1["default"].View>)}

            {answeredCorrectly === false && (<react_native_reanimated_1["default"].View entering={react_native_reanimated_1.SlideInDown} exiting={react_native_reanimated_1.SlideInDown} className="bg-gray-100 rounded-t-xl px-4 pt-3 h-36" style={[QuizScreen_styles_1.styles.answerBox, QuizScreen_styles_1.styles.wrongAnswerBox]}>
                    <react_native_1.Text style={QuizScreen_styles_1.styles.wrongTitle}>Bro wrong!</react_native_1.Text>
                    <CustomButton_1["default"] text={'Continue'} onPress={onContinue} style={QuizScreen_styles_1.styles.button}/>
                </react_native_reanimated_1["default"].View>)}
        </>);
};
exports["default"] = QuizScreen;
