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
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
var ResourceListItem_1 = require("../../components/ResourceListItem");
var react_native_markdown_display_1 = require("react-native-markdown-display");
var TopicSection_1 = require("./TopicSection");
var CustomButton_1 = require("../../components/CustomButton");
var useApplyHeaderWorkaround_1 = require("../../hooks/useApplyHeaderWorkaround");
var models_1 = require("../../models");
var aws_amplify_1 = require("aws-amplify");
var TopicScreen = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var topicId = route.params.id;
    var _b = (0, react_1.useState)(), topic = _b[0], setTopic = _b[1];
    var _c = (0, react_1.useState)(), userTopicProgress = _c[0], setUserTopicProgress = _c[1];
    var _d = (0, react_1.useState)([]), resources = _d[0], setResources = _d[1];
    var _e = (0, react_1.useState)([]), exercises = _e[0], setExercises = _e[1];
    (0, react_1.useLayoutEffect)(function () {
        // @TODO does it work?
        // if(!topic) return;
        navigation.setOptions({
            headerShown: true,
            title: (topic === null || topic === void 0 ? void 0 : topic.title) || "Loading..."
        });
    }, []);
    // @TODO does it work?
    (0, useApplyHeaderWorkaround_1["default"])(navigation.setOptions);
    (0, react_1.useEffect)(function () {
        var fetchTopic = function () { return __awaiter(void 0, void 0, void 0, function () {
            var topic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.Topic, topicId)];
                    case 1:
                        topic = _a.sent();
                        setTopic(topic);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchTopic();
    }, [topicId]);
    (0, react_1.useEffect)(function () {
        if (topic) {
            navigation.setOptions({ title: topic.title });
        }
        var fetchTopicDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
            var resource, exercises, userData, userTopicProgresses, userProgress, newUserProgress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!topic)
                            return [2 /*return*/];
                        return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.Resource).then(function (resources) { return resources.filter(function (resource) { return resource.topicID === (topic === null || topic === void 0 ? void 0 : topic.id); }); })];
                    case 1:
                        resource = _a.sent();
                        setResources(resource);
                        return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.Exercise).then(function (exercises) { return exercises.filter((function (r) { return r.topicID === (topic === null || topic === void 0 ? void 0 : topic.id); })); })];
                    case 2:
                        exercises = _a.sent();
                        setExercises(exercises);
                        return [4 /*yield*/, aws_amplify_1.Auth.currentAuthenticatedUser({ bypassCache: true })];
                    case 3:
                        userData = _a.sent();
                        return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.UserTopicProgress)];
                    case 4:
                        userTopicProgresses = _a.sent();
                        userProgress = userTopicProgresses.find(function (tp) { return tp.topicID === (topic === null || topic === void 0 ? void 0 : topic.id) && tp.sub === (userData === null || userData === void 0 ? void 0 : userData.attributes.sub); });
                        if (!userProgress) return [3 /*break*/, 5];
                        setUserTopicProgress(userProgress);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, aws_amplify_1.DataStore.save(new models_1.UserTopicProgress({
                            sub: userData === null || userData === void 0 ? void 0 : userData.attributes.sub,
                            completedResourceIDs: [],
                            completedExerciseIDs: [],
                            progress: 0,
                            topicID: topic === null || topic === void 0 ? void 0 : topic.id
                        }))];
                    case 6:
                        newUserProgress = _a.sent();
                        setUserTopicProgress(newUserProgress);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        fetchTopicDetails();
    }, [topic]);
    var onStartQuiz = function () {
        if (topic === null || topic === void 0 ? void 0 : topic.topicQuizId) {
            navigation.navigate("Quiz", { id: topic === null || topic === void 0 ? void 0 : topic.topicQuizId });
        }
    };
    var onResourceComplete = function (resource) { return __awaiter(void 0, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userTopicProgress)
                        return [2 /*return*/];
                    return [4 /*yield*/, aws_amplify_1.DataStore.save(models_1.UserTopicProgress.copyOf(userTopicProgress, function (updated) {
                            if (!updated.completedResourceIDs.includes(resource.id)) {
                                updated.completedResourceIDs.push(resource.id);
                                var progress = (userTopicProgress.completedResourceIDs.length + userTopicProgress.completedExerciseIDs.length + 1) / (resources.length + exercises.length);
                                updated.progress = progress;
                            }
                        }))];
                case 1:
                    updated = _a.sent();
                    setUserTopicProgress(updated);
                    return [2 /*return*/];
            }
        });
    }); };
    var onExerciseComplete = function (exercise) { return __awaiter(void 0, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userTopicProgress)
                        return [2 /*return*/];
                    return [4 /*yield*/, aws_amplify_1.DataStore.save(models_1.UserTopicProgress.copyOf(userTopicProgress, function (updated) {
                            if (!updated.completedExerciseIDs.includes(exercise.id)) {
                                updated.completedExerciseIDs.push(exercise.id);
                                var progress = (userTopicProgress.completedResourceIDs.length + userTopicProgress.completedExerciseIDs.length + 1) / (resources.length + exercises.length);
                                updated.progress = progress;
                            }
                        }))];
                case 1:
                    updated = _a.sent();
                    setUserTopicProgress(updated);
                    return [2 /*return*/];
            }
        });
    }); };
    if (!topic && !userTopicProgress) {
        return (<react_native_1.View className="h-screen items-center justify-center">
                <react_native_1.ActivityIndicator />
            </react_native_1.View>);
    }
    console.error = function (error) { return error.apply; }; // @TODO Disables the error message of Courier font, have to be replaced to Courier New
    return (<react_native_1.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }} className="" style={styles.container}>
            <react_native_1.SafeAreaView>
                <react_native_1.Image />
                <TopicSection_1["default"] display={!!(topic === null || topic === void 0 ? void 0 : topic.description)} title={'Intro'}>
                    <react_native_markdown_display_1["default"]>
                        {(topic === null || topic === void 0 ? void 0 : topic.description) || 'Loading...'}
                    </react_native_markdown_display_1["default"]>
                </TopicSection_1["default"]>

                <TopicSection_1["default"] display={!!resources.length} title={'Resources'}>
                    {resources && (<>
                            {resources.map(function (resource, index) { return (<ResourceListItem_1["default"] resource={resource} key={resource.id} index={index} isLast={index + 1 === resources.length} onComplete={onResourceComplete} isCompleted={userTopicProgress === null || userTopicProgress === void 0 ? void 0 : userTopicProgress.completedResourceIDs.includes(resource === null || resource === void 0 ? void 0 : resource.id)}/>); })}
                        </>)}
                </TopicSection_1["default"]>

                {/* @TODO Fix Context section */}
                {/*<TopicSection title={'Context'} display={!!topic?.context}>*/}
                {/*    <Markdown>{topic?.context || 'Loading...'}</Markdown>*/}
                {/*</TopicSection>*/}

                <TopicSection_1["default"] title={'Practice'} display={!!exercises.length}>
                    {exercises && (<>
                            {exercises.map(function (exercise, index) { return (
            // @TODO resource or exercise?
            <ResourceListItem_1["default"] resource={exercise} key={exercise.id} index={index} isLast={index + 1 === exercises.length} onComplete={onExerciseComplete} isCompleted={userTopicProgress === null || userTopicProgress === void 0 ? void 0 : userTopicProgress.completedExerciseIDs.includes(exercise === null || exercise === void 0 ? void 0 : exercise.id)}/>); })}
                        </>)}
                </TopicSection_1["default"]>

                {(topic === null || topic === void 0 ? void 0 : topic.topicQuizId) && (<CustomButton_1["default"] text={'Start Quiz'} onPress={onStartQuiz}/>)}

            </react_native_1.SafeAreaView>
        </react_native_1.ScrollView>);
};
exports["default"] = TopicScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: Colors_1["default"].light.white,
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1,
        marginTop: 20,
        marginBottom: 25,
        marginTop: 10
    }
});
