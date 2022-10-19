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

export const getCurrentActiveLevel = (topics: Topic[]) => {

}
