// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Exercise, Quiz, QuizQuestion, Resource, Topic } = initSchema(schema);

export {
  Exercise,
  Quiz,
  QuizQuestion,
  Resource,
  Topic
};