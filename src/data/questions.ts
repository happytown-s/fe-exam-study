import type { Question } from '../core/types';
import { quizConfig } from './config';
import { questions as hardwareQ } from './fe-hardware';
import { questions as softwareQ } from './fe-software';
import { questions as databaseQ } from './fe-database';
import { questions as networkQ } from './fe-network';
import { questions as securityQ } from './fe-security';
import { questions as managementQ } from './fe-management';
import { questions as devMethodsQ } from './fe-dev-methods';
import { questions as projectMgmtQ } from './fe-project-mgmt';
import { questions as serviceMgmtQ } from './fe-service-mgmt';

export const allQuestions: Question[] = [
  ...hardwareQ,
  ...softwareQ,
  ...databaseQ,
  ...networkQ,
  ...securityQ,
  ...managementQ,
  ...devMethodsQ,
  ...projectMgmtQ,
  ...serviceMgmtQ,
];

export const categories = quizConfig.categories;
export { quizConfig };
