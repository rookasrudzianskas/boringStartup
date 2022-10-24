// create context for module screen
import {createContext, useContext, useEffect, useState} from "react";
import {TopicWithResult} from "../types/models";
import {Auth, DataStore} from "aws-amplify";
import {QuizResult, Topic, UserTopicProgress} from "../models";
import {getCurrentActiveLevel, groupByLevel} from "../utils/topics";
import {LogBox} from "react-native";


interface ModuleContextData {
    levels?: TopicWithResult[][],
    currentLevel?: number,
}

LogBox.ignoreLogs(['DataStore - subscriptionError Connection failed: Connection handshake error', 'DataStore {"cause": {"error": {"errors"']);

const ModuleContext = createContext<ModuleContextData>({});
const ModuleContextProvider = ({ children }) => {
    const [topics, setTopics] = useState<TopicWithResult[]>([]);
    const [levels, setLevels] = useState<TopicWithResult[][]>([]);
    const [currentLevel, setCurrentLevel] = useState<number>(0);

    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await DataStore.query(Topic);
            const topicsWithProgress = await addProgressToTopics(topics);
            setTopics(topicsWithProgress);
        }
        fetchTopics();
        // const subscription = DataStore.observe(Topic).subscribe(() => fetchTopics());
        // return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const _levels = groupByLevel(topics);
        setCurrentLevel(getCurrentActiveLevel(_levels));
        setLevels(_levels);
    }, [topics]);

    const addProgressToTopics = async (topics: Topic[]): Promise<TopicWithResult[]> => {
        return await Promise.all(topics.map(addProgressToTopic));
    }

    const addProgressToTopic = async (topic: Topic) => {
        const topicWithProgress: TopicWithResult = {...topic};
        const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });

        // Topic Progress
        const userTopicProgresses = await DataStore.query(UserTopicProgress);
        const userProgress = userTopicProgresses.find((tp) => tp.topicID === topic?.id && tp.sub === userData?.attributes.sub);

        if(userProgress) {
            topicWithProgress.progress = userProgress;
        }

        // Quiz Results
        if(topic.Quiz) {
            const userResults = (await DataStore.query(QuizResult)).filter(result => result.quizID === topic.Quiz?.id && result.sub === userData?.attributes.sub);
            if(userResults.length !== 0) {
                const bestResult = userResults.reduce((best, result) => result.percentage > best.percentage ? result : best);
                topicWithProgress.quizResult = bestResult;
                topicWithProgress.isQuizPassed = bestResult && bestResult.percentage >= 0.9
            }
        }

        return topicWithProgress;
    }

    return (
        <ModuleContext.Provider value={{
            levels,
            currentLevel,
        }}>{children}
        </ModuleContext.Provider>
    );
}

export default ModuleContextProvider;

export const useModuleContext = () => useContext(ModuleContext);
