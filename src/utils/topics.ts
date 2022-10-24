//@ts-nocheck
import {Topic} from "../models";
import {TopicWithResult} from "../types/models";

export const groupByLevel = (topics: Topic[]) => {
    const levels: {[key: number]: Topic[]} = {};

    // @TODO should be check
    topics.forEach((topic) => {
        if (!levels[topic.level]) {
            levels[topic.level] = [];
        }
        levels[topic.level].push(topic);
    });

    return Object.values(levels);
}

export const getCurrentActiveLevel = (levels: TopicWithResult[][]) => {
    // levels.filter((levelTopics) => levelTopics.every((topic) => topic.progress >= 1))
    // @ts-ignore
    return levels.reduce((acc, levelTopics) => levelTopics.every((topic) => topic.isQuizPassed) ? acc + 1 : acc, 1);
}
