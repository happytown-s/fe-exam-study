import { useState, useRef } from 'react';
import type { Question } from '../core/types';
import { shuffle } from '../utils/helpers';
import QuizCard from '../components/QuizCard';
import ProgressBar from '../components/ProgressBar';

interface Props {
  questions: Question[];
  categoryLabel: string;
  passLine: number;
  recordAnswer: (questionId: number, isCorrect: boolean) => void;
  onFinish: (results: { correct: number; total: number }) => void;
  onBack: () => void;
}

export default function DrillPlayPage({
  questions,
  categoryLabel,
  passLine,
  recordAnswer,
  onFinish,
  onBack,
}: Props) {
  const shuffledRef = useRef<Question[] | null>(null);
  if (shuffledRef.current === null || shuffledRef.current.length !== questions.length) {
    shuffledRef.current = shuffle([...questions]);
  }
  const shuffled = shuffledRef.current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<{ correct: number; total: number } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = shuffled[currentIndex];

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    const isCorrect = currentQuestion.options[index].correct;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }
    recordAnswer(currentQuestion.id, isCorrect);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= shuffled.length) {
      const finalCorrect = correctCount;
      setResults({ correct: finalCorrect, total: shuffled.length });
      onFinish({ correct: finalCorrect, total: shuffled.length });
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  if (results) {
    const rate = Math.round((results.correct / results.total) * 100);
    const passed = rate >= passLine;
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {categoryLabel} - 結果
            </h2>
            <div
              className={`text-5xl font-bold mb-4 ${passed ? 'text-green-500' : 'text-amber-500'}`}
            >
              {rate}%
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {results.correct} / {results.total}問 正解
            </p>
            {passed && (
              <p className="text-green-600 dark:text-green-400 mb-4 font-medium">
                🎯 合格目標クリア！（{passLine}%以上）
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                ホームに戻る
              </button>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedAnswer(null);
                  setAnswered(false);
                  setResults(null);
                  setCorrectCount(0);
                  shuffledRef.current = shuffle([...questions]);
                }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:scale-105 transition-transform"
              >
                もう一度
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
        >
          ← 分野選択に戻る
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {categoryLabel}
        </h2>
        <ProgressBar current={currentIndex + 1} total={shuffled.length} />
        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          answered={answered}
        />
        {answered && (
          <button
            onClick={handleNext}
            className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold hover:scale-[1.02] transition-transform"
          >
            {currentIndex + 1 >= shuffled.length ? '結果を見る' : '次の問題へ →'}
          </button>
        )}
      </div>
    </div>
  );
}
