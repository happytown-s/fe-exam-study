import { useMemo } from 'react';
import type { Question } from '../core/types';
import { categories } from '../data/questions';

interface Props {
  questions: Question[];
  answers: Map<number, number>;
  timeSpent: number;
  passLine: number;
  onReview: () => void;
  onRetry: () => void;
  onHome: () => void;
}

export default function ExamResultPage({
  questions,
  answers,
  timeSpent,
  passLine,
  onReview,
  onRetry,
  onHome,
}: Props) {
  const results = useMemo(() => {
    const categoryStats: Record<
      string,
      { correct: number; total: number; wrongIds: number[] }
    > = {};
    for (const cat of categories) {
      categoryStats[cat.id] = { correct: 0, total: 0, wrongIds: [] };
    }
    let totalCorrect = 0;
    const wrongIds: number[] = [];

    for (const q of questions) {
      const stats = categoryStats[q.category];
      stats.total++;
      const userAnswer = answers.get(q.id);
      if (userAnswer !== undefined && q.options[userAnswer]?.correct) {
        stats.correct++;
        totalCorrect++;
      } else {
        wrongIds.push(q.id);
        stats.wrongIds.push(q.id);
      }
    }

    const weakCategories = categories
      .map((cat) => ({
        ...cat,
        ...categoryStats[cat.id],
        rate:
          categoryStats[cat.id].total > 0
            ? Math.round(
                (categoryStats[cat.id].correct /
                  categoryStats[cat.id].total) *
                  100,
              )
            : 0,
      }))
      .sort((a, b) => a.rate - b.rate);

    return { totalCorrect, wrongIds, categoryStats, weakCategories };
  }, [questions, answers]);

  const totalQuestions = questions.length;
  const rate = Math.round((results.totalCorrect / totalQuestions) * 100);
  const passed = rate >= passLine;
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center mb-6">
          <div className="text-6xl mb-4">{passed ? '🎊' : '📚'}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {passed ? '合格おめでとうございます！' : 'もう少し頑張りましょう！'}
          </h2>
          <div
            className={`text-6xl font-bold my-4 ${passed ? 'text-green-500' : 'text-amber-500'}`}
          >
            {results.totalCorrect} / {totalQuestions}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            正答率 {rate}%
          </p>
          <p className="text-sm text-gray-400">所要時間: {minutes}分{seconds}秒</p>
          {passed && (
            <div className="mt-4 inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 font-medium">
              ✅ 合格（{passLine}%以上）
            </div>
          )}
        </div>

        {/* Category breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📊 分野別正答率
          </h3>
          <div className="space-y-3">
            {results.weakCategories.map((cat) => {
              const barColor =
                cat.rate >= 80
                  ? 'from-green-400 to-green-500'
                  : cat.rate >= 60
                    ? 'from-amber-400 to-amber-500'
                    : 'from-red-400 to-red-500';
              return (
                <div key={cat.id} className="flex items-center gap-3">
                  <span className="text-lg w-8">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {cat.label}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {cat.correct}/{cat.total} ({cat.rate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`bg-gradient-to-r ${barColor} h-2.5 rounded-full transition-all duration-500`}
                        style={{ width: `${cat.rate}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak categories */}
        {results.weakCategories.slice(0, 3).some((c) => c.rate < passLine) && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🎯 苦手分野 TOP3
            </h3>
            <div className="space-y-2">
              {results.weakCategories
                .filter((c) => c.rate < 100)
                .slice(0, 3)
                .map((cat, i) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                  >
                    <span className="text-lg font-bold text-red-500">
                      #{i + 1}
                    </span>
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {cat.label}
                    </span>
                    <span className="ml-auto text-sm text-red-500 font-bold">
                      {cat.rate}%
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onHome}
            className="flex-1 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            🏠 ホームに戻る
          </button>
          {results.wrongIds.length > 0 && (
            <button
              onClick={onReview}
              className="flex-1 py-3 rounded-lg bg-amber-500 text-white font-bold hover:scale-[1.02] transition-transform"
            >
              🔄 復習する（{results.wrongIds.length}問）
            </button>
          )}
          <button
            onClick={onRetry}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold hover:scale-[1.02] transition-transform"
          >
            🎯 もう一度
          </button>
        </div>
      </div>
    </div>
  );
}
