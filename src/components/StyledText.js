"use strict";
// @ts-nocheck
exports.__esModule = true;
exports.MonoText = void 0;
var Themed_1 = require("./Themed");
function MonoText(props) {
    return <Themed_1.Text {...props} style={[props.style, { fontFamily: 'space-mono' }]}/>;
}
exports.MonoText = MonoText;
