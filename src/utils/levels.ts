import topics from "../../assets/data/topics";

export const groupByLevel = (topics: any[]) => {
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
