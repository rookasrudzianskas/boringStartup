"use strict";
exports.__esModule = true;
//@ts-nocheck
var react_1 = require("react");
var react_native_1 = require("react-native");
var TopicNode_1 = require("../../components/TopicNode");
var TopicNodesRow_1 = require("../../components/TopicNodesRow");
var topics_ts_1 = require("../../../assets/data/topics.ts");
var topics_1 = require("../../utils/topics");
var levels = (0, topics_1.groupByLevel)(topics_ts_1["default"]);
var currentLevel = (0, topics_1.getCurrentActiveLevel)(levels);
// console.log(currentLevel);
var ModuleScreen = function () {
    return (<react_native_1.View style={styles.container}>

            <react_native_1.FlatList data={levels} keyExtractor={function (item) { return item[0].level.toString(); }} // @TODO does it work?
     showsVerticalScrollIndicator={false} bounces={true} renderItem={function (_a) {
            var item = _a.item;
            return (<TopicNodesRow_1["default"]>
                        {item.map(function (topic) { return (<TopicNode_1["default"] key={topic.id} topic={topic} isDisabled={currentLevel < topic.level}/>); })}
                    </TopicNodesRow_1["default"]>);
        }}/>
        </react_native_1.View>);
};
exports["default"] = ModuleScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
