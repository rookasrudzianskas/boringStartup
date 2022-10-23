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
var CustomButton = function (_a) {
    var text = _a.text, style = _a.style, disabled = _a.disabled, _b = _a.type, type = _b === void 0 ? "PRIMARY" : _b, otherProps = __rest(_a, ["text", "style", "disabled", "type"]);
    var buttonStyle = styles["container_".concat(type)];
    var textStyle = styles["text_".concat(type)];
    return (<react_native_1.TouchableOpacity style={[styles.container, buttonStyle, style, disabled && { backgroundColor: Colors_1["default"].light.tabIconDefault }]} disabled={disabled} activeOpacity={0.7} {...otherProps}>
            <react_native_1.Text style={[styles.text, textStyle]}>{text}</react_native_1.Text>
        </react_native_1.TouchableOpacity>);
};
exports["default"] = CustomButton;
var styles = react_native_1.StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    container_PRIMARY: {
        backgroundColor: Colors_1["default"].light.primary
    },
    container_SECONDARY: {
        borderWidth: 2,
        borderColor: Colors_1["default"].light.primary
    },
    container_TERTIARY: {},
    text: {
        color: Colors_1["default"].light.white,
        fontSize: 16,
        fontWeight: '500'
    },
    text_PRIMARY: {},
    text_SECONDARY: {
        color: Colors_1["default"].light.primary
    },
    text_TERTIARY: {
        color: Colors_1["default"].light.primary
    }
});
