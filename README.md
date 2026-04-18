# Quiz Framework Template 📝

汎用問題集フレームワーク。問題データを追加するだけで、どの資格試験にも対応できます。

## 特徴
- 🎯 ドリルモード（分野別）
- 📝 模試モード（本試験形式）
- 📚 用語集
- 🔄 選択肢ランダム表示
- 🌙 ダークモード
- 📱 レスポンシブ対応
- 💾 進捗自動保存（localStorage）

## クイックスタート

```bash
npm install
npm run dev
```

## 新しい資格を追加する方法

### 1. `src/data/config.ts` を編集
```typescript
export const quizConfig: QuizConfig = {
  id: 'your-exam',
  title: '試験名',
  passLine: 70,
  examQuestions: 60,
  examTimeLimit: 60,
  categories: [
    {
      id: 'category1',
      name: '分野1',
      label: '分野1の表示名',
      file: () => import('./category1').then(m => m.questions),
    },
  ],
  termsFile: () => import('./terms').then(m => m.terms),
};
```

### 2. 問題ファイルを作成 (`src/data/category1.ts`)
```typescript
import type { Question } from '../core/types';

export const questions: Question[] = [
  {
    id: 1,
    category: 'category1',
    categoryLabel: '分野1の表示名',
    question: '問題文',
    options: [
      { text: '選択肢A', correct: false },
      { text: '選択肢B', correct: true },
      { text: '選択肢C', correct: false },
      { text: '選択肢D', correct: false },
    ],
    explanation: '解説文',
  },
];
```

### 3. 用語集を作成 (`src/data/terms.ts`)
```typescript
import type { Term } from '../core/types';

export const terms: Term[] = [
  {
    id: 't1',
    term: '用語名',
    definition: '定義',
    category: 'category1',
    relatedQuestionIds: [1],
  },
];
```

### 4. ビルド
```bash
npm run build
```

## デプロイ

### Vercel
```bash
npx vercel
```

## 技術スタック
- React + TypeScript + Vite
- Tailwind CSS
- localStorage for progress persistence
