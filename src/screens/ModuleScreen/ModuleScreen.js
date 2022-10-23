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
var TopicNode_1 = require("../../components/TopicNode");
var TopicNodesRow_1 = require("../../components/TopicNodesRow");
var topics_1 = require("../../utils/topics");
var aws_amplify_1 = require("aws-amplify");
var models_1 = require("../../models");
var react_native_2 = require("react-native");
react_native_2.LogBox.ignoreLogs(['DataStore - subscriptionError Connection failed: Connection handshake error', 'DataStore {"cause": {"error": {"errors"']);
// console.log(currentLevel);
var ModuleScreen = function () {
    var _a = (0, react_1.useState)([]), levels = _a[0], setLevels = _a[1];
    var _b = (0, react_1.useState)(0), currentLevel = _b[0], setCurrentLevel = _b[1];
    (0, react_1.useEffect)(function () {
        var fetchTopics = function () { return __awaiter(void 0, void 0, void 0, function () {
            var topics, topicsWithProgress, _levels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.Topic)];
                    case 1:
                        topics = _a.sent();
                        return [4 /*yield*/, addProgressToTopics(topics)];
                    case 2:
                        topicsWithProgress = _a.sent();
                        _levels = (0, topics_1.groupByLevel)(topicsWithProgress);
                        setLevels(_levels);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchTopics();
        // const subscription = DataStore.observe(Topic).subscribe(() => fetchTopics());
        // return () => subscription.unsubscribe();
    }, []);
    var addProgressToTopics = function (topics) {
        return topics.map(addProgressToTopic);
    };
    var addProgressToTopic = function (topic) {
        console.log("THIS IS TOPIC>>>>>", topic);
        return topic;
    };
    // @TODO Current levels are not coded yet
    // useEffect(() => {
    //     setCurrentLevel(getCurrentActiveLevel(levels));
    // }, [levels]);
    return (<react_native_1.View style={styles.container}>

            <react_native_1.FlatList data={levels} keyExtractor={function (item) { var _a; return (_a = item[0].level) === null || _a === void 0 ? void 0 : _a.toString(); }} // @TODO does it work?
     showsVerticalScrollIndicator={false} bounces={true} renderItem={function (_a) {
            var item = _a.item;
            return (<TopicNodesRow_1["default"]>
                        {item.map(function (topic) { return (<TopicNode_1["default"] key={topic.id} topic={topic}/>); })}
                    </TopicNodesRow_1["default"]>);
        }}/>
        </react_native_1.View>);
};
exports["default"] = ModuleScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
