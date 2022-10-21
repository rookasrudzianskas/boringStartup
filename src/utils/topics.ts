import {Topic} from "../models";

export const groupByLevel = (topics: Topic[]) => {
    const levels: {[key: number]: Topic[]} = {};

    topics.forEach((topic) => {
        if (!levels[topic.level]) {
            levels[topic.level] = [];
        }
        levels[topic.level].push(topic);
    });

    return Object.values(levels);
}

export const getCurrentActiveLevel = (levels: Topic[][]) => {
    // levels.filter((levelTopics) => levelTopics.every((topic) => topic.progress >= 1)) @TODO maybe the better solution with Maximum level
    // @ts-ignore
    return levels.reduce((acc: number, levelTopics) => levelTopics.every((topic) => topic.progress >= 1) ? acc + 1 : acc, 1);
}
