// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ResourceTypes = {
  "DOCS": "DOCS",
  "VIDEO": "VIDEO",
  "BLOG": "BLOG",
  "BOOK": "BOOK",
  "COURSE": "COURSE",
  "NEWSLETTER": "NEWSLETTER"
};

const { User, Exercise, Quiz, QuizQuestion, Resource, Topic, UserTopicProgress, QuizResult } = initSchema(schema);

export {
  User,
  Exercise,
  Quiz,
  QuizQuestion,
  Resource,
  Topic,
  UserTopicProgress,
  QuizResult,
  ResourceTypes
};