"use strict";
exports.__esModule = true;
var expo_status_bar_1 = require("expo-status-bar");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var useCachedResources_1 = require("./src/hooks/useCachedResources");
var useColorScheme_1 = require("./src/hooks/useColorScheme");
var navigation_1 = require("./src/navigation");
function App() {
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
}
exports["default"] = App;
