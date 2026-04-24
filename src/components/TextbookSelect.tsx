interface TextbookSelectProps {
  onSelect: (categoryId: string) => void;
  onBack: () => void;
}

const categories = [
  { id: 'hardware', name: 'Hardware', icon: '[HW]', count: 10, color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
  { id: 'software', name: 'Software', icon: '[SW]', count: 12, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  { id: 'database', name: 'Database', icon: '[DB]', count: 10, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
  { id: 'network', name: 'Network', icon: '[NW]', count: 11, color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
  { id: 'security', name: 'Security', icon: '[SC]', count: 10, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
  { id: 'management', name: 'Management', icon: '[MG]', count: 10, color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' },
  { id: 'dev-methods', name: 'Dev Methods', icon: '[DM]', count: 10, color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' },
  { id: 'project-mgmt', name: 'Project Mgmt', icon: '[PM]', count: 10, color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' },
  { id: 'service-mgmt', name: 'Service Mgmt', icon: '[SM]', count: 10, color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
];

export default function TextbookSelect({ onSelect, onBack }: TextbookSelectProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium"
          >
            戻る
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Textbook
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 pb-24">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          カテゴリを選択して、How-toガイド・キーワード・試験対策TIPSを確認しましょう。
          合計 {categories.reduce((s, c) => s + c.count, 0)} トピック
        </p>

        <div className="grid grid-cols-1 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all text-left"
            >
              <span
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${cat.color}`}
              >
                {cat.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {cat.count} トピック
                </p>
              </div>
              <span className="text-gray-300 dark:text-gray-600">
                &gt;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
