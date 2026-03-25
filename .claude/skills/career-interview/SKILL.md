---
name: career-interview
description: >
  Use when the user wants to prepare for job interviews — practicing answers,
  designing reverse questions, or doing mock interviews. Triggers on:
  「面接準備」「面接対策」「逆質問」「技術面接」「模擬面接」「面接練習」
  「志望動機」「自己紹介の練習」「面接で何聞かれる」。
  Also triggers when the user has an upcoming interview and needs to
  prepare answers tailored to a specific company.
---

# career-interview -- 面接対策

応募先企業ごとにカスタマイズした面接準備を対話的に行う。
想定質問への回答作成、逆質問の設計、模擬面接を提供する。

## Knowledge の読み込み

1. `skills/career/references/career/profile.md` を Read で読む（Knowledge Map）
2. 応募先企業を確認し、`career/companies/{企業名}.md` を Read で読む
3. 相談内容に応じて追加で読む:
   - 回答準備 → `career/self-introduction.md` + `career/career-history.md`
   - 志望動機 → `career/transfer-reason.md` + 企業分析ファイル
   - 逆質問設計 → 企業分析ファイルの「懸念点・確認したいこと」

## モード

### 回答準備モード

`references/question-framework.md` を Read で読み、企業に合わせた想定質問を生成。
ユーザーの Knowledge から回答の材料を引き出し、対話的にブラッシュアップする。

### 逆質問設計モード

`references/reverse-questions.md` を Read で読み、企業分析の「懸念点」を
質問に変換する。面接官に「この人は本気で調べてきた」と思わせる質問を設計する。

### 模擬面接モード

面接官として質問を投げかけ、回答へのフィードバックを行う。
フィードバックは「何が良かったか」「何が足りないか」「こう言い換えるとより伝わる」の3点。

## 出力

準備した内容は `career/interviews/{企業名}.md` に保存する。
