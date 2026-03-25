---
name: career-analyze
description: >
  Use when the user wants to understand their strengths, market value, or
  professional identity. Triggers on: 「自分の強み」「市場価値」「棚卸し」
  「何ができるか」「アピールポイント」「自己分析」「強みがわからない」。
  Also triggers when the user struggles to articulate what makes them valuable,
  or when preparing material for resumes and interviews.
---

# career-analyze -- 自己分析

経験・強み・市場価値を構造的に言語化する。
「自分には何ができるか」を、主観ではなくエビデンスベースで整理する。

経験年数が短いエンジニアほど、年数以外の軸で自分を語る力が重要になる。
このスキルは「年数」ではなく「密度・学習速度・独自性」で自分を位置づけるための壁打ち。

## Knowledge の読み込み

1. `skills/career/references/career/profile.md` を Read で読む（Knowledge Map）
2. Knowledge Map に記載されたファイルの存在を確認する（Glob で `career/*.md` を検索）
3. 存在するファイルを読み込む

**ファイルが存在しない場合**: オンボーディングフローに入る（後述）。

## オンボーディングフロー（Knowledge がない場合）

career/ ディレクトリが空、またはファイルが不足している場合に実行する。
対話でユーザーの情報を引き出し、Knowledge ファイルを生成する。

### Step 1: 基本情報のヒアリング

以下を対話で聞き出す（一度に全部聞かず、自然な会話の流れで）:

- 現在の職種・ポジション
- 経験年数
- これまでの経歴（前職含む）
- 現職での主な担当・プロジェクト
- 使っている技術スタック

### Step 2: Knowledge ファイルの生成

ヒアリング内容をもとに以下のファイルを生成する:

- `career/career-history.md` — 職務経歴（プロジェクトごとに構造化）
- `career/skills-inventory.md` — 技術スキル一覧
- `career/self-introduction.md` — 自己PR（ヒアリングから強みを抽出）

生成前にユーザーに内容を確認する。

### Step 3: 追加ヒアリング（任意）

ユーザーが望めば以下も対話で作成する:

- `career/transfer-reason.md` — なぜ転職を考えているか
- `career/future-goals.md` — キャリアの方向性
- `career/work-preferences.md` — 仕事に求める条件

### Step 4: profile.md の生成

すべてのファイルが揃ったら `career/profile.md`（Knowledge Map）を生成する。
既存のテンプレートは `skills/career/references/career/profile.md` を参考にする。

## 分析フレームワーク（Knowledge がある場合）

### 強みの軸を導出する

固定の軸を使わない。以下の手順で導出する:

1. career-history.md と self-introduction.md を読み、繰り返し現れるパターンを抽出する
   - 何度も言及される行動特性は何か？
   - プロジェクトを横断して一貫している判断基準は何か？
   - 周囲との違いが際立つポイントは何か？
2. 抽出したパターンを3〜5つの軸に整理する
3. 各軸に対して、career-history.md から具体的なエビデンス（事実・数字）を紐づける
4. ユーザーに「この整理はしっくりきますか？」と確認する

### 経験棚卸し

career-history.md の各プロジェクトについて、以下を対話的に深掘りする:

- **課題**: 何が問題だったか
- **行動**: 自分が何をしたか（技術選定の意思決定を含む）
- **成果**: 定量的な結果
- **学び**: 次のプロジェクトにどう反映したか
- **独自の貢献**: 自分だからこそできたことは何か

既に career-history.md に書いてある内容は繰り返さず、
書かれていない「なぜそうしたか」「他の選択肢は何だったか」を引き出す。

### 市場価値の言語化

強みの軸とエビデンスが揃ったら:

1. 各強みが「どんな環境で求められるか」を整理する
2. 「経験年数では測れない価値」を1〜2文で表現する
3. 応募先企業がある場合、その企業の課題と自分の強みの接点を言語化する

## 出力

分析結果は `career/self-introduction.md` の更新、または新規ファイルとして保存する。
ユーザーに出力先を確認してから書き込む。
