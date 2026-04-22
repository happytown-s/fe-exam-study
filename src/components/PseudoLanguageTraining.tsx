import { useState, useEffect, useCallback, useRef } from 'react';
import pseudoData from '../data/pseudo-language-training.json';

interface Topic {
  id: string;
  title: string;
  titleJa: string;
  difficulty: number;
  cheatsheet: string;
  example: {
    question: string;
    code?: string;
    steps: string[];
    answer: string;
  };
  questions: {
    type: 'practice' | 'test' | 'advanced';
    question: string;
    code?: string;
    options: { text: string; correct: boolean }[];
    steps: string[];
  }[];
}

interface TopicStats {
  total: number;
  correct: number;
  practiceCorrect: number;
  practiceTotal: number;
  testCorrect: number;
  testTotal: number;
  advancedCorrect: number;
  advancedTotal: number;
}

type TrainingTab = 'cheat' | 'example' | 'practice' | 'test' | 'advanced';

function loadStats(): Record<string, TopicStats> {
  try {
    const raw = localStorage.getItem('fe-pseudo-stats');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const stats: Record<string, TopicStats> = {};
  for (const t of pseudoData.topics) {
    stats[t.id] = { total: 0, correct: 0, practiceCorrect: 0, practiceTotal: 0, testCorrect: 0, testTotal: 0, advancedCorrect: 0, advancedTotal: 0 };
  }
  return stats;
}

function saveStats(stats: Record<string, TopicStats>) {
  localStorage.setItem('fe-pseudo-stats', JSON.stringify(stats));
}

function getProgressPercent(stats: TopicStats): number {
  if (stats.total === 0) return 0;
  return Math.round((stats.correct / stats.total) * 100);
}

function getAccuracyColor(pct: number): string {
  if (pct === 0) return 'bg-gray-600';
  if (pct < 50) return 'bg-red-500';
  if (pct < 80) return 'bg-amber-500';
  return 'bg-green-500';
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TOPICS = pseudoData.topics as Topic[];

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="my-3 rounded-lg overflow-hidden border border-gray-700 dark:border-gray-600">
      <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
        <span className="ml-2 text-gray-500">pseudo</span>
      </div>
      <pre className="bg-gray-900 text-green-300 p-4 overflow-x-auto text-sm leading-relaxed" style={{ fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function PseudoLanguageTraining({ onBack }: { onBack: () => void }) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TrainingTab>('cheat');
  const [stats, setStats] = useState<Record<string, TopicStats>>(loadStats);

  const topic = TOPICS.find(t => t.id === selectedTopic);

  const recordAnswer = useCallback((topicId: string, type: 'practice' | 'test' | 'advanced', correct: boolean) => {
    setStats(prev => {
      const next = { ...prev, [topicId]: { ...prev[topicId] } };
      const s = next[topicId];
      s.total++;
      if (correct) s.correct++;
      if (type === 'practice') { s.practiceTotal++; if (correct) s.practiceCorrect++; }
      if (type === 'test') { s.testTotal++; if (correct) s.testCorrect++; }
      if (type === 'advanced') { s.advancedTotal++; if (correct) s.advancedCorrect++; }
      saveStats(next);
      return next;
    });
  }, []);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
              PL
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Subject B Training
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">IPA Pseudo-Language Drills for FE Exam</p>
          </div>

          {/* Overall Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-900 dark:text-white">Overall Mastery</span>
              <span className="text-lg font-bold" style={{ color: getOverallMasteryColor(stats) }}>
                {getOverallMastery(stats)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                style={{ width: `${getOverallMastery(stats)}%` }}
              />
            </div>
          </div>

          {/* Topic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOPICS.map(t => {
              const s = stats[t.id] || { total: 0, correct: 0 };
              const pct = getProgressPercent(s);
              const isBook = t.id === 'syntax-guide';
              return (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTopic(t.id); setActiveTab('cheat'); }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 text-left hover:scale-[1.02] transition-transform group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {t.titleJa}
                    </h3>
                    {isBook ? (
                      <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    ) : (
                      <span className="text-yellow-500 text-sm whitespace-nowrap ml-2">
                        {'*'.repeat(t.difficulty)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.title}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getAccuracyColor(pct)} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {s.total > 0 ? `${pct}% (${s.correct}/${s.total})` : '--'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Weak Topic Analysis */}
          {renderWeakAnalysis(stats)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => setSelectedTopic(null)}
          className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Topics
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {topic.titleJa}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{topic.title} | Difficulty: {'*'.repeat(topic.difficulty)}</p>

        {/* Topic Stats */}
        {renderTopicStats(topic.id, stats)}

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1 mb-6 overflow-x-auto">
          {(['cheat', 'example', 'practice', 'test', 'advanced'] as TrainingTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'cheat' ? 'Cheat Sheet' : tab === 'example' ? 'Example' : tab === 'practice' ? 'Practice' : tab === 'test' ? 'Test' : 'Advanced'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'cheat' && <CheatSheetTab cheatsheet={topic.cheatsheet} />}
        {activeTab === 'example' && <ExampleTab example={topic.example} />}
        {activeTab === 'practice' && <QuizTab questions={topic.questions.filter(q => q.type === 'practice')} type="practice" topicId={topic.id} onAnswer={recordAnswer} />}
        {activeTab === 'test' && <TestTab questions={topic.questions.filter(q => q.type === 'test' || q.type === 'practice')} topicId={topic.id} onAnswer={recordAnswer} />}
        {activeTab === 'advanced' && <QuizTab questions={topic.questions.filter(q => q.type === 'advanced')} type="advanced" topicId={topic.id} onAnswer={recordAnswer} />}
      </div>
    </div>
  );
}

function renderWeakAnalysis(stats: Record<string, TopicStats>) {
  const weak = TOPICS.filter(t => {
    const s = stats[t.id];
    return s && s.total >= 3 && getProgressPercent(s) < 80;
  });

  if (weak.length === 0) return null;

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
      <h3 className="font-bold text-gray-900 dark:text-white mb-3">Weak Areas</h3>
      <div className="space-y-2">
        {weak.map(t => {
          const pct = getProgressPercent(stats[t.id]);
          return (
            <div key={t.id} className="flex items-center gap-3">
              <span className="text-sm text-gray-700 dark:text-gray-300 w-32 truncate">{t.titleJa}</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className={`h-2 rounded-full ${getAccuracyColor(pct)}`} style={{ width: `${pct}%` }} />
              </div>
              <span className={`text-sm font-bold ${pct < 50 ? 'text-red-500' : 'text-amber-500'}`}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderTopicStats(topicId: string, stats: Record<string, TopicStats>) {
  const s = stats[topicId];
  if (!s || s.total === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="text-gray-500 dark:text-gray-400">Practice</div>
          <div className="font-bold text-gray-900 dark:text-white">{s.practiceCorrect}/{s.practiceTotal}</div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400">Test</div>
          <div className="font-bold text-gray-900 dark:text-white">{s.testCorrect}/{s.testTotal}</div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400">Advanced</div>
          <div className="font-bold text-gray-900 dark:text-white">{s.advancedCorrect}/{s.advancedTotal}</div>
        </div>
      </div>
    </div>
  );
}

function getOverallMastery(stats: Record<string, TopicStats>): number {
  let total = 0, correct = 0;
  for (const t of TOPICS) {
    const s = stats[t.id];
    if (s) { total += s.total; correct += s.correct; }
  }
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

function getOverallMasteryColor(stats: Record<string, TopicStats>): string {
  const m = getOverallMastery(stats);
  if (m < 50) return '#ef4444';
  if (m < 80) return '#f59e0b';
  return '#22c55e';
}

/* ---- Cheat Sheet Tab ---- */
function CheatSheetTab({ cheatsheet }: { cheatsheet: string }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex justify-between items-center text-left"
      >
        <span className="font-bold text-gray-900 dark:text-white">IPA Pseudo-Language Reference</span>
        <svg className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed max-h-96 overflow-y-auto">
            {cheatsheet}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Example Tab ---- */
function ExampleTab({ example }: { example: { question: string; code?: string; steps: string[]; answer: string } }) {
  const [revealedSteps, setRevealedSteps] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
        <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase mb-1">Example Question</div>
        <p className="text-gray-900 dark:text-white font-medium">{example.question}</p>
      </div>

      {example.code && <CodeBlock code={example.code} />}

      <div className="space-y-2 mb-4">
        {example.steps.map((step, i) => (
          <div
            key={i}
            className={`flex gap-3 transition-all duration-500 ${
              i < revealedSteps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ display: i < revealedSteps ? 'flex' : 'none' }}
          >
            <span className="text-xs font-bold text-cyan-500 bg-cyan-100 dark:bg-cyan-900/40 rounded px-2 py-1 h-fit whitespace-nowrap">
              Step {i + 1}
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
          </div>
        ))}
      </div>

      {revealedSteps >= example.steps.length && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4 border border-green-200 dark:border-green-800">
          <span className="font-bold text-green-700 dark:text-green-400">Answer: {example.answer}</span>
        </div>
      )}

      <button
        onClick={() => setRevealedSteps(prev => Math.min(prev + 1, example.steps.length + 1))}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
      >
        {revealedSteps < example.steps.length
          ? `Reveal Step ${revealedSteps + 1}`
          : revealedSteps < example.steps.length + 1
            ? 'Show Answer'
            : 'Reset'}
      </button>
    </div>
  );
}

/* ---- Practice/Advanced Quiz Tab ---- */
function QuizTab({
  questions,
  type,
  topicId,
  onAnswer,
}: {
  questions: Topic['questions'];
  type: 'practice' | 'advanced';
  topicId: string;
  onAnswer: (topicId: string, type: 'practice' | 'test' | 'advanced', correct: boolean) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  const q = questions[currentIndex];

  if (!q) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 text-center text-gray-500 dark:text-gray-400">
        No {type} questions available for this topic.
      </div>
    );
  }

  if (finished) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 text-center">
        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
          {score}/{questions.length}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {score === questions.length ? 'Perfect!' : score >= questions.length * 0.8 ? 'Great job!' : 'Keep practicing!'}
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setScore(0); setSelected(null); setShowSteps(false); setFinished(false); setRevealedSteps(0); }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  const isCorrect = selected !== null && q.options[selected]?.correct;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = q.options[idx]?.correct;
    if (correct) {
      onAnswer(topicId, type, true);
    } else {
      onAnswer(topicId, type, false);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setShowSteps(false);
      setRevealedSteps(0);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
      {/* Progress */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
        <span>Question {currentIndex + 1} / {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-5">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-gray-900 dark:text-white font-medium mb-3">{q.question}</p>

      {/* Code block if present */}
      {q.code && <CodeBlock code={q.code} />}

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => {
          let cls = 'border-2 rounded-lg p-3 text-left transition-all cursor-pointer ';
          if (selected === null) {
            cls += 'border-gray-200 dark:border-gray-600 hover:border-cyan-400 dark:hover:border-cyan-500';
          } else if (opt.correct) {
            cls += 'border-green-500 bg-green-50 dark:bg-green-900/20';
          } else if (selected === idx) {
            cls += 'border-red-500 bg-red-50 dark:bg-red-900/20';
          } else {
            cls += 'border-gray-200 dark:border-gray-600 opacity-50';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={cls}>
              <span className="text-sm text-gray-900 dark:text-white">{opt.text}</span>
              {selected !== null && opt.correct && <span className="ml-2 text-green-600 font-bold text-xs">Correct</span>}
              {selected === idx && !opt.correct && <span className="ml-2 text-red-600 font-bold text-xs">Wrong</span>}
            </button>
          );
        })}
      </div>

      {/* Steps reveal for wrong answer */}
      {selected !== null && !isCorrect && (
        <div className="mb-4">
          {!showSteps ? (
            <button
              onClick={() => setShowSteps(true)}
              className="w-full py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium text-sm hover:opacity-80"
            >
              Hint: Click to see step-by-step solution
            </button>
          ) : (
            <div className="space-y-2">
              {q.steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex gap-2 transition-all duration-500 ${i < revealedSteps ? 'opacity-100' : 'opacity-0'}`}
                  style={{ display: i < revealedSteps ? 'flex' : 'none' }}
                >
                  <span className="text-xs font-bold text-cyan-500 bg-cyan-100 dark:bg-cyan-900/40 rounded px-2 py-1 h-fit whitespace-nowrap">
                    Step {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                </div>
              ))}
              {revealedSteps < q.steps.length && (
                <button
                  onClick={() => setRevealedSteps(prev => prev + 1)}
                  className="text-sm text-cyan-500 hover:underline"
                >
                  Show next step
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Score increment feedback */}
      {selected !== null && isCorrect && (
        <div className="mb-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <span className="text-green-700 dark:text-green-400 font-bold">Correct!</span>
        </div>
      )}

      {/* Next button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity"
        >
          {isCorrect ? 'Next' : 'Continue'}
        </button>
      )}
    </div>
  );
}

/* ---- Timed Test Tab ---- */
function TestTab({
  questions,
  topicId,
  onAnswer,
}: {
  questions: Topic['questions'];
  topicId: string;
  onAnswer: (topicId: string, type: 'practice' | 'test' | 'advanced', correct: boolean) => void;
}) {
  const TIME_LIMIT = 300; // 5 minutes

  const [shuffled, setShuffled] = useState(() => shuffle(questions).slice(0, Math.min(10, questions.length)));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (finished || currentIndex >= shuffled.length) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentIndex, finished, shuffled.length]);

  // Auto-submit when time is up
  useEffect(() => {
    if (timeLeft === 0 && !finished) {
      if (timerRef.current) clearInterval(timerRef.current);
      setFinished(true);
    }
  }, [timeLeft, finished]);

  const q = shuffled[currentIndex];

  if (shuffled.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 text-center text-gray-500 dark:text-gray-400">
        No test questions available.
      </div>
    );
  }

  if (finished) {
    const score = answers.filter(Boolean).length;
    const total = answers.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const elapsed = TIME_LIMIT - timeLeft;
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 text-center">
        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-2">
          Test Complete
        </div>
        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-1">{score}/{total}</div>
        <p className="text-gray-500 dark:text-gray-400 mb-1">
          {pct}% accuracy | Time: {mins}:{secs.toString().padStart(2, '0')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {pct >= 80 ? 'Excellent understanding!' : pct >= 50 ? 'Good, but review weak areas.' : 'Need more practice. Try the cheat sheet first.'}
        </p>

        {/* Review wrong answers */}
        <div className="text-left mb-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Review</h4>
          {shuffled.map((sq, i) => {
            if (i >= answers.length) return null;
            const wasCorrect = answers[i];
            return (
              <div key={i} className={`mb-2 p-3 rounded-lg text-sm ${wasCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <p className="text-gray-900 dark:text-white mb-1">{sq.question}</p>
                {!wasCorrect && (
                  <p className="text-green-700 dark:text-green-400">
                    Correct answer: {sq.options.find(o => o.correct)?.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setShuffled(shuffle(questions).slice(0, Math.min(10, questions.length)));
            setCurrentIndex(0);
            setSelected(null);
            setAnswers([]);
            setTimeLeft(TIME_LIMIT);
            setFinished(false);
          }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Retry Test
        </button>
      </div>
    );
  }

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = q.options[idx]?.correct;
    onAnswer(topicId, 'test', !!correct);
  };

  const handleNext = () => {
    setAnswers(prev => [...prev, q.options[selected ?? 0]?.correct ?? false]);
    if (currentIndex + 1 >= shuffled.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const isCorrect = selected !== null && q.options[selected]?.correct;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
      {/* Timer + Progress */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">Q{currentIndex + 1}/{shuffled.length}</span>
        <span className={`font-mono font-bold text-lg ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-5">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
          style={{ width: `${((currentIndex) / shuffled.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <p className="text-gray-900 dark:text-white font-medium mb-3">{q.question}</p>

      {/* Code block if present */}
      {q.code && <CodeBlock code={q.code} />}

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => {
          let cls = 'border-2 rounded-lg p-3 text-left transition-all cursor-pointer ';
          if (selected === null) {
            cls += 'border-gray-200 dark:border-gray-600 hover:border-cyan-400 dark:hover:border-cyan-500';
          } else if (opt.correct) {
            cls += 'border-green-500 bg-green-50 dark:bg-green-900/20';
          } else if (selected === idx) {
            cls += 'border-red-500 bg-red-50 dark:bg-red-900/20';
          } else {
            cls += 'border-gray-200 dark:border-gray-600 opacity-50';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={cls}>
              <span className="text-sm text-gray-900 dark:text-white">{opt.text}</span>
              {selected !== null && opt.correct && <span className="ml-2 text-green-600 font-bold text-xs">Correct</span>}
              {selected === idx && !opt.correct && <span className="ml-2 text-red-600 font-bold text-xs">Wrong</span>}
            </button>
          );
        })}
      </div>

      {/* Step hint for wrong */}
      {selected !== null && !isCorrect && (
        <div className="mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          {q.steps.map((step, i) => (
            <div key={i} className="flex gap-2 mb-1 last:mb-0">
              <span className="text-xs font-bold text-cyan-500 bg-cyan-100 dark:bg-cyan-900/40 rounded px-2 py-1 h-fit whitespace-nowrap">Step {i + 1}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      )}

      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity"
        >
          {currentIndex + 1 >= shuffled.length ? 'Finish Test' : 'Next'}
        </button>
      )}
    </div>
  );
}