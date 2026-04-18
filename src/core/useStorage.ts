import { useState, useEffect, useCallback } from 'react';
import type { AnswerRecord, ExamScore } from './types';

const STORAGE_PREFIX = 'ai-passport';

const KEYS = {
  answerHistory: `${STORAGE_PREFIX}-answer-history`,
  examScores: `${STORAGE_PREFIX}-exam-scores`,
  streak: `${STORAGE_PREFIX}-streak`,
  darkMode: `${STORAGE_PREFIX}-dark-mode`,
} as const;

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useStorage() {
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>(() =>
    loadJSON(KEYS.answerHistory, []),
  );
  const [examScores, setExamScores] = useState<ExamScore[]>(() =>
    loadJSON(KEYS.examScores, []),
  );
  const [streak, setStreak] = useState<number>(() =>
    loadJSON(KEYS.streak, 0),
  );
  const [darkMode, setDarkMode] = useState<boolean>(() =>
    loadJSON(KEYS.darkMode, false),
  );

  useEffect(() => {
    saveJSON(KEYS.answerHistory, answerHistory);
  }, [answerHistory]);

  useEffect(() => {
    saveJSON(KEYS.examScores, examScores);
  }, [examScores]);

  useEffect(() => {
    saveJSON(KEYS.streak, streak);
  }, [streak]);

  useEffect(() => {
    saveJSON(KEYS.darkMode, darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const recordAnswer = useCallback(
    (questionId: number, isCorrect: boolean) => {
      const record: AnswerRecord = {
        questionId,
        isCorrect,
        timestamp: Date.now(),
      };
      setAnswerHistory((prev) => [...prev, record]);
      setStreak((prev) => (isCorrect ? prev + 1 : 0));
    },
    [],
  );

  const recordExamScore = useCallback(
    (score: ExamScore) => {
      setExamScores((prev) => [...prev, score]);
    },
    [],
  );

  const resetStreak = useCallback(() => {
    setStreak(0);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const clearHistory = useCallback(() => {
    setAnswerHistory([]);
    setExamScores([]);
    setStreak(0);
  }, []);

  const getWrongQuestions = useCallback((): number[] => {
    const wrongSet = new Set<number>();
    for (const record of answerHistory) {
      if (!record.isCorrect) {
        wrongSet.add(record.questionId);
      }
    }
    return Array.from(wrongSet);
  }, [answerHistory]);

  return {
    answerHistory,
    examScores,
    streak,
    darkMode,
    recordAnswer,
    recordExamScore,
    resetStreak,
    toggleDarkMode,
    clearHistory,
    getWrongQuestions,
  };
}
