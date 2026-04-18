import { categories } from '../data/questions';
import { getCategoryProgress } from '../utils/helpers';
import type { Question, AnswerRecord } from '../core/types';

interface Props {
  allQuestions: Question[];
  answerHistory: AnswerRecord[];
  onSelectCategory: (categoryId: string | null) => void;
  onBack: () => void;
}

export default function DrillSelectPage({
  allQuestions,
  answerHistory,
  onSelectCategory,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
        >
          ← ホームに戻る
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📝 分野を選択
        </h1>

        <button
          onClick={() => onSelectCategory(null)}
          className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl shadow-lg p-6 text-left mb-4 hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">📚</div>
            <div>
              <h2 className="text-lg font-bold">全分野</h2>
              <p className="text-sm text-violet-200">
                全{allQuestions.length}問からランダム出題
              </p>
            </div>
          </div>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => {
            const progress = getCategoryProgress(cat.id, answerHistory, allQuestions);
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 text-left hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{cat.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {cat.label}
                    </h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{progress}%</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
