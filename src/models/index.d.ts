import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ExerciseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type QuizMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type QuizQuestionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ResourceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TopicMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserTopicProgressMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type QuizResultMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerUser = {
  readonly id: string;
  readonly sub: string;
  readonly expoNotificationToken?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly sub: string;
  readonly expoNotificationToken?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerExercise = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyExercise = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Exercise = LazyLoading extends LazyLoadingDisabled ? EagerExercise : LazyExercise

export declare const Exercise: (new (init: ModelInit<Exercise, ExerciseMetaData>) => Exercise) & {
  copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise, ExerciseMetaData>) => MutableModel<Exercise, ExerciseMetaData> | void): Exercise;
}

type EagerQuiz = {
  readonly id: string;
  readonly QuizQuestions?: (QuizQuestion | null)[] | null;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuiz = {
  readonly id: string;
  readonly QuizQuestions: AsyncCollection<QuizQuestion>;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Quiz = LazyLoading extends LazyLoadingDisabled ? EagerQuiz : LazyQuiz

export declare const Quiz: (new (init: ModelInit<Quiz, QuizMetaData>) => Quiz) & {
  copyOf(source: Quiz, mutator: (draft: MutableModel<Quiz, QuizMetaData>) => MutableModel<Quiz, QuizMetaData> | void): Quiz;
}

type EagerQuizQuestion = {
  readonly id: string;
  readonly question?: string | null;
  readonly image?: string | null;
  readonly content?: string | null;
  readonly choices?: string[] | null;
  readonly correctAnswers?: string[] | null;
  readonly quizID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuizQuestion = {
  readonly id: string;
  readonly question?: string | null;
  readonly image?: string | null;
  readonly content?: string | null;
  readonly choices?: string[] | null;
  readonly correctAnswers?: string[] | null;
  readonly quizID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type QuizQuestion = LazyLoading extends LazyLoadingDisabled ? EagerQuizQuestion : LazyQuizQuestion

export declare const QuizQuestion: (new (init: ModelInit<QuizQuestion, QuizQuestionMetaData>) => QuizQuestion) & {
  copyOf(source: QuizQuestion, mutator: (draft: MutableModel<QuizQuestion, QuizQuestionMetaData>) => MutableModel<QuizQuestion, QuizQuestionMetaData> | void): QuizQuestion;
}

type EagerResource = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyResource = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Resource = LazyLoading extends LazyLoadingDisabled ? EagerResource : LazyResource

export declare const Resource: (new (init: ModelInit<Resource, ResourceMetaData>) => Resource) & {
  copyOf(source: Resource, mutator: (draft: MutableModel<Resource, ResourceMetaData>) => MutableModel<Resource, ResourceMetaData> | void): Resource;
}

type EagerTopic = {
  readonly id: string;
  readonly title: string;
  readonly icon?: string | null;
  readonly level: number;
  readonly description?: string | null;
  readonly Resources?: (Resource | null)[] | null;
  readonly Exercises?: (Exercise | null)[] | null;
  readonly Quiz?: Quiz | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly topicQuizId?: string | null;
}

type LazyTopic = {
  readonly id: string;
  readonly title: string;
  readonly icon?: string | null;
  readonly level: number;
  readonly description?: string | null;
  readonly Resources: AsyncCollection<Resource>;
  readonly Exercises: AsyncCollection<Exercise>;
  readonly Quiz: AsyncItem<Quiz | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly topicQuizId?: string | null;
}

export declare type Topic = LazyLoading extends LazyLoadingDisabled ? EagerTopic : LazyTopic

export declare const Topic: (new (init: ModelInit<Topic, TopicMetaData>) => Topic) & {
  copyOf(source: Topic, mutator: (draft: MutableModel<Topic, TopicMetaData>) => MutableModel<Topic, TopicMetaData> | void): Topic;
}

type EagerUserTopicProgress = {
  readonly id: string;
  readonly sub: string;
  readonly completedResourceIDs: string[];
  readonly completedExerciseIDs: string[];
  readonly progress: number;
  readonly isCompleted?: boolean | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserTopicProgress = {
  readonly id: string;
  readonly sub: string;
  readonly completedResourceIDs: string[];
  readonly completedExerciseIDs: string[];
  readonly progress: number;
  readonly isCompleted?: boolean | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserTopicProgress = LazyLoading extends LazyLoadingDisabled ? EagerUserTopicProgress : LazyUserTopicProgress

export declare const UserTopicProgress: (new (init: ModelInit<UserTopicProgress, UserTopicProgressMetaData>) => UserTopicProgress) & {
  copyOf(source: UserTopicProgress, mutator: (draft: MutableModel<UserTopicProgress, UserTopicProgressMetaData>) => MutableModel<UserTopicProgress, UserTopicProgressMetaData> | void): UserTopicProgress;
}

type EagerQuizResult = {
  readonly id: string;
  readonly sub: string;
  readonly nofQuestions: number;
  readonly nofCorrectAnswers: number;
  readonly percentage: number;
  readonly failedQuestionsIDs?: string[] | null;
  readonly try: number;
  readonly quizID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuizResult = {
  readonly id: string;
  readonly sub: string;
  readonly nofQuestions: number;
  readonly nofCorrectAnswers: number;
  readonly percentage: number;
  readonly failedQuestionsIDs?: string[] | null;
  readonly try: number;
  readonly quizID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type QuizResult = LazyLoading extends LazyLoadingDisabled ? EagerQuizResult : LazyQuizResult

export declare const QuizResult: (new (init: ModelInit<QuizResult, QuizResultMetaData>) => QuizResult) & {
  copyOf(source: QuizResult, mutator: (draft: MutableModel<QuizResult, QuizResultMetaData>) => MutableModel<QuizResult, QuizResultMetaData> | void): QuizResult;
}