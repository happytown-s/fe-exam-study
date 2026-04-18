import { useState } from 'react';
import type { Question } from '../core/types';
import { categories } from '../data/questions';

interface Props {
  allQuestions: Question[];
  wrongQuestionIds: number[];
  onRetry: (questionIds: number[]) => void;
  onBack: () => void;
}

export default function ReviewPage({
  allQuestions,
  wrongQuestionIds,
  onRetry,
  onBack,
}: Props) {
  const [filter, setFilter] = useState<string | null>(null);

  const wrongQuestions = wrongQuestionIds
    .map((id) => allQuestions.find((q) => q.id === id))
    .filter((q): q is Question => q !== undefined);

  const filteredQuestions = filter
    ? wrongQuestions.filter((q) => q.category === filter)
    : wrongQuestions;

  // Group by category for summary
  const categoryCounts = categories.map((cat) => ({
    ...cat,
    count: wrongQuestions.filter((q) => q.category === cat.id).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
        >
          ← ホームに戻る
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🔄 復習モード
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          間違えた問題: {wrongQuestions.length}問
        </p>

        {wrongQuestions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-gray-600 dark:text-gray-400">
              間違えた問題はありません。素晴らしい！
            </p>
          </div>
        ) : (
          <>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setFilter(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === null
                    ? 'bg-violet-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                全て ({wrongQuestions.length})
              </button>
              {categoryCounts
                .filter((c) => c.count > 0)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === cat.id
                        ? 'bg-violet-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat.icon} {cat.label} ({cat.count})
                  </button>
                ))}
            </div>

            {/* Question list */}
            <div className="space-y-3 mb-6">
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{q.categoryLabel.includes('AI基礎') ? '🧠' : q.categoryLabel.includes('機械学習') ? '📊' : q.categoryLabel.includes('生成AI') ? '🤖' : q.categoryLabel.includes('プロンプト') ? '💬' : q.categoryLabel.includes('リスク') ? '⚠️' : q.categoryLabel.includes('著作権') ? '⚖️' : '💼'}</span>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">
                        Q{q.id} ・ {q.categoryLabel}
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {q.question}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onRetry(filteredQuestions.map((q) => q.id))}
              disabled={filteredQuestions.length === 0}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {filter
                ? `${filteredQuestions.length}問を復習する`
                : `全${wrongQuestions.length}問を復習する`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
