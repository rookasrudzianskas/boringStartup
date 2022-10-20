// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Quiz, QuizQuestion, Resource, Topic } = initSchema(schema);

export {
  Quiz,
  QuizQuestion,
  Resource,
  Topic
};