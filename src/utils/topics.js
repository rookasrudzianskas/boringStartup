"use strict";
exports.__esModule = true;
exports.getCurrentActiveLevel = exports.groupByLevel = void 0;
var groupByLevel = function (topics) {
    var levels = {};
    topics.forEach(function (topic) {
        if (!levels[topic.level]) {
            levels[topic.level] = [];
        }
        levels[topic.level].push(topic);
    });
    return Object.values(levels);
};
exports.groupByLevel = groupByLevel;
var getCurrentActiveLevel = function (levels) {
    // levels.filter((levelTopics) => levelTopics.every((topic) => topic.progress >= 1)) @TODO maybe the better solution with Maximum level
    return levels.reduce(function (acc, levelTopics) { return levelTopics.every(function (topic) { return topic.progress >= 1; }) ? acc + 1 : acc; }, 1);
};
exports.getCurrentActiveLevel = getCurrentActiveLevel;
