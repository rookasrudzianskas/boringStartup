"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_svg_1 = require("react-native-svg");
var Colors_1 = require("../../constants/Colors");
var CircularProgress = function (props) {
    var size = props.size, strokeWidth = props.strokeWidth, progress = props.progress;
    var radius = (size - strokeWidth) / 2;
    var circum = radius * 2 * Math.PI;
    var svgProgress = (1 - props.progress) * 100;
    return (<react_native_1.View style={{ position: 'absolute', top: 0 }}>
            <react_native_svg_1.Svg width={size} height={size}>
                {/* Background Circle */}
                <react_native_svg_1.Circle stroke={
        // Colors.light.background
        '#E0E0E0'} fill="none" cx={size / 2} cy={size / 2} r={radius} {...{ strokeWidth: strokeWidth }}/>

                {/* Progress Circle */}
                {progress > 0 && (<react_native_svg_1.Circle stroke={(progress >= 1 ? Colors_1["default"].light.primary : Colors_1["default"].light.secondary)} fill="none" cx={size / 2} cy={size / 2} r={radius} strokeDasharray={"".concat(circum, " ").concat(circum)} strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)} strokeLinecap="round" transform={"rotate(-90, ".concat(size / 2, ", ").concat(size / 2, ")")} {...{ strokeWidth: strokeWidth }}/>)}

            </react_native_svg_1.Svg>
        </react_native_1.View>);
};
exports["default"] = CircularProgress;
