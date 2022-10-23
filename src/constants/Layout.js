"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var width = react_native_1.Dimensions.get('window').width;
var height = react_native_1.Dimensions.get('window').height;
exports["default"] = {
    window: {
        width: width,
        height: height
    },
    isSmallDevice: width < 375
};
