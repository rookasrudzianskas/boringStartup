"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
var ResourceListItem_1 = require("../../components/ResourceListItem");
var topics_1 = require("../../../assets/data/topics");
var react_native_markdown_display_1 = require("react-native-markdown-display");
var TopicScreen = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var topicId = route.params.id;
    var topic = topics_1["default"].find(function (topic) { return topic.id === topicId; });
    (0, react_1.useLayoutEffect)(function () {
        if (!topic)
            return;
        navigation.setOptions({
            headerShown: true,
            title: topic === null || topic === void 0 ? void 0 : topic.title
        });
    }, []);
    return (<react_native_1.View className="" style={styles.container}>
            <react_native_1.Image />
            <react_native_1.Text style={styles.title}>Resources</react_native_1.Text>
            <react_native_markdown_display_1["default"]>
                {(topic === null || topic === void 0 ? void 0 : topic.description) || 'Loading...'}
            </react_native_markdown_display_1["default"]>
            {topic.resources && (<>
                    {topic === null || topic === void 0 ? void 0 : topic.resources.map(function (resource, index) { return (<ResourceListItem_1["default"] resource={resource} key={resource.id} index={index} isLast={index + 1 === topic.resources.length}/>); })}
                </>)}
        </react_native_1.View>);
};
exports["default"] = TopicScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: Colors_1["default"].light.white,
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1
    }
});
