"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var TopicSection = function (_a) {
    var title = _a.title, children = _a.children, _b = _a.display, display = _b === void 0 ? false : _b;
    if (!display) {
        return null;
    }
    return (<react_native_1.View style={styles.container}>
            <react_native_1.Text style={styles.title}>{title || "Loading..."}</react_native_1.Text>
            <>
                {children}
            </>
        </react_native_1.View>);
};
exports["default"] = TopicSection;
var styles = react_native_1.StyleSheet.create({
    container: {
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1,
        marginBottom: 20
    }
});
