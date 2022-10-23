"use strict";
exports.__esModule = true;
/**
 * React Native Screens and Reanimated Layout Effects combined result in an issue where the content falls below the native header.
 * To make things worse this issue seems to "fix" itself on Android 10 when the keyboard is opened.
 * This makes it difficult to work around the issue because it's not consistent.
 *
 * As a workaround we force the header to render transparent (position absolute above the content)
 * and add the correct insets as padding. At least this way it works consistently.
 *
 * The issue is tracked here: https://github.com/software-mansion/react-native-reanimated/issues/2906
 */
// @ts-nocheck
var elements_1 = require("@react-navigation/elements");
var react_1 = require("react");
var react_native_1 = require("react-native");
function useApplyHeaderWorkaround(setOptions) {
    var headerHeight = (0, elements_1.useHeaderHeight)();
    var androidHeaderFix = (0, react_1.useMemo)(function () { return ({
        headerTransparent: true,
        headerStyle: { backgroundColor: 'white' },
        contentStyle: { paddingTop: headerHeight }
    }); }, [headerHeight]);
    react_1["default"].useLayoutEffect(function () {
        react_native_1.Platform.OS === 'android' && setOptions(androidHeaderFix);
    }, [setOptions, androidHeaderFix]);
}
exports["default"] = useApplyHeaderWorkaround;
