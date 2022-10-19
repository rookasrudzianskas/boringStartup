"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
var CircularProgress_1 = require("../CircularProgress");
var native_1 = require("@react-navigation/native");
var TopicNode = function (_a) {
    var topic = _a.topic, _b = _a.isDisabled, isDisabled = _b === void 0 ? true : _b;
    var width = (0, react_native_1.useWindowDimensions)().width;
    var navigation = (0, native_1.useNavigation)();
    var itemsWidth = width / 3 - 30;
    var onPress = function () {
        navigation.navigate('Topic', { id: topic.id });
    };
    return (<react_native_1.TouchableOpacity disabled={isDisabled} onPress={onPress} activeOpacity={isDisabled ? 1 : 0.7} style={[styles.container, { width: itemsWidth }]}>
            <react_native_1.View style={[styles.progress]}>
                <CircularProgress_1["default"] size={itemsWidth} strokeWidth={8} progress={topic.progress}/>
                    <react_native_1.View style={[styles.circle, { width: itemsWidth - 20, backgroundColor: isDisabled ? Colors_1["default"].light.dark : Colors_1["default"].light.primary }]}>
                        <react_native_1.Image source={{ uri: topic === null || topic === void 0 ? void 0 : topic.icon }} style={styles.image}/>
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
