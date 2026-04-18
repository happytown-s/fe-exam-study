import type { AnswerRecord, ExamScore } from '../core/types';
import { getOverallStats } from '../utils/helpers';

interface Props {
  answerHistory: AnswerRecord[];
  examScores: ExamScore[];
  streak: number;
  wrongCount: number;
}

export default function StatsSummary({
  answerHistory,
  examScores,
  streak,
  wrongCount,
}: Props) {
  const stats = getOverallStats(answerHistory);
  const lastExam = examScores.length > 0 ? examScores[examScores.length - 1] : null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
        <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
          {stats.total}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">総回答数</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          {stats.rate}%
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">正答率</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
        <div className="text-2xl font-bold text-amber-500 dark:text-amber-400">
          {streak}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          連続正解🔥
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
        <div className="text-2xl font-bold text-pink-500 dark:text-pink-400">
          {wrongCount}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">苦手問題</div>
      </div>
      {lastExam && (
        <div className="col-span-2 sm:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            📝 最後の模試
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {lastExam.correctCount}/{lastExam.totalQuestions}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({Math.round((lastExam.correctCount / lastExam.totalQuestions) * 100)}%)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
