import topics from "../../assets/data/topics";
import {Topic} from "../types/models";

export const groupByLevel = (topics: Topic[]) => {
    // @TODO make this proper type
    const levels: {[key: number]: any[]} = {};

    topics.forEach((topic) => {
        if (!levels[topic.level]) {
            levels[topic.level] = [];
        }
        levels[topic.level].push(topic);
    });

    return Object.values(levels);
}

export const getCurrentActiveLevel = (levels: Topic[][]) => {
    let currentLevel = 1;
    // levels.filter((levelTopics) => levelTopics.every((topic) => topic.progress >= 1)) @TODO maybe the better solution with Maximum level
    levels.forEach((levelTopics) => {
        const isLevelComplete  = levelTopics.every((topic) => topic.progress >= 1);
        if(isLevelComplete) {
            currentLevel++;
        }
    });
    return currentLevel;
}
