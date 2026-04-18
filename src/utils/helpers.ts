import type { Question, AnswerRecord } from '../core/types';
import { categories } from '../data/questions';

export function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickFromCategories(
  allQuestions: Question[],
  perCategory: number,
): Question[] {
  const picked: Question[] = [];
  for (const cat of categories) {
    const catQuestions = allQuestions.filter((q) => q.category === cat.id);
    const shuffled = shuffle(catQuestions);
    picked.push(...shuffled.slice(0, perCategory));
  }
  return shuffle(picked);
}

export function getCategoryAccuracy(
  categoryId: string,
  history: AnswerRecord[],
  allQuestions: Question[],
): { correct: number; total: number; rate: number } {
  const ids = new Set(
    allQuestions.filter((q) => q.category === categoryId).map((q) => q.id),
  );
  const relevant = history.filter((h) => ids.has(h.questionId));
  const correct = relevant.filter((h) => h.isCorrect).length;
  const total = relevant.length;
  return {
    correct,
    total,
    rate: total > 0 ? Math.round((correct / total) * 100) : 0,
  };
}

export function getCategoryProgress(
  categoryId: string,
  history: AnswerRecord[],
  allQuestions: Question[],
): number {
  const ids = new Set(
    allQuestions.filter((q) => q.category === categoryId).map((q) => q.id),
  );
  const answered = new Set(
    history.filter((h) => ids.has(h.questionId)).map((h) => h.questionId),
  );
  return ids.size > 0
    ? Math.round((answered.size / ids.size) * 100)
    : 0;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function getOverallStats(history: AnswerRecord[]) {
  const total = history.length;
  const correct = history.filter((h) => h.isCorrect).length;
  const rate = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { total, correct, rate };
}
