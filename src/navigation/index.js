"use strict";
exports.__esModule = true;
var vector_icons_1 = require("@expo/vector-icons");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var React = require("react");
var Colors_1 = require("../constants/Colors");
var useColorScheme_1 = require("../hooks/useColorScheme");
var NotFoundScreen_1 = require("../screens/NotFoundScreen");
var ModuleScreen_1 = require("../screens/ModuleScreen");
var LinkingConfiguration_1 = require("./LinkingConfiguration");
var ProfileScreen_1 = require("../screens/ProfileScreen");
var TopicScreen_1 = require("../screens/TopicScreen");
var QuizScreen_1 = require("../screens/QuizScreen");
var QuizEndScreen_1 = require("../screens/QuizEndScreen");
function Navigation(_a) {
    var colorScheme = _a.colorScheme;
    return (<native_1.NavigationContainer linking={LinkingConfiguration_1["default"]} theme={colorScheme === 'dark' ? native_1.DarkTheme : native_1.DefaultTheme}>
      <RootNavigator />
    </native_1.NavigationContainer>);
}
exports["default"] = Navigation;
var Stack = (0, native_stack_1.createNativeStackNavigator)();
function RootNavigator() {
    return (<Stack.Navigator initialRouteName={'Root'}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen_1["default"]} options={{ title: 'Oops!' }}/>
      <Stack.Screen name="Topic" component={TopicScreen_1["default"]} options={{ headerShown: false }}/>
      <Stack.Screen name="Quiz" component={QuizScreen_1["default"]} options={{ headerShown: false }}/>
      <Stack.Screen name="QuizEndScreen" component={QuizEndScreen_1["default"]} options={{ headerShown: false }}/>
    </Stack.Navigator>);
}
var BottomTab = (0, bottom_tabs_1.createBottomTabNavigator)();
function BottomTabNavigator() {
    var colorScheme = (0, useColorScheme_1["default"])();
    return (<BottomTab.Navigator initialRouteName="Module" screenOptions={{
            tabBarActiveTintColor: Colors_1["default"][colorScheme].tint
        }}>
      <BottomTab.Screen name="Module" component={ModuleScreen_1["default"]} options={{
            title: 'JS 101',
            tabBarIcon: function (_a) {
                var color = _a.color;
                return <vector_icons_1.Feather name="book" size={24} color={color}/>;
            }
        }}/>
      <BottomTab.Screen name="Profile" component={ProfileScreen_1["default"]} options={{
            title: 'Profile',
            tabBarIcon: function (_a) {
                var color = _a.color;
                return <vector_icons_1.FontAwesome name="user" size={24} color={color}/>;
            }
        }}/>
    </BottomTab.Navigator>);
}
