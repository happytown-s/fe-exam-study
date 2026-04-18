export interface Term {
  id: number;
  term: string;
  reading: string;
  category: string;
  categoryLabel: string;
  definition: string;
  relatedTermIds: number[];
  relatedQuestionIds: number[];
}

export const terms: Term[] = [
  // === AI基礎知識 (1-15) ===
  { id: 1, term: '人工知能（AI）', reading: 'じんこうちのう', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '人間の知能的な機能をコンピュータ上で実現する技術の総称。1956年のダートマス会議でジョン・マッカーシーが命名。', relatedTermIds: [2, 3, 4], relatedQuestionIds: [3, 11] },
  { id: 2, term: 'ダートマス会議', reading: 'だーとますかいぎ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '1956年にアメリカ・ダートマス大学で開催されたAIの創始とされる会議。ジョン・マッカーシーらが主催。', relatedTermIds: [1], relatedQuestionIds: [1] },
  { id: 3, term: 'エキスパートシステム', reading: 'えきすぱーとしすてむ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '人間の専門家の知識をルール（知識ベース）として表現し、推論エンジンで推論を行う第1世代AIの代表例。', relatedTermIds: [1, 4], relatedQuestionIds: [2, 22] },
  { id: 4, term: 'AI冬の時代', reading: 'えーあいふゆのじだい', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '1970年代〜1990年代にかけてAI研究が低迷した時期。期待に応える成果が出ず、研究資金が削減された。', relatedTermIds: [1, 2], relatedQuestionIds: [6] },
  { id: 5, term: '強いAI・弱いAI', reading: 'つよいえーあい・よわいえーあい', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '強いAIは人間と同等以上の汎用的な知能を持つAI。弱いAIは特定のタスクに特化したAI。現在のAIはすべて弱いAI。', relatedTermIds: [1], relatedQuestionIds: [9, 26] },
  { id: 6, term: 'アラン・チューリング', reading: 'あらんちゅーりんぐ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '「コンピュータの父」と呼ばれる数学者。チューリングマシンを考案し、チューリングテストを提唱。AIの概念に大きな影響を与えた。', relatedTermIds: [1, 7], relatedQuestionIds: [8] },
  { id: 7, term: 'チューリングテスト', reading: 'ちゅーりんぐてすと', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '人間がAIと対話した際、相手が人間かAIか区別できないならAIは知能を持つというテスト。1950年にチューリングが提唱。', relatedTermIds: [6], relatedQuestionIds: [8] },
  { id: 8, term: '第1次AIブーム', reading: 'だいいちじえーあいぶーむ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '1950年代〜1960年代。エキスパートシステムや探索アルゴリズムが注目された時期。', relatedTermIds: [3, 4], relatedQuestionIds: [4, 7] },
  { id: 9, term: '第2次AIブーム', reading: 'だいにじえーあいぶーむ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '1980年代〜1990年代。エキスパートシステムの実用化とニューラルネットワークの研究が進んだ時期。', relatedTermIds: [3, 4, 16], relatedQuestionIds: [5] },
  { id: 10, term: '第3次AIブーム', reading: 'だいさんじえーあいぶーむ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '2010年代〜現在。ディープラーニングの発展とビッグデータ・GPUの恩恵により急速に進展。ChatGPTなどで一般化。', relatedTermIds: [1, 16, 17], relatedQuestionIds: [7] },
  { id: 11, term: '機械学習', reading: 'きかいがくしゅう', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: 'データからパターンを自動的に学習する手法の総称。AIを実現するための主要な技術アプローチ。', relatedTermIds: [1, 17, 18], relatedQuestionIds: [11] },
  { id: 12, term: 'シンギュラリティ', reading: 'しんぎゅらりてぃ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: 'AIが人間の知能を超える技術的特異点。レイ・カーツワイルが2045年に予測。', relatedTermIds: [5], relatedQuestionIds: [30] },
  { id: 13, term: '探索アルゴリズム', reading: 'たんさくあるごりずむ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '問題解決のために可能性を系統的に探索する手法。幅優先探索、深さ優先探索、A*アルゴリズムなど。', relatedTermIds: [3], relatedQuestionIds: [14] },
  { id: 14, term: 'ナレッジグラフ', reading: 'なれっじぐらふ', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '知識をグラフ構造で表現したもの。実体と関係をノードとエッジで表現。Googleの検索でも使用。', relatedTermIds: [3, 61], relatedQuestionIds: [10] },
  { id: 15, term: 'コモンセンス推論', reading: 'こもんせんすすいろん', category: 'ai_basics', categoryLabel: 'AI基礎知識', definition: '人間が常識的に持っている推論能力。AIにとって最も困難な課題の一つ。', relatedTermIds: [1], relatedQuestionIds: [12, 15] },

  // === 機械学習基礎 (16-30) ===
  { id: 16, term: 'ディープラーニング', reading: 'でぃーぷらーにんぐ', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '多層のニューラルネットワークを用いた機械学習手法。画像認識、自然言語処理などで人間を超える性能を実現。', relatedTermIds: [11, 17], relatedQuestionIds: [55] },
  { id: 17, term: 'ニューラルネットワーク', reading: 'にゅーらるねっとわーく', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '人間の脳の神経細胞（ニューロン）をモデル化した計算モデル。入力層、隠れ層、出力層から構成。', relatedTermIds: [11, 16, 18], relatedQuestionIds: [54] },
  { id: 18, term: '教師あり学習', reading: 'きょうしありがくしゅう', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '正解ラベル付きデータから入力と出力の関係を学習する手法。分類と回帰に分かれる。', relatedTermIds: [11, 19, 20], relatedQuestionIds: [31, 36] },
  { id: 19, term: '教師なし学習', reading: 'きょうしなしがくしゅう', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '正解ラベルなしデータから構造やパターンを見つける手法。クラスタリング、次元削減など。', relatedTermIds: [11, 18, 20], relatedQuestionIds: [32] },
  { id: 20, term: '強化学習', reading: 'きょうかがくしゅう', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '環境との相互作用を通じて、報酬を最大化する行動方策を学習する手法。囲碁AI等に応用。', relatedTermIds: [11, 18], relatedQuestionIds: [33] },
  { id: 21, term: '過学習（オーバーフィッティング）', reading: 'かがくしゅう', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '訓練データに過剰に適合し、未知のデータに対して汎化性能が低下する現象。正則化やドロップアウトで対策。', relatedTermIds: [11, 16, 18], relatedQuestionIds: [34, 35] },
  { id: 22, term: '交差検証', reading: 'こうさけんしょう', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: 'データを複数のグループに分割し、汎化性能を評価する手法。k分割交差検証が一般的。', relatedTermIds: [21, 18], relatedQuestionIds: [38] },
  { id: 23, term: 'ハイパーパラメータ', reading: 'はいぱーぱらめーた', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '学習前に人間が設定するパラメータ。学習率、エポック数、隠れ層の数など。自動チューニング手法も存在。', relatedTermIds: [11, 16], relatedQuestionIds: [60] },
  { id: 24, term: 'バイアス・バリアンス', reading: 'ばいあす・ばりあんす', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: 'バイアスはモデルの単純化による誤差、バリアンスは訓練データへの過剰適合による誤差。両者のトレードオフが重要。', relatedTermIds: [21], relatedQuestionIds: [37] },
  { id: 25, term: '勾配降下法', reading: 'こうばいこうかほう', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '損失関数の値を最小化するためにパラメータを更新する最適化手法。学習率が重要なハイパーパラメータ。', relatedTermIds: [23, 16], relatedQuestionIds: [41] },
  { id: 26, term: 'CNN（畳み込みニューラルネットワーク）', reading: 'けーえぬえぬ', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '画像認識に特化したニューラルネットワーク。畳み込み層とプーリング層で特徴抽出を行う。ResNet等が代表例。', relatedTermIds: [16, 17], relatedQuestionIds: [48] },
  { id: 27, term: 'RNN（再帰的ニューラルネットワーク）', reading: 'あーるえぬえぬ', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '時系列データを処理するニューラルネットワーク。LSTM、GRUなどの派生モデルが存在。', relatedTermIds: [16, 17, 61], relatedQuestionIds: [58, 59] },
  { id: 28, term: '転移学習', reading: 'てんいがくしゅう', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: 'あるタスクで学習済みのモデルを別のタスクに再利用する手法。少ないデータで高精度なモデルを構築できる。', relatedTermIds: [16], relatedQuestionIds: [50] },
  { id: 29, term: 'データオーギュメンテーション', reading: 'でーたおーぎゅめんてーしょん', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: '訓練データを回転、反転、ノイズ追加等で増やす手法。過学習防止と汎化性能向上に効果的。', relatedTermIds: [21], relatedQuestionIds: [52] },
  { id: 30, term: '特徴量エンジニアリング', reading: 'とくちょうりょうえんじにありんぐ', category: 'ml_basics', categoryLabel: '機械学習基礎', definition: 'データから予測に有用な特徴量を手動で作成・選択する作業。ディープラーニングでは自動で特徴抽出される。', relatedTermIds: [11, 16], relatedQuestionIds: [49] },

  // === 生成AIの仕組み (31-45) ===
  { id: 31, term: '生成AI', reading: 'せいせいえーあい', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'テキスト、画像、音声等の新しいコンテンツを生成するAI。ChatGPT、Stable Diffusion等が代表例。', relatedTermIds: [32, 33, 34, 1], relatedQuestionIds: [90] },
  { id: 32, term: '大規模言語モデル（LLM）', reading: 'だいきぼげんごもでる', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: '大量のテキストデータで学習した大規模な言語モデル。GPT、Claude、Gemini等が代表。次トークン予測でテキスト生成。', relatedTermIds: [31, 33, 34], relatedQuestionIds: [62, 80] },
  { id: 33, term: 'Transformer', reading: 'とらんすふぉーまー', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: '2017年にGoogleが発表したニューラルネットワークアーキテクチャ。Self-Attention機構により長距離依存関係を捉える。現代のLLMの基盤。', relatedTermIds: [32, 34, 27], relatedQuestionIds: [61] },
  { id: 34, term: 'Self-Attention', reading: 'せるふあてんしょん', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'Transformerの核心機構。入力系列の各要素間の関連性を計算し、重要な情報に注目する仕組み。', relatedTermIds: [33], relatedQuestionIds: [84, 85] },
  { id: 35, term: '拡散モデル', reading: 'かくさんもでる', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'データに徐々にノイズを加え、その逆過程で新しいデータを生成するモデル。Stable Diffusion、DALL-E等で使用。', relatedTermIds: [31], relatedQuestionIds: [65] },
  { id: 36, term: 'GAN（敵対的生成ネットワーク）', reading: 'ぎーあーえぬ', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: '生成器と識別器を競わせてデータを生成するモデル。偽造画像生成などに応用。', relatedTermIds: [31, 35], relatedQuestionIds: [66] },
  { id: 37, term: 'VAE（変分オートエンコーダ）', reading: 'ぶいえーいー', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'エンコーダでデータを潜在空間に圧縮し、デコーダで復元・生成するモデル。画像生成等に応用。', relatedTermIds: [31, 35], relatedQuestionIds: [67] },
  { id: 38, term: 'ファインチューニング', reading: 'ふぁいんちゅーにんぐ', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: '事前学習済みモデルを特定のタスクに合わせて追加学習させる手法。LoRA等の効率的な手法も存在。', relatedTermIds: [32, 28], relatedQuestionIds: [63] },
  { id: 39, term: 'RAG（検索拡張生成）', reading: 'らぐ', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: '外部データベースから関連情報を検索し、プロンプトに付与して回答を生成する手法。ハルシネーション防止に有効。', relatedTermIds: [32, 94], relatedQuestionIds: [64] },
  { id: 40, term: 'LoRA', reading: 'ろーら', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'Low-Rank Adaptationの略。モデル全体ではなく低ランク行列を追加する効率的なファインチューニング手法。', relatedTermIds: [38], relatedQuestionIds: [70] },
  { id: 41, term: 'RLHF', reading: 'あるえるえいちえふ', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: '人間のフィードバックから強化学習でモデルを最適化する手法。ChatGPTの安全性と品質向上に貢献。', relatedTermIds: [20, 32], relatedQuestionIds: [75] },
  { id: 42, term: 'トークン', reading: 'とーくん', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'LLMが処理するテキストの最小単位。単語、文字、サブワード等に分割される。GPTはBPE方式を使用。', relatedTermIds: [32], relatedQuestionIds: [69] },
  { id: 43, term: 'マルチモーダルAI', reading: 'まるちもーだるえーあい', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'テキスト、画像、音声、動画など複数のモダリティ（形式）を同時に処理できるAI。GPT-4o、Gemini等。', relatedTermIds: [31, 32], relatedQuestionIds: [68, 89] },
  { id: 44, term: 'コンテキストウィンドウ', reading: 'こんてきすとうぃんどう', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'LLMが一度に処理できるトークン数の上限。大きいほど長い文脈を理解できる。', relatedTermIds: [32, 42], relatedQuestionIds: [78] },
  { id: 45, term: '量子化', reading: 'りょうしか', category: 'generative_ai', categoryLabel: '生成AIの仕組み', definition: 'モデルの重みパラメータの精度を下げてメモリ使用量を削減する手法。INT8、INT4量子化が一般的。', relatedTermIds: [32], relatedQuestionIds: [76] },

  // === プロンプトエンジニアリング (46-60) ===
  { id: 46, term: 'プロンプト', reading: 'ぷろんぷと', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'AIに入力する指示文や質問のこと。プロンプトの質が出力品質を大きく左右する。', relatedTermIds: [47, 48, 49], relatedQuestionIds: [97] },
  { id: 47, term: 'ゼロショットプロンプティング', reading: 'ぜろしょっとぷろんぷてぃんぐ', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: '例題を与えずに、指示だけでAIにタスクを実行させる手法。事前学習の知識のみで推論させる。', relatedTermIds: [46, 48], relatedQuestionIds: [91] },
  { id: 48, term: 'フューショットプロンプティング', reading: 'ふゅーしょっとぷろんぷてぃんぐ', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: '少数の例題をプロンプトに含めて、AIにタスクの形式や意図を理解させる手法。ゼロショットより精度が高い。', relatedTermIds: [46, 47], relatedQuestionIds: [92, 105] },
  { id: 49, term: 'Chain-of-Thought（CoT）', reading: 'ちぇーんおぶぞーと', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: '「段階的に考えて」と指示し、AIの推論プロセスを可視化する手法。複雑な問題で精度が向上。', relatedTermIds: [46, 50], relatedQuestionIds: [93, 110] },
  { id: 50, term: 'ReAct', reading: 'りあくと', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'Reasoning（推論）とActing（行動）を繰り返すフレームワーク。ツール使用や外部検索を組み合わせた推論が可能。', relatedTermIds: [49], relatedQuestionIds: [106] },
  { id: 51, term: 'ロールプロンプティング', reading: 'ろーるぷろんぷてぃんぐ', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'AIに特定の役割（専門家、教師等）を割り当てる手法。「あなたは〇〇の専門家です」のように指示。', relatedTermIds: [46], relatedQuestionIds: [94] },
  { id: 52, term: 'プロンプトインジェクション', reading: 'ぷろんぷといんじぇくしょん', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: '悪意のある指示をプロンプトに混ぜ、AIに意図しない動作をさせる攻撃手法。対策が重要なセキュリティ課題。', relatedTermIds: [46, 123], relatedQuestionIds: [95, 111] },
  { id: 53, term: 'システムプロンプト', reading: 'しすてむぷろんぷと', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'AIの動作設定や制約を定義する初期プロンプト。ユーザーからの入力の前に設定される。', relatedTermIds: [46, 51], relatedQuestionIds: [96] },
  { id: 54, term: 'トークン制限', reading: 'とーくんせいげん', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'LLMで処理可能なトークン数の上限。入力と出力の合計が制限を超えるとエラーになる。', relatedTermIds: [42, 44], relatedQuestionIds: [117] },
  { id: 55, term: '温度（Temperature）', reading: 'おんど', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'LLMの出力ランダム性を制御するパラメータ。低いほど一貫性が高く、高いほど多様性が増す。', relatedTermIds: [46, 32], relatedQuestionIds: [119] },
  { id: 56, term: 'Tree of Thought（ToT）', reading: 'とりーおぶぞーと', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'CoTを拡張し、複数の推論経路を木構造で探索する手法。より複雑な問題解決に有効。', relatedTermIds: [49], relatedQuestionIds: [100] },
  { id: 57, term: '構造化プロンプト', reading: 'こうぞうかぷろんぷと', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'JSONやXML等の構造化フォーマットで出力を要求するプロンプト手法。API連携やデータ処理で有用。', relatedTermIds: [46], relatedQuestionIds: [118] },
  { id: 58, term: 'ガードレール', reading: 'がーどれーる', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'AIの出力を安全な範囲に制限する仕組み。有害出力の防止や、特定トピックへの回答制限など。', relatedTermIds: [52, 53], relatedQuestionIds: [108] },
  { id: 59, term: 'メタプロンプティング', reading: 'めたぷろんぷてぃんぐ', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: 'AIにプロンプト自体を生成させる手法。AIが最適なプロンプトを自動設計する。', relatedTermIds: [46], relatedQuestionIds: [102] },
  { id: 60, term: '自己一貫性（Self-Consistency）', reading: 'じこいっかんせい', category: 'prompt_engineering', categoryLabel: 'プロンプトエンジニアリング', definition: '複数回推論させ、最も多い回答を最終出力とする手法。CoTと組み合わせて精度向上。', relatedTermIds: [49], relatedQuestionIds: [99] },

  // === AIのリスク・倫理 (61-75) ===
  { id: 61, term: 'ハルシネーション', reading: 'はるしねーしょん', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIが事実と異なる内容を、もっともらしく生成する現象。生成AIの重大なリスクの一つ。', relatedTermIds: [31, 39, 62], relatedQuestionIds: [121] },
  { id: 62, term: 'バイアス', reading: 'ばいあす', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIの出力に偏りが生じる現象。学習データに含まれる偏見が反映される。性別、人種、年齢等のバイアスが問題。', relatedTermIds: [61, 63], relatedQuestionIds: [122] },
  { id: 63, term: 'プライバシー侵害', reading: 'ぷらいばしーしんがい', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIの学習データや出力から個人情報が漏洩するリスク。GDPR等で規制。オプトアウト/オプトインの議論が活発。', relatedTermIds: [62, 153], relatedQuestionIds: [127] },
  { id: 64, term: 'ディープフェイク', reading: 'でぃーぷふぇいく', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIで本物と見分けがつかない偽の画像や動画を生成する技術。選挙操作、詐欺等に悪用されるリスク。', relatedTermIds: [31, 62], relatedQuestionIds: [123] },
  { id: 65, term: 'フェイクニュース', reading: 'ふぇいくにゅーす', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIを使って拡散される虚偽のニュース。SNSで急速に拡散され、社会に重大な影響を与える。', relatedTermIds: [64, 61], relatedQuestionIds: [124] },
  { id: 66, term: 'ブラックボックス問題', reading: 'ぶらっくぼっくすもんだい', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIの判断プロセスが人間に理解できない問題。特にディープラーニングで顕著。説明性の向上が課題。', relatedTermIds: [16, 21], relatedQuestionIds: [125] },
  { id: 67, term: 'アライメント問題', reading: 'あらいんめんともんだい', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIの目標と人間の価値観を一致させる問題。AIが人間の意図に反して行動するリスクへの対策。', relatedTermIds: [41], relatedQuestionIds: [141] },
  { id: 68, term: 'アドバーサリアル攻撃', reading: 'あどばーさりあるこうげき', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIモデルを欺瞞する入力を意図的に作成する攻撃。敵対的サンプル、データポイズニング等。', relatedTermIds: [52, 62], relatedQuestionIds: [134, 138, 143] },
  { id: 69, term: 'AIセーフティ', reading: 'えーあいせーふてぃ', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIシステムが安全に動作するための研究と対策。有害出力の防止、制御可能性の確保等を含む。', relatedTermIds: [67, 41], relatedQuestionIds: [133] },
  { id: 70, term: 'データポイズニング', reading: 'でーたぽいずにんぐ', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: '学習データに悪意のあるデータを混ぜ、AIの動作を意図的に歪める攻撃手法。', relatedTermIds: [68], relatedQuestionIds: [128] },
  { id: 71, term: 'モデル崩壊', reading: 'もでるほうかい', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AI生成データがインターネット上に増え、それを学習データに使うとモデル性能が劣化する現象。', relatedTermIds: [31, 61], relatedQuestionIds: [136] },
  { id: 72, term: '情報漏洩', reading: 'じょうほうろうえい', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIの学習データやプロンプトに含まれる機密情報が意図せず出力されるリスク。企業導入で重大な課題。', relatedTermIds: [63, 52], relatedQuestionIds: [138] },
  { id: 73, term: '著作権侵害リスク', reading: 'ちょさくけんしんがいりすく', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIが生成したコンテンツが既存の著作物と類似し、著作権を侵害するリスク。', relatedTermIds: [151, 31], relatedQuestionIds: [143] },
  { id: 74, term: '透明性（Transparency）', reading: 'とうめいせい', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIの判断プロセスや学習データを公開し、利用者が理解できる状態。AIガバナンスの基本原則の一つ。', relatedTermIds: [66], relatedQuestionIds: [131] },
  { id: 75, term: '説明可能AI（XAI）', reading: 'せつめいかのうえーあい', category: 'ai_risks', categoryLabel: 'AIのリスク・倫理', definition: 'AIの判断理由を人間に説明できる技術。EU AI Actでも高リスクAIに説明性が求められている。', relatedTermIds: [66, 74], relatedQuestionIds: [126] },

  // === 著作権・法規制 (76-90) ===
  { id: 76, term: '著作権法30条の4', reading: 'ちょさくけんほうさんじょうのよん', category: 'legal', categoryLabel: '著作権・法規制', definition: 'AI開発のための情報解析特例。著作物をAI学習に利用できる規定。2024年施行の改正著作権法で拡充。', relatedTermIds: [151, 77], relatedQuestionIds: [151, 165] },
  { id: 77, term: 'オプトアウト方式', reading: 'おぷとあうとほうしき', category: 'legal', categoryLabel: '著作権・法規制', definition: '権利者が明示的に拒否しない限り、AI学習に利用できる方式。日本の現行制度。EUはオプトイン方式を採用。', relatedTermIds: [76, 78], relatedQuestionIds: [153] },
  { id: 78, term: 'オプトイン方式', reading: 'おぷといんほうしき', category: 'legal', categoryLabel: '著作権・法規制', definition: '権利者の明示的な許諾が必要な方式。EU AI Act等で採用。日本のオプトアウトとは対照的。', relatedTermIds: [77], relatedQuestionIds: [154] },
  { id: 79, term: 'EU AI Act', reading: 'ゆーあいえるえーあいあくと', category: 'legal', categoryLabel: '著作権・法規制', definition: 'EUの包括的AI規制法。2024年施行。リスクベースでAIを分類し、高リスクAIに厳格な義務を課す。世界初の包括的AI法規制。', relatedTermIds: [78, 80], relatedQuestionIds: [157, 158, 159] },
  { id: 80, term: 'AIガバナンス', reading: 'えーあいがばなんす', category: 'legal', categoryLabel: '著作権・法規制', definition: 'AIの開発・運用を適切に管理するための枠組み。倫理原則、コンプライアンス、監査体制等を含む。', relatedTermIds: [79, 74], relatedQuestionIds: [177] },
  { id: 81, term: '個人情報保護法', reading: 'こじんじょうほうほごほう', category: 'legal', categoryLabel: '著作権・法規制', definition: '個人情報の取り扱いを規制する日本の法律。AIが個人データを処理する際も適用。匿名加工データの規定あり。', relatedTermIds: [63, 79], relatedQuestionIds: [156] },
  { id: 82, term: '生成AI事業者ガイドライン', reading: 'せいせいえーあいじぎょうしゃがいどらいん', category: 'legal', categoryLabel: '著作権・法規制', definition: '経済産業省・文化庁が公表したAI事業者向けの指針。著作権対応、情報セキュリティ、透明性等の実務指針。', relatedTermIds: [76, 80], relatedQuestionIds: [160, 161] },
  { id: 83, term: '文化庁の著作権検討', reading: 'ぶんかちょうのちょさくけんけんとう', category: 'legal', categoryLabel: '著作権・法規制', definition: '文化庁が実施しているAIと著作権に関する検討会。オプトアウトの在り方、権利侵害の判断基準等を議論。', relatedTermIds: [76, 77], relatedQuestionIds: [152] },
  { id: 84, term: 'G7広島AIプロセス', reading: 'じーせぶんひろしまえーあいぷろせす', category: 'legal', categoryLabel: '著作権・法規制', definition: '2023年G7広島サミットで合意されたAIガバナンスの国際原則。信頼できるAIの普及に向けた11原則。', relatedTermIds: [80], relatedQuestionIds: [173] },
  { id: 85, term: 'GDPR', reading: 'じーでぃぴーあーる', category: 'legal', categoryLabel: '著作権・法規制', definition: 'EUの一般データ保護規則。個人データの取り扱いを厳格に規制。AIの学習データにも適用。', relatedTermIds: [79, 81], relatedQuestionIds: [168] },
  { id: 86, term: 'AI倫理指針', reading: 'えーあいりんりしじゅん', category: 'legal', categoryLabel: '著作権・法規制', definition: 'AIの開発・利用に関する倫理原則。透明性、公平性、責任、プライバシー等を含む。各国・機関が独自指針を策定。', relatedTermIds: [80, 74], relatedQuestionIds: [130] },
  { id: 87, term: '深い偽物規制法', reading: 'ふかいにせものきせいほう', category: 'legal', categoryLabel: '著作権・法規制', definition: 'ディープフェイクによる被害を防ぐための法規制。中国や一部諸国で既に法制化。日本でも検討中。', relatedTermIds: [64, 79], relatedQuestionIds: [167] },
  { id: 88, term: '暗号資産・NFTとAI', reading: 'あんごうしさんえぬえふてぃーとえーあい', category: 'legal', categoryLabel: '著作権・法規制', definition: 'AI生成物のNFT化に関する法規制。AI生成物に著作性が認められるか、所有権の帰属等が議論の的。', relatedTermIds: [151, 31], relatedQuestionIds: [163] },
  { id: 89, term: '知的財産権', reading: 'ちてきざいさんけん', category: 'legal', categoryLabel: '著作権・法規制', definition: '特許、商標、著作権等の権利の総称。AI生成物の著作権帰属は未解決の法課題。', relatedTermIds: [151, 88], relatedQuestionIds: [162] },
  { id: 90, term: '日本AI戦略', reading: 'にほんえーあいせんりゃく', category: 'legal', categoryLabel: '著作権・法規制', definition: '日本政府のAI戦略。AI技術の研究開発推進と社会実装を両立。人材育成と国際協調を重視。', relatedTermIds: [80], relatedQuestionIds: [172] },

  // === ビジネス活用 (91-105) ===
  { id: 91, term: 'PoC（概念実証）', reading: 'ぴーおーしー', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AI導入の前に小規模で効果を検証する取り組み。Proof of Concept。実用化前の重要なステップ。', relatedTermIds: [92, 93], relatedQuestionIds: [182] },
  { id: 92, term: 'ROI（投資対効果）', reading: 'あーるおーあい', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AI導入に対する投資対効果。コスト削減、業務効率化、新規収益等を定量的に評価。', relatedTermIds: [91], relatedQuestionIds: [183] },
  { id: 93, term: '社内AIガイドライン', reading: 'しゃないえーあいがいどらいん', category: 'business', categoryLabel: 'ビジネス活用', definition: '企業内でAIを安全に利用するためのルール。機密情報の入力禁止、出力の確認義務等。', relatedTermIds: [80, 72], relatedQuestionIds: [184] },
  { id: 94, term: 'チェンジマネジメント', reading: 'ちぇんじまねじめんと', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AI導入に伴う組織変革を管理するプロセス。従業員の抵抗を軽減し、定着を促進。', relatedTermIds: [91, 93], relatedQuestionIds: [189] },
  { id: 95, term: 'MLOps', reading: 'えむえるおぷす', category: 'business', categoryLabel: 'ビジネス活用', definition: '機械学習モデルの開発・運用を自動化・管理するプラクティス。DevOpsをMLに応用した概念。', relatedTermIds: [11], relatedQuestionIds: [197] },
  { id: 96, term: 'Human-in-the-loop', reading: 'ひゅーまんいんざるーぷ', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AIの判断プロセスに人間が介在する仕組み。重要な意思決定でAIと人間の協調を実現。', relatedTermIds: [75, 80], relatedQuestionIds: [207] },
  { id: 97, term: 'API連携', reading: 'えーぴーあいれんけい', category: 'business', categoryLabel: 'ビジネス活用', definition: '外部AIサービスをAPI経由で既存システムに統合する手法。OpenAI API、Anthropic API等。', relatedTermIds: [32], relatedQuestionIds: [201] },
  { id: 98, term: 'AIスレート（AI数位化）', reading: 'えーあいすれーと', category: 'business', categoryLabel: 'ビジネス活用', definition: '企業のAI活用成熟度を評価する指標。導入段階から変革段階まで5段階で評価。', relatedTermIds: [91], relatedQuestionIds: [200] },
  { id: 99, term: 'コスト最適化', reading: 'こすとさいてきか', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AI運用コストを最小化する取り組み。モデルの軽量化、コンピューティングリソースの最適化等。', relatedTermIds: [45, 92], relatedQuestionIds: [195] },
  { id: 100, term: 'AIコンプライアンス', reading: 'えーあいこんぷらいあんす', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AIの利用が法規制や倫理基準に適合していることを確認する取り組み。', relatedTermIds: [80, 93], relatedQuestionIds: [190] },
  { id: 101, term: 'RPA（ロボティック・プロセス・オートメーション）', reading: 'あーるぴーえー', category: 'business', categoryLabel: 'ビジネス活用', definition: '定型業務を自動化するソフトウェア。AIと組み合わせることでより高度な自動化が可能。', relatedTermIds: [11], relatedQuestionIds: [206] },
  { id: 102, term: 'チャットボット', reading: 'ちゃっとぼっと', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AIを使った自動応答システム。カスタマーサポート、社内QA等に導入。LLMベースが主流に。', relatedTermIds: [32, 97], relatedQuestionIds: [185] },
  { id: 103, term: 'AI需要予測', reading: 'えーあいじゅようよそく', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AIを用いて将来の需要を予測する手法。在庫管理、生産計画、サプライチェーン最適化に活用。', relatedTermIds: [11], relatedQuestionIds: [204] },
  { id: 104, term: 'AI品質管理', reading: 'えーあいひんしつかんり', category: 'business', categoryLabel: 'ビジネス活用', definition: '製造業等でAIを使った品質検査・不良検出。画像認識と組み合わせた外観検査が主流。', relatedTermIds: [26], relatedQuestionIds: [199] },
  { id: 105, term: 'AIマーケティング', reading: 'えーあいまーけてぃんぐ', category: 'business', categoryLabel: 'ビジネス活用', definition: 'AIを活用したパーソナライズ広告、コンテンツ生成、顧客分析等のマーケティング手法。', relatedTermIds: [31, 32], relatedQuestionIds: [186] },
];
