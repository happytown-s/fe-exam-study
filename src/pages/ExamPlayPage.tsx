import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../core/types';
import { formatTime } from '../utils/helpers';
import QuizCard from '../components/QuizCard';

interface Props {
  questions: Question[];
  timeLimit: number;
  onTimeUp: (answers: Map<number, number>) => void;
  onSubmit: (answers: Map<number, number>) => void;
  onBack: () => void;
}

export default function ExamPlayPage({ questions, timeLimit, onTimeUp, onSubmit, onBack }: Props) {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmedSubmit, setConfirmedSubmit] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp(answers);
    }
  }, [timeLeft, answers, onTimeUp]);

  const handleAnswer = useCallback(
    (index: number) => {
      setAnswers((prev) => {
        const next = new Map(prev);
        next.set(currentQuestion.id, index);
        return next;
      });
    },
    [currentQuestion],
  );

  const handleSubmit = () => {
    if (!confirmedSubmit) {
      setConfirmedSubmit(true);
      return;
    }
    onSubmit(answers);
  };

  const answeredCount = answers.size;
  const totalQuestions = questions.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Timer bar */}
        <div className="sticky top-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                回答済み:
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
            <div
              className={`text-2xl font-mono font-bold ${
                timeLeft <= 300
                  ? 'text-red-500 animate-pulse'
                  : timeLeft <= 600
                    ? 'text-amber-500'
                    : 'text-gray-900 dark:text-white'
              }`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
          {/* Question navigation */}
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, i) => {
              let cls =
                'w-8 h-8 rounded text-xs font-medium flex items-center justify-center transition-colors ';
              if (i === currentIndex) {
                cls += 'bg-violet-500 text-white';
              } else if (answers.has(q.id)) {
                cls += 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300';
              } else {
                cls += 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
              }
              return (
                <button key={q.id} onClick={() => setCurrentIndex(i)} className={cls}>
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <QuizCard
          question={currentQuestion}
          selectedAnswer={answers.get(currentQuestion.id) ?? null}
          onAnswer={handleAnswer}
          answered={false}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            中断する
          </button>
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="flex-1 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← 前へ
            </button>
          )}
          {currentIndex < questions.length - 1 && (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="flex-1 py-3 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
            >
              次へ →
            </button>
          )}
        </div>

        {answeredCount === totalQuestions && (
          <button
            onClick={handleSubmit}
            className={`mt-4 w-full py-3 rounded-lg text-white font-bold transition-all ${
              confirmedSubmit
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:scale-[1.02]'
            }`}
          >
            {confirmedSubmit ? '本当に提出しますか？（もう一度クリック）' : '提出する'}
          </button>
        )}
      </div>
    </div>
  );
}
