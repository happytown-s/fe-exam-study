import { useState, useCallback, useMemo } from 'react';
import type { Question, ExamScore } from './core/types';
import { allQuestions } from './data/questions';
import { quizConfig } from './data/config';
import { useStorage } from './core/useStorage';
import { pickFromCategories, shuffle } from './utils/helpers';

import HomePage from './pages/HomePage';
import DrillSelectPage from './pages/DrillSelectPage';
import DrillPlayPage from './pages/DrillPlayPage';
import ExamPage from './pages/ExamPage';
import ExamPlayPage from './pages/ExamPlayPage';
import ExamResultPage from './pages/ExamResultPage';
import ReviewPage from './pages/ReviewPage';
import TermsPage from './pages/TermsPage';
import CalcTraining from './components/CalcTraining';
import PseudoLanguageTraining from './components/PseudoLanguageTraining';
import TextbookView from './components/TextbookView';
import TextbookSelect from './components/TextbookSelect';

import textbookHardware from './data/textbook-hardware.json';
import textbookSoftware from './data/textbook-software.json';
import textbookDatabase from './data/textbook-database.json';
import textbookNetwork from './data/textbook-network.json';
import textbookSecurity from './data/textbook-security.json';
import textbookManagement from './data/textbook-management.json';
import textbookDevMethods from './data/textbook-dev-methods.json';
import textbookProjectMgmt from './data/textbook-project-mgmt.json';
import textbookServiceMgmt from './data/textbook-service-mgmt.json';

const textbookMap: Record<string, { title: string; topics: typeof textbookHardware }> = {
  hardware: { title: 'Hardware', topics: textbookHardware },
  software: { title: 'Software', topics: textbookSoftware },
   database: { title: 'Database', topics: textbookDatabase },
  network: { title: 'Network', topics: textbookNetwork },
  security: { title: 'Security', topics: textbookSecurity },
  management: { title: 'Management', topics: textbookManagement },
  'dev-methods': { title: 'Dev Methods', topics: textbookDevMethods },
  'project-mgmt': { title: 'Project Mgmt', topics: textbookProjectMgmt },
  'service-mgmt': { title: 'Service Mgmt', topics: textbookServiceMgmt },
};

type Page =
  | 'home'
  | 'drill'
  | 'drill-play'
  | 'exam'
  | 'exam-play'
  | 'exam-result'
  | 'review'
  | 'review-play'
  | 'terms'
  | 'terms-drill'
  | 'calc-training'
  | 'pseudo-language'
  | 'textbook-select'
  | 'textbook-view';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [drillCategory, setDrillCategory] = useState<string | null>(null);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [examAnswers, setExamAnswers] = useState<Map<number, number>>(new Map());
  const [examTimeSpent, setExamTimeSpent] = useState(0);
  const [examStartKey, setExamStartKey] = useState(0);
  const [reviewQuestionIds, setReviewQuestionIds] = useState<number[]>([]);
  const [termsQuestionIds, setTermsQuestionIds] = useState<number[]>([]);
  const [textbookCategory, setTextbookCategory] = useState<string | null>(null);

  const {
    answerHistory,
    examScores,
    streak,
    darkMode,
    recordAnswer,
    recordExamScore,
    toggleDarkMode,
    getWrongQuestions,
  } = useStorage();

  const wrongCount = useMemo(() => {
    return getWrongQuestions().length;
  }, [getWrongQuestions]);

  const navigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  }, []);

  const drillQuestions = useMemo(() => {
    if (!drillCategory) return allQuestions;
    return allQuestions.filter((q) => q.category === drillCategory);
  }, [drillCategory]);

  const handleSelectCategory = useCallback((catId: string | null) => {
    setDrillCategory(catId);
    navigate('drill-play');
  }, [navigate]);

  const handleStartExam = useCallback(() => {
    const perCategory = Math.ceil(quizConfig.examQuestions / quizConfig.categories.length);
    const questions = pickFromCategories(allQuestions, perCategory);
    setExamQuestions(questions.slice(0, quizConfig.examQuestions));
    setExamAnswers(new Map());
    setExamTimeSpent(0);
    setExamStartKey((k) => k + 1);
    navigate('exam-play');
  }, [navigate]);

  const handleExamFinish = useCallback(
    (answers: Map<number, number>, timeUsed: number) => {
      setExamAnswers(answers);
      setExamTimeSpent(timeUsed);

      let correctCount = 0;
      for (const q of examQuestions) {
        const userAnswer = answers.get(q.id);
        if (userAnswer !== undefined && q.options[userAnswer]?.correct) {
          correctCount++;
          recordAnswer(q.id, true);
        } else {
          recordAnswer(q.id, false);
        }
      }

      const score: ExamScore = {
        totalQuestions: examQuestions.length,
        correctCount,
        date: new Date().toISOString(),
        timeSpent: timeUsed,
      };
      recordExamScore(score);
      navigate('exam-result');
    },
    [examQuestions, recordAnswer, recordExamScore, navigate],
  );

  const handleRetryReview = useCallback((ids: number[]) => {
    setReviewQuestionIds(ids);
    navigate('review-play');
  }, [navigate]);

  const handleTermsDrill = useCallback((ids: number[]) => {
    setTermsQuestionIds(ids);
    navigate('terms-drill');
  }, [navigate]);

  const handleDrillFinish = useCallback(
    (_results: { correct: number; total: number }) => {
      // Results shown inline in DrillPlayPage, no navigation needed
    },
    [],
  );

  const startTime = useMemo(() => Date.now(), [examStartKey]);

  const handleExamSubmit = useCallback(
    (answers: Map<number, number>) => {
      const timeUsed = Math.floor((Date.now() - startTime) / 1000);
      handleExamFinish(answers, timeUsed);
    },
    [handleExamFinish, startTime],
  );

  const handleExamTimeUp = useCallback(
    (answers: Map<number, number>) => {
      const timeUsed = quizConfig.examTimeLimit * 60; // Full time expired
      handleExamFinish(answers, timeUsed);
    },
    [handleExamFinish],
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      {currentPage === 'home' && (
        <HomePage
          onNavigate={navigate}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          answerHistory={answerHistory}
          examScores={examScores}
          streak={streak}
          wrongCount={wrongCount}
        />
      )}

      {currentPage === 'drill' && (
        <DrillSelectPage
          allQuestions={allQuestions}
          answerHistory={answerHistory}
          onSelectCategory={handleSelectCategory}
          onBack={() => navigate('home')}
        />
      )}

      {currentPage === 'drill-play' && (
        <DrillPlayPage
          key={`drill-${drillCategory ?? 'all'}`}
          questions={drillQuestions}
          categoryLabel={
            drillCategory
              ? (allQuestions.find((q) => q.category === drillCategory)
                  ?.categoryLabel ?? drillCategory)
              : '全分野'
          }
          passLine={quizConfig.passLine}
          recordAnswer={recordAnswer}
          onFinish={handleDrillFinish}
          onBack={() => navigate('drill')}
        />
      )}

      {currentPage === 'exam' && (
        <ExamPage
          config={quizConfig}
          onStart={handleStartExam}
          onBack={() => navigate('home')}
        />
      )}

      {currentPage === 'exam-play' && (
        <ExamPlayPage
          key={examStartKey}
          questions={examQuestions}
          timeLimit={quizConfig.examTimeLimit}
          onTimeUp={handleExamTimeUp}
          onSubmit={handleExamSubmit}
          onBack={() => navigate('home')}
        />
      )}

      {currentPage === 'exam-result' && (
        <ExamResultPage
          questions={examQuestions}
          answers={examAnswers}
          timeSpent={examTimeSpent}
          passLine={quizConfig.passLine}
          onReview={() => {
            const wrongIds: number[] = [];
            for (const q of examQuestions) {
              const userAnswer = examAnswers.get(q.id);
              if (userAnswer === undefined || !q.options[userAnswer]?.correct) {
                wrongIds.push(q.id);
              }
            }
            setReviewQuestionIds(wrongIds);
            navigate('review-play');
          }}
          onRetry={handleStartExam}
          onHome={() => navigate('home')}
        />
      )}

      {currentPage === 'review' && (
        <ReviewPage
          allQuestions={allQuestions}
          wrongQuestionIds={getWrongQuestions()}
          onRetry={handleRetryReview}
          onBack={() => navigate('home')}
        />
      )}

      {currentPage === 'terms' && (
        <TermsPage
          onBack={() => navigate('home')}
          onStartDrill={handleTermsDrill}
        />
      )}

      {currentPage === 'calc-training' && (
        <CalcTraining onBack={() => navigate('home')} />
      )}

      {currentPage === 'pseudo-language' && (
        <PseudoLanguageTraining onBack={() => navigate('home')} />
      )}

      {currentPage === 'textbook-select' && (
        <TextbookSelect
          onSelect={(catId) => {
            setTextbookCategory(catId);
            navigate('textbook-view');
          }}
          onBack={() => navigate('home')}
        />
      )}

      {currentPage === 'textbook-view' && textbookCategory && textbookMap[textbookCategory] && (
        <TextbookView
          title={textbookMap[textbookCategory].title}
          topics={textbookMap[textbookCategory].topics}
          onBack={() => navigate('textbook-select')}
        />
      )}

      {currentPage === 'terms-drill' && (
        <DrillPlayPage
          key={`terms-${termsQuestionIds.join(',')}`}
          questions={
            termsQuestionIds.length > 0
              ? shuffle(
                  allQuestions.filter((q) => termsQuestionIds.includes(q.id)),
                )
              : []
          }
          categoryLabel="用語から出題"
          passLine={quizConfig.passLine}
          recordAnswer={recordAnswer}
          onFinish={handleDrillFinish}
          onBack={() => navigate('terms')}
        />
      )}

      {currentPage === 'review-play' && (
        <DrillPlayPage
          key={`review-${reviewQuestionIds.join(',')}`}
          questions={
            reviewQuestionIds.length > 0
              ? allQuestions.filter((q) => reviewQuestionIds.includes(q.id))
              : []
          }
          categoryLabel="復習"
          passLine={quizConfig.passLine}
          recordAnswer={recordAnswer}
          onFinish={handleDrillFinish}
          onBack={() => navigate('review')}
        />
      )}
    </div>
  );
}
