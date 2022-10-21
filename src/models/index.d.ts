import { ModelInit, MutableModel } from "@aws-amplify/datastore";

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

export declare class Exercise {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Exercise, ExerciseMetaData>);
  static copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise, ExerciseMetaData>) => MutableModel<Exercise, ExerciseMetaData> | void): Exercise;
}

export declare class Quiz {
  readonly id: string;
  readonly QuizQuestions?: (QuizQuestion | null)[] | null;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Quiz, QuizMetaData>);
  static copyOf(source: Quiz, mutator: (draft: MutableModel<Quiz, QuizMetaData>) => MutableModel<Quiz, QuizMetaData> | void): Quiz;
}

export declare class QuizQuestion {
  readonly id: string;
  readonly question?: string | null;
  readonly image?: string | null;
  readonly content?: string | null;
  readonly choices?: string[] | null;
  readonly correctAnswers?: string[] | null;
  readonly quizID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<QuizQuestion, QuizQuestionMetaData>);
  static copyOf(source: QuizQuestion, mutator: (draft: MutableModel<QuizQuestion, QuizQuestionMetaData>) => MutableModel<QuizQuestion, QuizQuestionMetaData> | void): QuizQuestion;
}

export declare class Resource {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Resource, ResourceMetaData>);
  static copyOf(source: Resource, mutator: (draft: MutableModel<Resource, ResourceMetaData>) => MutableModel<Resource, ResourceMetaData> | void): Resource;
}

export declare class Topic {
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
  constructor(init: ModelInit<Topic, TopicMetaData>);
  static copyOf(source: Topic, mutator: (draft: MutableModel<Topic, TopicMetaData>) => MutableModel<Topic, TopicMetaData> | void): Topic;
}

export declare class UserTopicProgress {
  readonly id: string;
  readonly sub: string;
  readonly completedResourceIDs: string[];
  readonly completedExerciseIDs: string[];
  readonly progress: number;
  readonly isCompleted?: boolean | null;
  readonly topicID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserTopicProgress, UserTopicProgressMetaData>);
  static copyOf(source: UserTopicProgress, mutator: (draft: MutableModel<UserTopicProgress, UserTopicProgressMetaData>) => MutableModel<UserTopicProgress, UserTopicProgressMetaData> | void): UserTopicProgress;
}

export declare class QuizResult {
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
  constructor(init: ModelInit<QuizResult, QuizResultMetaData>);
  static copyOf(source: QuizResult, mutator: (draft: MutableModel<QuizResult, QuizResultMetaData>) => MutableModel<QuizResult, QuizResultMetaData> | void): QuizResult;
}