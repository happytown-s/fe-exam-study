import { useMemo } from 'react';
import type { Question } from '../core/types';
import { shuffle } from '../utils/helpers';

interface Props {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  answered: boolean;
}

export default function QuizCard({ question, selectedAnswer, onAnswer, answered }: Props) {
  const shuffledOptions = useMemo(() => {
    const indices = question.options.map((_, i) => i);
    const shuffled = shuffle(indices);
    return shuffled.map((originalIdx) => ({
      option: question.options[originalIdx],
      originalIndex: originalIdx,
    }));
  }, [question.options]);

  const correctShuffledIndex = shuffledOptions.findIndex((item) => item.option.correct);
  // Map originalIndex -> shuffledIndex for highlight
  const selectedShuffledIndex = selectedAnswer !== null
    ? shuffledOptions.findIndex((item) => item.originalIndex === selectedAnswer)
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-2 text-xs font-medium text-violet-600 dark:text-violet-400">
        {question.categoryLabel}
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Q{question.id}. {question.question}
      </h2>
      <div className="space-y-3">
        {shuffledOptions.map((item, i) => {
          const opt = item.option;
          let btnClass =
            'w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 ';
          if (answered) {
            if (i === correctShuffledIndex) {
              btnClass +=
                'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200';
            } else if (selectedShuffledIndex === i) {
              btnClass +=
                'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
            } else {
              btnClass += 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-500';
            }
          } else if (selectedShuffledIndex === i) {
            btnClass +=
              'border-violet-500 bg-violet-50 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200';
          } else {
            btnClass +=
              'border-gray-200 dark:border-gray-600 hover:border-violet-400 dark:hover:border-violet-400 cursor-pointer text-gray-800 dark:text-gray-200';
          }
          return (
            <button
              key={i}
              onClick={() => !answered && onAnswer(item.originalIndex)}
              disabled={answered}
              className={btnClass}
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt.text}
              {answered && i === correctShuffledIndex && (
                <span className="ml-2">✅</span>
              )}
              {answered && selectedShuffledIndex === i && i !== correctShuffledIndex && (
                <span className="ml-2">❌</span>
              )}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-4 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-1">
            💡 解説
          </p>
          <p className="text-sm text-indigo-700 dark:text-indigo-400">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
