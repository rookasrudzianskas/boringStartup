import {QuizResult, Topic} from "../models";

export type ResourceItem = {
    id: string;
    title: string;
    icon: string;
    completed?: boolean;
}

export type TopicWithResult = Topic & { quizResult?: QuizResult };
