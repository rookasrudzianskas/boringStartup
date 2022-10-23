"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var expo_status_bar_1 = require("expo-status-bar");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var useCachedResources_1 = require("./src/hooks/useCachedResources");
var useColorScheme_1 = require("./src/hooks/useColorScheme");
var navigation_1 = require("./src/navigation");
var aws_amplify_1 = require("aws-amplify");
var aws_exports_1 = require("./src/aws-exports");
var Auth_1 = require("aws-amplify-react-native/src/Auth");
var AmplifyTheme_1 = require("aws-amplify-react-native/src/AmplifyTheme");
var Colors_1 = require("./src/constants/Colors");
aws_amplify_1.Amplify.configure(__assign(__assign({}, aws_exports_1["default"]), { Analytics: { disabled: true } }));
var App = function () {
    var isLoadingComplete = (0, useCachedResources_1["default"])();
    var colorScheme = (0, useColorScheme_1["default"])();
    if (!isLoadingComplete) {
        return null;
    }
    else {
        return (<react_native_safe_area_context_1.SafeAreaProvider>
                <navigation_1["default"] colorScheme={colorScheme}/>
                <expo_status_bar_1.StatusBar />
            </react_native_safe_area_context_1.SafeAreaProvider>);
    }
};
var signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Email',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string',
            placeholder: 'Email'
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password',
            placeholder: 'Password'
        }
    ]
};
var customTheme = __assign(__assign({}, AmplifyTheme_1["default"]), { button: __assign(__assign({}, AmplifyTheme_1["default"].button), { backgroundColor: Colors_1["default"].light.primary, borderRadius: 5 }), buttonDisabled: __assign(__assign({}, AmplifyTheme_1["default"].buttonDisabled), { backgroundColor: Colors_1["default"].light.tabIconDefault, borderRadius: 5 }), sectionFooterLink: __assign(__assign({}, AmplifyTheme_1["default"].sectionFooterLink), { color: Colors_1["default"].light.primary }) });
exports["default"] = (0, Auth_1.withAuthenticator)(App, {
    signUpConfig: signUpConfig,
    theme: customTheme
});
