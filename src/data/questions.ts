import type { Question } from '../core/types';
import { quizConfig } from './config';
import { aiBasicsQuestions } from './ai-basics';
import { mlBasicsQuestions } from './ml-basics';
import { generativeAiQuestions } from './generative-ai';
import { promptEngineeringQuestions } from './prompt-engineering';
import { aiRisksQuestions } from './ai-risks';
import { legalQuestions } from './legal';
import { businessQuestions } from './business';

export const allQuestions: Question[] = [
  ...aiBasicsQuestions,
  ...mlBasicsQuestions,
  ...generativeAiQuestions,
  ...promptEngineeringQuestions,
  ...aiRisksQuestions,
  ...legalQuestions,
  ...businessQuestions,
];

export const categories = quizConfig.categories.map((cat) => ({
  id: cat.id,
  label: cat.label,
  icon: cat.icon,
}));

export { quizConfig };
