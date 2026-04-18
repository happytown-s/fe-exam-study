export interface QuestionOption {
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  category: string;
  categoryLabel: string;
  question: string;
  options: QuestionOption[];
  explanation: string;
}

export interface AnswerRecord {
  questionId: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface ExamScore {
  totalQuestions: number;
  correctCount: number;
  date: string;
  timeSpent: number;
}

export type CategoryId = 'ai_basics' | 'ml_basics' | 'generative_ai' | 'prompt_engineering' | 'ai_risks' | 'legal' | 'business';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  icon: string;
}

export interface QuizConfig {
  id: string;
  title: string;
  description: string;
  passLine: number;
  examQuestions: number;
  examTimeLimit: number;
  categories: QuizCategory[];
  termsFile: () => Promise<any[]>;
}

export interface QuizCategory {
  id: string;
  name: string;
  label: string;
  icon: string;
  file: () => Promise<Question[]>;
}
