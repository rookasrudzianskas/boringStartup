"use strict";
exports.__esModule = true;
exports.groupByLevel = void 0;
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
// export const getCurrentActiveLevel = (levels: Topic[][]) => {
//     // levels.filter((levelTopics) => levelTopics.every((topic) => topic.progress >= 1)) @TODO maybe the better solution with Maximum level
//     // @ts-ignore
//     return levels.reduce((acc: number, levelTopics) => levelTopics.every((topic) => topic.progress >= 1) ? acc + 1 : acc, 1);
// }
