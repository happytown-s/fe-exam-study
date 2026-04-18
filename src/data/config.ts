import type { QuizConfig } from '../core/types';

export const quizConfig: QuizConfig = {
  id: 'example-exam',
  title: 'サンプル試験',
  description: '問題集フレームワークのテンプレート',
  passLine: 70,
  examQuestions: 60,
  examTimeLimit: 60,
  categories: [
    {
      id: 'example',
      name: 'サンプル',
      label: 'サンプル分野',
      file: () => import('./example-category').then(m => m.questions),
    },
  ],
  termsFile: () => import('./terms').then(m => m.terms),
};
