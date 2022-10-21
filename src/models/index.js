// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Exercise, Quiz, QuizQuestion, Resource, Topic, UserTopicProgress, QuizResult } = initSchema(schema);

export {
  Exercise,
  Quiz,
  QuizQuestion,
  Resource,
  Topic,
  UserTopicProgress,
  QuizResult
};