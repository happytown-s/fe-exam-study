import { useState } from 'react';
import { terms, type Term } from '../data/terms';
import { categories } from '../data/questions';

interface Props {
  onStartDrill: (questionIds: number[]) => void;
  onBack: () => void;
}

export default function TermsPage({ onStartDrill, onBack }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const filtered = terms.filter((t) => {
    const matchSearch =
      !search ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.reading.includes(search) ||
      t.definition.includes(search);
    const matchCategory = !filter || t.category === filter;
    return matchSearch && matchCategory;
  });

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
          📖 用語集
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          全{terms.length}語
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="用語を検索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4 focus:outline-none focus:border-violet-500 dark:focus:border-violet-400"
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === null
                ? 'bg-violet-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            全て
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === cat.id
                  ? 'bg-violet-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {selectedTerm ? (
          /* Term detail */
          <div>
            <button
              onClick={() => setSelectedTerm(null)}
              className="mb-4 text-violet-600 dark:text-violet-400 hover:underline text-sm"
            >
              ← 用語一覧に戻る
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-xs text-violet-600 dark:text-violet-400 font-medium mb-1">
                {selectedTerm.categoryLabel}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {selectedTerm.term}
              </h2>
              <p className="text-sm text-gray-400 mb-4">{selectedTerm.reading}</p>
              <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 mb-6">
                <p className="text-sm text-indigo-800 dark:text-indigo-300">
                  {selectedTerm.definition}
                </p>
              </div>

              {/* Related terms */}
              {selectedTerm.relatedTermIds.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    🔗 関連用語
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTermIds.map((id) => {
                      const related = terms.find((t) => t.id === id);
                      if (!related) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => setSelectedTerm(related)}
                          className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
                        >
                          {related.term}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related questions */}
              {selectedTerm.relatedQuestionIds.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    📝 関連問題
                  </h3>
                  <button
                    onClick={() => onStartDrill(selectedTerm.relatedQuestionIds)}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold hover:scale-[1.02] transition-transform"
                  >
                    関連問題 {selectedTerm.relatedQuestionIds.length}問を解く
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Term list */
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                該当する用語がありません
              </div>
            ) : (
              filtered.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTerm(t)}
                  className="w-full bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-left hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {categories.find((c) => c.id === t.category)?.icon ?? '📄'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                        {t.term}
                      </h3>
                      <p className="text-xs text-gray-400 truncate">
                        {t.reading} — {t.definition.slice(0, 50)}...
                      </p>
                    </div>
                    <span className="text-gray-300 dark:text-gray-600 text-xs">
                      Q{t.relatedQuestionIds[0]}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
