"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
var vector_icons_1 = require("@expo/vector-icons");
var WebBrowser = require("expo-web-browser");
var ResourceListItem = function (_a) {
    var resource = _a.resource, index = _a.index, isLast = _a.isLast, _b = _a.onComplete, onComplete = _b === void 0 ? function () { } : _b, _c = _a.isCompleted, isCompleted = _c === void 0 ? false : _c;
    var onPress = function () {
        // Linking.openURL(resource.url || 'www.w3schools.com');
        if (!resource.url)
            return;
        WebBrowser.openBrowserAsync((resource === null || resource === void 0 ? void 0 : resource.url) || 'https://expo.dev');
        onComplete(resource);
    };
    return (<react_native_1.TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <react_native_1.View style={[styles.indexContainer, isCompleted && styles.completed]}>
                {isCompleted ? (<vector_icons_1.Ionicons name="checkmark" size={22} color="white"/>) : (<react_native_1.Text>{index + 1}</react_native_1.Text>)}
            </react_native_1.View>
            <react_native_1.Text>{resource === null || resource === void 0 ? void 0 : resource.title}</react_native_1.Text>
            {(resource === null || resource === void 0 ? void 0 : resource.url) && (<vector_icons_1.Ionicons name="open-outline" size={21} color="black" style={styles.icon}/>)}
            {!isLast && (<react_native_1.View style={[styles.lineIndicator, { backgroundColor: isCompleted ? Colors_1["default"].light.primary : Colors_1["default"].light.dark }]}/>)}
        </react_native_1.TouchableOpacity>);
};
exports["default"] = ResourceListItem;
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: 'center'
    },
    indexContainer: {
        width: 30,
        borderWidth: 2,
        borderColor: Colors_1["default"].light.dark,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        marginRight: 5
    },
    completed: {
        backgroundColor: Colors_1["default"].light.primary,
        borderColor: Colors_1["default"].light.primary
    },
    icon: {
        marginLeft: "auto"
    },
    lineIndicator: {
        position: 'absolute',
        height: 20,
        width: 2,
        left: 15,
        top: 30,
        backgroundColor: Colors_1["default"].light.primary
    }
});