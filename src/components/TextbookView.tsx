import { useState, useMemo } from 'react';

interface TextbookTopic {
  topicId: string;
  title: string;
  summary: string;
  howTo: string[];
  keywords: string[];
  examTip: string;
}

interface TextbookViewProps {
  topics: TextbookTopic[];
  title: string;
  onBack: () => void;
}

export default function TextbookView({ topics, title, onBack }: TextbookViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'list' | 'search'>('all');

  const filteredTopics = useMemo(() => {
    if (!searchTerm.trim()) return topics;
    const term = searchTerm.toLowerCase();
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        t.summary.toLowerCase().includes(term) ||
        t.keywords.some((k) => k.toLowerCase().includes(term))
    );
  }, [topics, searchTerm]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium"
          >
            Back
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
            {title}
          </h1>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
          {(['all', 'list', 'search'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab !== 'search') setSearchTerm('');
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'list' ? 'List' : 'Search'}
            </button>
          ))}
        </div>
        {activeTab === 'search' && (
          <div className="max-w-2xl mx-auto px-4 pb-3">
            <input
              type="text"
              placeholder="Search topics, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 pb-24">
        {activeTab === 'search' ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {filteredTopics.length} / {topics.length} topics
            </p>
            {filteredTopics.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No matching topics found.
              </p>
            ) : (
              filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.topicId}
                  topic={topic}
                  isExpanded={expandedId === topic.topicId}
                  onToggle={() => toggleExpand(topic.topicId)}
                />
              ))
            )}
          </>
        ) : activeTab === 'list' ? (
          <div className="space-y-1">
            {topics.map((topic) => (
              <button
                key={topic.topicId}
                onClick={() => {
                  setExpandedId(topic.topicId);
                  setActiveTab('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">
                  {topic.topicId}
                </span>
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {topic.title}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {expandedId ? (
              <TopicDetail
                topic={topics.find((t) => t.topicId === expandedId)!}
                onCollapse={() => setExpandedId(null)}
              />
            ) : (
              topics.map((topic) => (
                <TopicCard
                  key={topic.topicId}
                  topic={topic}
                  isExpanded={false}
                  onToggle={() => toggleExpand(topic.topicId)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TopicCard({
  topic,
  isExpanded,
  onToggle,
}: {
  topic: TextbookTopic;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onToggle}
    >
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
                {topic.topicId}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {topic.title}
              </h3>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {topic.summary}
            </p>
          </div>
          <span
            className={`text-gray-400 transition-transform text-lg ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            &#9660;
          </span>
        </div>
        {!isExpanded && (
          <div className="flex flex-wrap gap-1 mt-2">
            {topic.keywords.slice(0, 4).map((kw) => (
              <span
                key={kw}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
              >
                {kw}
              </span>
            ))}
            {topic.keywords.length > 4 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                +{topic.keywords.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
          <TopicDetailContent topic={topic} />
        </div>
      )}
    </div>
  );
}

function TopicDetail({
  topic,
  onCollapse,
}: {
  topic: TextbookTopic;
  onCollapse: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCollapse();
          }}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          &larr; Back to all
        </button>
        <span className="text-xs font-mono text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
          {topic.topicId}
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {topic.title}
      </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {topic.summary}
      </p>

      <TopicDetailContent topic={topic} />
    </div>
  );
}

function TopicDetailContent({ topic }: { topic: TextbookTopic }) {
  return (
    <div className="space-y-4 mt-3">
      {/* How-to Section */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1">
          <span className="text-blue-500">[</span>
          How to Understand
          <span className="text-blue-500">]</span>
        </h4>
        <ol className="space-y-2">
          {topic.howTo.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Keywords */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Keywords
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {topic.keywords.map((kw) => (
            <span
              key={kw}
              className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full font-medium"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Exam Tip */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
        <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
          FE Exam Tip
        </h4>
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          {topic.examTip}
        </p>
      </div>
    </div>
  );
}
