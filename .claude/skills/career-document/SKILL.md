---
name: career-document
description: >
  Use when the user wants to create or improve job application documents —
  resumes, cover letters, or portfolio presentation. Triggers on:
  「職務経歴書」「履歴書」「書類作成」「書類添削」「ポートフォリオ添削」
  「応募書類」「エントリーシート」「書類選考」。
  Also triggers when the user wants to tailor application materials
  for a specific company, or review how their experience reads on paper.
---

# career-document -- 書類作成支援

職務経歴書・ポートフォリオの作成・添削を支援する。
既存の Knowledge を応募先企業に合わせて「どう見せるか」を一緒に考える。

## Knowledge の読み込み

1. `skills/career/references/career/profile.md` を Read で読む（Knowledge Map）
2. 以下を読む:
   - `career/self-introduction.md`（自己PR）
   - `career/career-history.md`（職務経歴）
   - `career/skills-inventory.md`（スキル一覧）
3. 応募先がある場合 → `career/companies/{企業名}.md`

## モード

### 職務経歴書モード

career-history.md をベースに、応募先企業が求める人材像に合わせて
強調すべきポイントを調整する。

- 各プロジェクトの記述を STAR 法で構造化
- 「技術選定の意思決定」を明示する（面接官が最も知りたい情報）
- 経験の密度を伝える表現を使う（年数ではなくプロジェクト数・成果で語る）

### ポートフォリオ添削モード

現在のポートフォリオリポジトリを面接官視点でレビューする。

- README の第一印象
- 技術選定理由の記述
- デモ・スクリーンショットの有無
- コード品質が伝わるか

### プロジェクト記述モード

個別プロジェクトの記述を深掘りする。

- 課題 → 行動 → 成果 → 学びの流れ
- 「なぜその技術を選んだか」「代替案は何だったか」
- 定量的な成果（数字を入れる）

## 出力

作成・修正した内容は既存の Knowledge ファイル（career-history.md 等）を
更新する形で保存する。ユーザーに確認してから書き込む。
