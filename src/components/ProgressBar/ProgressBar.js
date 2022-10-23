"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var ProgressBar = function (_a) {
    var progress = _a.progress;
    return (<react_native_1.View className="bg-gray-200/40" style={{ height: 10 }}>
            <react_native_1.View className="bg-green-300 rounded-tr-lg rounded-br-lg" style={{ width: "".concat(Math.max(10, progress * 100), "%"), height: '100%' }}/>
        </react_native_1.View>);
};
exports["default"] = ProgressBar;
