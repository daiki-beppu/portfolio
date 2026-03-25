---
name: career-company
description: >
  Use when the user wants to research, analyze, or compare companies they're
  considering for a job change. Triggers on: 「企業分析」「会社比較」「どっちがいい」
  「この会社どう思う」「〇〇と△△で迷ってる」「企業調査」「求人見つけた」。
  Also triggers when the user names a specific company and wants to evaluate fit,
  or when comparing multiple offers or job postings.
---

# career-company -- 企業分析・比較

応募先企業の分析と複数企業の比較を支援する。
企業の表面的な情報だけでなく、ユーザーの転職軸との適合度を構造的に評価する。

面接官は「なぜうちなのか」を必ず聞く。このスキルで深掘りした分析は、
志望動機の説得力に直結する。表面的な「御社に共感しました」ではなく、
自分の軸と企業の文化がどう接続するかを言語化するために使う。

## Knowledge の読み込み

1. `skills/career/references/career/profile.md` を Read で読む（Knowledge Map）
2. 相談内容に応じて以下を追加で読む:
   - **新規分析**: `career/work-preferences.md`（軸の確認）+ `career/future-goals.md`（方向性との整合）
   - **比較**: `career/companies/` 配下の対象企業ファイル
   - **深掘り**: 対象企業の分析ファイル

## モード

### 新規分析モード

ユーザーが新しい企業を持ち込んだとき。

1. `career/companies/_template.md` を Read で読む
2. テンプレートに沿って対話的に埋めていく
3. ユーザーが持っている情報（求人票、テックブログ、口コミなど）を引き出す
4. 転職軸との接点を一緒に整理する
5. 完成したら `career/companies/{企業名}.md` に出力

対話のコツ: 「なぜ気になったか」から始める。第一印象の直感には理由がある。
それを言語化することで、転職軸との接点が自然に浮かび上がる。

### 比較モード

複数の企業を比較したいとき。

1. 対象企業の分析ファイルを全て Read で読む
2. `references/comparison-matrix.md` を Read で読む
3. マトリクスに沿って定量的に比較
4. 定量評価と直感のギャップを対話で深掘り

比較で最も価値があるのは「スコアと直感のズレ」を発見すること。
スコアが高い方と心が傾く方が違うなら、そのギャップにこそ本当の判断基準が隠れている。

### 深掘りモード

既存の分析を更新・深掘りしたいとき。

1. 対象企業の分析ファイルを Read で読む
2. 「懸念点・確認したいこと」セクションを起点に対話
3. 新しい情報（面談後の印象、テックブログの発見など）を追記
4. 総合評価を更新

## 出力

企業分析ファイルは `career/companies/{企業名小文字}.md` に保存する。
ファイル名は英語小文字（例: smarthr.md, codmon.md）。
