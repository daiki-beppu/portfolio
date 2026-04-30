# Portfolio

React + Vite Plus で構築した個人ポートフォリオサイト。

## コマンド

- `nr dev` — 開発サーバー起動
- `nr build` — プロダクションビルド（`tsc -b && vp build`）
- `nr lint` — ESLint 実行

## 構成

- `src/components/sections/` — ページセクション（Hero, About, Skills, Career, Projects）
- `src/data/` — プロジェクト・キャリアデータ
- `src/i18n/` — 日英翻訳（ja.json, en.json）
- `public/` — 静的ファイル（OGP画像、favicon）

## デプロイ

- ホスト: Cloudflare Workers
- URL: https://portfolio.beppu-engineer.workers.dev/

## 注意点

- パッケージマネージャーは pnpm（ni 経由で操作）
- Vite Plus (`vp`) を使用 — 詳細は AGENTS.md 参照
