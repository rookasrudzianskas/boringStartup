"use strict";
exports.__esModule = true;
// @ts-nocheck
var react_native_1 = require("react-native");
var Themed_1 = require("../components/Themed");
function NotFoundScreen(_a) {
    var navigation = _a.navigation;
    return (<Themed_1.View style={styles.container}>
      <Themed_1.Text style={styles.title}>This screen doesn't exist.</Themed_1.Text>
      <react_native_1.TouchableOpacity onPress={function () { return navigation.replace('Root'); }} style={styles.link}>
        <Themed_1.Text style={styles.linkText}>Go to home screen!</Themed_1.Text>
      </react_native_1.TouchableOpacity>
    </Themed_1.View>);
}
exports["default"] = NotFoundScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    link: {
        marginTop: 15,
        paddingVertical: 15
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7'
    }
});
