import { quizConfig } from '../data/config';
import StatsSummary from '../components/StatsSummary';
import DarkModeToggle from '../components/DarkModeToggle';

interface Props {
  onNavigate: (page: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  answerHistory: { questionId: number; isCorrect: boolean; timestamp: number }[];
  examScores: { totalQuestions: number; correctCount: number; date: string; timeSpent: number }[];
  streak: number;
  wrongCount: number;
}

export default function HomePage({
  onNavigate,
  darkMode,
  onToggleDarkMode,
  answerHistory,
  examScores,
  streak,
  wrongCount,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <DarkModeToggle darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {quizConfig.title}Study
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {quizConfig.description}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <StatsSummary
            answerHistory={answerHistory}
            examScores={examScores}
            streak={streak}
            wrongCount={wrongCount}
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onNavigate('drill')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:scale-[1.02] transition-transform group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">📝</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  ドリルモード
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  分野別に練習問題を解く
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('exam')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:scale-[1.02] transition-transform group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  模試モード
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {quizConfig.examQuestions}問・{quizConfig.examTimeLimit}分の本番シミュレーション
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('review')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:scale-[1.02] transition-transform group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">🔄</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  復習モード
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  間違えた問題を再挑戦
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('terms')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:scale-[1.02] transition-transform group"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">📖</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  用語集
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  重要用語をチェック・関連問題にジャンプ
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('calc-training')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:scale-[1.02] transition-transform group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                CT
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                  計算トレーニング
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  計算問題を集中練習 (進数・ビット演算・サブネット他)
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('pseudo-language')}
            className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:scale-[1.02] transition-transform group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                PL
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  科目Bトレーニング
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  IPA擬似言語を集中練習 (記法・トレース・アルゴリズム他)
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
