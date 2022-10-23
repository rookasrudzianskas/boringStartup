"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
var MultipleChoiceAnswer = function (_a) {
    var choice = _a.choice, _b = _a.isSelected, isSelected = _b === void 0 ? false : _b, _c = _a.onPress, onPress = _c === void 0 ? function () { } : _c, otherProps = __rest(_a, ["choice", "isSelected", "onPress"]);
    return (<react_native_1.TouchableOpacity {...otherProps} onPress={function () { return onPress(choice); }} className="bg-gray-100" activeOpacity={0.7} style={[styles.container, isSelected ? { borderColor: Colors_1["default"].light.primary } : {}]}>
            <react_native_1.Text className="font-semibold" style={[styles.text, isSelected ? { color: Colors_1["default"].light.primary } : {}]}>
                {choice}
            </react_native_1.Text>

        </react_native_1.TouchableOpacity>);
};
exports["default"] = MultipleChoiceAnswer;
var styles = react_native_1.StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors_1["default"].light.tabIconDefault,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5
    },
    text: {
        color: Colors_1["default"].light.text
    }
});
