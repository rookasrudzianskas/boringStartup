// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Exercise, Quiz, QuizQuestion, Resource, Topic, UserTopicProgress, QuizResult } = initSchema(schema);

export {
  User,
  Exercise,
  Quiz,
  QuizQuestion,
  Resource,
  Topic,
  UserTopicProgress,
  QuizResult
};