// create context for module screen
import {createContext, useContext, useEffect, useState} from "react";
import {TopicWithResult} from "../types/models";
import {Auth, DataStore} from "aws-amplify";
import {QuizResult, Topic} from "../models";
import {getCurrentActiveLevel, groupByLevel} from "../utils/topics";

const ModuleContext = createContext({});

const ModuleContextProvider = ({ children }) => {
    const [levels, setLevels] = useState<TopicWithResult[][]>([]);
    const [currentLevel, setCurrentLevel] = useState<number>(0);

    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await DataStore.query(Topic);
            const topicsWithProgress = await addProgressToTopics(topics);
            const _levels = groupByLevel(topicsWithProgress);
            setCurrentLevel(getCurrentActiveLevel(_levels));
            setLevels(_levels);
        }
        fetchTopics();
        // const subscription = DataStore.observe(Topic).subscribe(() => fetchTopics());
        // return () => subscription.unsubscribe();
    }, []);

    const addProgressToTopics = async (topics: Topic[]): Promise<TopicWithResult[]> => {
        return await Promise.all(topics.map(addProgressToTopic));
    }

    const addProgressToTopic = async (topic: Topic) => {
        if(!topic.Quiz) {
            console.log('No quiz for topic', topic.id, topic.Quiz);
            return topic;
        }
        const userData = await Auth.currentAuthenticatedUser({ bypassCache: true });
        const userResults = (await DataStore.query(QuizResult)).filter(result => result.quizID === topic.Quiz?.id && result.sub === userData?.attributes.sub);
        if(userResults.length === 0) {
            // user has not started the quiz yet
            return topic;
        }
        const bestResult = userResults.reduce((best, result) => result.percentage > best.percentage ? result : best);
        return { ...topic, quizResult: bestResult, isQuizPassed: bestResult && bestResult.percentage >= 0.9};
    }



    return (
        <ModuleContext.Provider value={{

        }}>{children}
        </ModuleContext.Provider>
    );
}

export default ModuleContextProvider;

export const useModule = () => useContext(ModuleContext);
