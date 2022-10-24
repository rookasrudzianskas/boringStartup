import {QuizResult, Topic, UserTopicProgress} from "../models";

export type ResourceItem = {
    id: string;
    title: string;
    icon: string;
    completed?: boolean;
}

export type TopicWithResult = Topic & { progress?: UserTopicProgress, quizResult?: QuizResult, isQuizPassed?: boolean };
