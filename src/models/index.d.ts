import { ModelInit, MutableModel } from "@aws-amplify/datastore";

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

export declare class Quiz {
  readonly id: string;
  readonly QuizQuestions?: (QuizQuestion | null)[] | null;
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
  readonly Exercises?: (Resource | null)[] | null;
  readonly Quiz?: Quiz | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly topicQuizId?: string | null;
  constructor(init: ModelInit<Topic, TopicMetaData>);
  static copyOf(source: Topic, mutator: (draft: MutableModel<Topic, TopicMetaData>) => MutableModel<Topic, TopicMetaData> | void): Topic;
}