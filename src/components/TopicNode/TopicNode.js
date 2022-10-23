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
var CircularProgress_1 = require("../CircularProgress");
var native_1 = require("@react-navigation/native");
var aws_amplify_react_native_1 = require("aws-amplify-react-native");
var vector_icons_1 = require("@expo/vector-icons");
var aws_amplify_1 = require("aws-amplify");
var models_1 = require("../../models");
var TopicNode = function (_a) {
    var topic = _a.topic, _b = _a.isDisabled, isDisabled = _b === void 0 ? false : _b;
    var width = (0, react_native_1.useWindowDimensions)().width;
    var _c = (0, react_1.useState)(0), progress = _c[0], setProgress = _c[1];
    var navigation = (0, native_1.useNavigation)();
    var itemsWidth = width / 3 - 30;
    (0, react_1.useEffect)(function () {
        // if(!topic) return;
        // @TODO subscribe on the user progress changes -- IMPROVEMENT
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, userTopicProgresses, userProgress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, aws_amplify_1.Auth.currentAuthenticatedUser({ bypassCache: true })];
                    case 1:
                        userData = _a.sent();
                        return [4 /*yield*/, aws_amplify_1.DataStore.query(models_1.UserTopicProgress)];
                    case 2:
                        userTopicProgresses = _a.sent();
                        userProgress = userTopicProgresses.find(function (tp) { return tp.topicID === (topic === null || topic === void 0 ? void 0 : topic.id) && tp.sub === (userData === null || userData === void 0 ? void 0 : userData.attributes.sub); });
                        setProgress((userProgress === null || userProgress === void 0 ? void 0 : userProgress.progress) || 0);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [topic]);
    var onPress = function () {
        navigation.navigate('Topic', { id: topic.id });
    };
    return (<react_native_1.TouchableOpacity disabled={isDisabled} onPress={onPress} activeOpacity={isDisabled ? 1 : 0.7} style={[styles.container, { width: itemsWidth }]}>
            <react_native_1.View style={[styles.progress]}>
                <CircularProgress_1["default"] size={itemsWidth} strokeWidth={8} progress={progress}/>
                    <react_native_1.View style={[styles.circle, { width: itemsWidth - 20, backgroundColor: isDisabled ? Colors_1["default"].light.dark : Colors_1["default"].light.primary }]}>
                        {topic.icon ? (<aws_amplify_react_native_1.S3Image imgKey={topic.icon} source={{ uri: topic === null || topic === void 0 ? void 0 : topic.icon }} style={styles.image}/>) : (<vector_icons_1.AntDesign name="questioncircleo" size={35} color="black"/>)}
                    </react_native_1.View>
            </react_native_1.View>
                <react_native_1.Text style={styles.title}>{(topic === null || topic === void 0 ? void 0 : topic.title) || 'Loading...'}</react_native_1.Text>
        </react_native_1.TouchableOpacity>);
};
exports["default"] = TopicNode;
var styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
        maxWidth: 150
    },
    progress: {
        width: "100%",
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        alignSelf: 'center',
        aspectRatio: 1,
        borderRadius: 999,
        backgroundColor: Colors_1["default"].light.tertiary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "50%",
        aspectRatio: 1
    },
    title: {
        marginVertical: 5,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    }
});
