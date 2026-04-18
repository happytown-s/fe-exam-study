import { useMemo } from 'react';
import type { Question } from './types';
import { shuffle } from '../utils/helpers';

export function useShuffledQuestions(questions: Question[]): Question[] {
  return useMemo(() => shuffle([...questions]), [questions]);
}

export function calculateScore(
  questions: Question[],
  answers: Map<number, number>,
): { correctCount: number; wrongIds: number[] } {
  let correctCount = 0;
  const wrongIds: number[] = [];
  for (const q of questions) {
    const userAnswer = answers.get(q.id);
    if (userAnswer !== undefined && q.options[userAnswer]?.correct) {
      correctCount++;
    } else {
      wrongIds.push(q.id);
    }
  }
  return { correctCount, wrongIds };
}

export function getCategoryStats(
  questions: Question[],
  answers: Map<number, number>,
  categoryIds: string[],
): Record<string, { correct: number; total: number; wrongIds: number[]; rate: number }> {
  const stats: Record<string, { correct: number; total: number; wrongIds: number[]; rate: number }> = {};
  for (const catId of categoryIds) {
    stats[catId] = { correct: 0, total: 0, wrongIds: [], rate: 0 };
  }
  for (const q of questions) {
    const s = stats[q.category];
    if (!s) continue;
    s.total++;
    const userAnswer = answers.get(q.id);
    if (userAnswer !== undefined && q.options[userAnswer]?.correct) {
      s.correct++;
    } else {
      s.wrongIds.push(q.id);
    }
  }
  for (const catId of categoryIds) {
    const s = stats[catId];
    s.rate = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
  }
  return stats;
}
