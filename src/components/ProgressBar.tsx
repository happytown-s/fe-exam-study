interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
      <div
        className="bg-gradient-to-r from-violet-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
        {current} / {total} 問
      </p>
    </div>
  );
}
