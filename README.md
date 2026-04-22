# 基本情報技術者試験 対策アプリ

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Installable-4CAF50?logo=pwa&logoColor=white)

基本情報技術者試験（FE）の合格に向けたブラウザ完結型対策アプリです。問題集・計算トレーニング・科目B（擬似言語）の3つのセクションを搭載し、通勤中やスキマ時間に手軽に学習できます。

外部APIに一切依存せず、すべてのデータはローカルに保持。PWA対応でスマホへのホーム画面追加も可能です。

---

## 📝 Features

### Quiz（問題集）

テクノロジ系・マネジメント系の全9分野をカバーする270問の選択式問題集です。

| 分野 | カテゴリ | 問題数 |
|------|---------|--------|
| 🔧 | ハードウェア | 30問 |
| 💻 | ソフトウェア | 30問 |
| 🗄️ | データベース | 30問 |
| 🌐 | ネットワーク | 30問 |
| 🔒 | セキュリティ | 30問 |
| 📊 | 経営戦略・企業と法務 | 30問 |
| ⚙️ | 開発技術 | 30問 |
| 📋 | プロジェクトマネジメント | 30問 |
| 🛠️ | サービスマネジメント | 30問 |

- **ドリルモード** — 分野別に全問またはランダム出題
- **模試モード** — 全分野からランダム20問・時間制限付きの本番シミュレーション
- **復習モード** — 間違えた問題だけを抽出して再挑戦
- **用語集** — 重要用語の一覧と関連問題へのジャンプ機能
- 選択肢のシャッフル、解答後の解説表示、正答率トラッキングを搭載
- 進捗とスコアはlocalStorageに自動保存

### Calc Training（計算トレーニング）

午後試験で頻出の計算問題を7トピック・151問で体系的に練習できます。

| トピック | 問題数 | 難易度 |
|---------|--------|--------|
| 基数変換（2→10→16進他） | 20問 | ⭐⭐ |
| ビット演算（AND/OR/XOR/シフト） | 20問 | ⭐⭐ |
| 論理回路（ブール代数・真理値表） | 20問 | ⭐⭐ |
| メモリアクセス（アドレス計算） | 22問 | ⭐⭐⭐ |
| サブネット計算（CIDR・IP分割） | 23問 | ⭐⭐⭐ |
| 排他制御（クリティカルセクション） | 23問 | ⭐⭐⭐ |
| 待ち行列（M/M/1・平均待ち時間） | 23問 | ⭐⭐⭐ |

**5つの学習モード**を各トピックに搭載：

1. **チートシート** — 解法の公式・手順をまとめたリファレンス
2. **例題** — ステップバイステップの解法付き例題
3. **練習** — 解答とステップ解説を見ながら学習
4. **テスト** — 時間制限付きで本番通りに解答
5. **上級** — より難度の高い応用問題に挑戦

- トピック別の進捗トラッキングと苦手分野の分析機能
- すべて日本語で記述

### Subject B Training（科目Bトレーニング）

午後試験の科目B（擬似言語）に特化したトレーニングセクションです。IPA擬似言語仕様に準拠（1始まり配列インデックス）。

| トピック | 問題数 | 内容 |
|---------|--------|------|
| 記法ガイド | 10問 | IPA擬似言語の文法・基本構文 |
| 基本トレース | 20問 | 簡単なコードの実行結果を追跡 |
| 配列操作 | 18問 | 配列の要素アクセス・操作 |
| ループ分析 | 15問 | for/whileループの解析 |
| 探索アルゴリズム | 10問 | 線形探索・二分探索 |
| ソートアルゴリズム | 10問 | バブルソート・選択ソート他 |
| 再帰 | 10問 | 再帰関数のトレース |
| データ構造 | 10問 | スタック・キュー・リスト |
| バグ検出 | 10問 | コード中のバグを見つける |
| 過去問レベル | 10問 | 実際の午後問題に近い難度 |

- コードブロック表示＋ステップバイステップの実行トレース
- 計算トレーニングと同じ5つの学習モード
- 123問を収録

---

## 🛠 Tech Stack

- **React 19** + **TypeScript 6** — 型安全なコンポーネント開発
- **Vite 8** — 高速HMRとビルド
- **Tailwind CSS v4** — ユーティリティファーストのスタイリング
- **PWA** — Service Worker + manifest.jsonでネイティブアプリのようにインストール可能
- **localStorage** — 進捗・スコアの永続化（外部DB不要）

## 📋 Design Principles

- **モバイルファースト** — スマホでの学習を最優先にレスポンシブ設計
- **ダークモード** — 目に優しい暗色テーマ（トグル切替）
- **オフライン対応** — 外部API不要ですべての機能がローカルで動作
- **データはJSON** — 問題データはTypeScript/JSONファイルに直接記述、メンテナンス容易

---

## 🚀 Getting Started

```bash
# リポジトリをクローン
git clone https://github.com/happytown-s/fe-exam-study.git
cd fe-exam-study

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

## 🚢 Deployment

### Vercel

```bash
npx vercel
```

### その他の静的ホスティング

```bash
npm run build
# dist/ フォルダを任意の静的ホスティングサービスにデプロイ
```

---

## 📁 Project Structure

```
src/
├── components/        # 共通UIコンポーネント
│   ├── CalcTraining.tsx        # 計算トレーニング
│   ├── PseudoLanguageTraining.tsx  # 科目Bトレーニング
│   ├── QuizCard.tsx            # クイズカード
│   ├── StatsSummary.tsx        # 学習統計サマリー
│   └── ...
├── core/              # エンジン・型定義
│   ├── QuizEngine.tsx
│   ├── types.ts
│   └── useStorage.ts           # localStorage フック
├── data/              # 問題データ（全ローカル）
│   ├── calc-training.json      # 計算トレーニング 151問
│   ├── pseudo-language-training.json  # 科目B 123問
│   ├── fe-*.ts                 # 午前問題 270問（9分野）
│   ├── config.ts               # アプリ設定
│   └── questions.ts            # 全問題の統合
├── pages/             # ページコンポーネント
└── utils/             # ヘルパー関数
```

## 📄 License

MIT
