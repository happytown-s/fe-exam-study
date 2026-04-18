import type { QuizConfig } from '../core/types';

interface Props {
  config: QuizConfig;
  onStart: () => void;
  onBack: () => void;
}

export default function ExamPage({ config, onStart, onBack }: Props) {
  const passCount = Math.ceil(config.examQuestions * config.passLine / 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm"
        >
          ← ホームに戻る
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🎯 模試モード
          </h1>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-xl">📋</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">出題数</p>
                <p>全分野から{config.examQuestions}問ランダム出題</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">⏱️</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">制限時間</p>
                <p>{config.examTimeLimit}分</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">合格基準</p>
                <p>正答率{config.passLine}%以上（{passCount}問以上正解）</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">📝</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">採点方式</p>
                <p>全問題回答後（または時間切れ）に一括採点</p>
              </div>
            </div>
          </div>
          <button
            onClick={onStart}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-lg font-bold hover:scale-[1.02] transition-transform"
          >
            模試を開始する
          </button>
        </div>
      </div>
    </div>
  );
}
