# 個人プロジェクト

業務外で取り組んでいる個人プロジェクトの概要。

---

## 1. YouTube チャンネル自動運用システム

AI を活用した YouTube チャンネルの企画→制作→投稿→分析の完全自動化システム。

### 運用チャンネル

| チャンネル | ジャンル | 状態 |
| --- | --- | --- |
| Celtic Lore Music | ケルト風ファンタジー音楽 | 稼働中（14コレクション公開済み） |
| 8-Bit Adventure Hub | チップチューン/8bit RPG 音楽 | 準備中 |

### 自動化パイプライン（8ステップ）

1. **分析** — YouTube Analytics API でデータ収集・競合ベンチマーク
2. **企画** — データ駆動で5つのコンセプト提案を自動生成
3. **楽曲生成** — SunoAI / Lyria RealTime API で12〜26トラック/コレクション
4. **サムネイル生成** — Gemini 3.1 Flash で画像生成（メイン＋バリエーション3枚）
5. **動画制作** — FFmpeg + Veo 3.1 でロングビデオ＋ショート用ループ動画
6. **メタデータ生成** — タイムスタンプ付き説明文、多言語対応（日英）
7. **自動アップロード** — スケジューリング付き投稿（Private→Public 遷移）
8. **事後対応** — ピン留めコメント、コミュニティ投稿、動画間クロスリンク

### 技術スタック

```
言語:       Python 3.11+
API:        YouTube Data API v3 / YouTube Analytics API v2
音楽生成:   SunoAI / Lyria RealTime API
画像生成:   Gemini 3.1 Flash
動画生成:   Veo 3.1 / FFmpeg
スケジュール: launchd（macOS、毎朝9時の定期実行）
開発:       pytest / ruff
```

### アーキテクチャ

- **モノレポ構成**: 共通の自動化コアと各チャンネルのデータ・設定を分離
- **テンプレート化**: `channel_config.json` を編集するだけで新チャンネルの運用を開始できる再利用可能なテンプレートリポジトリを別途管理
- **Claude Code 統合**: 21個の専用スキルで全ワークフローを Claude Code から操作可能（`/wf-new`, `/suno`, `/thumbnail`, `/upload` 等）
- **ワークフロー状態管理**: コレクション単位で進捗を JSON で追跡、ステップごとの承認フロー

### 設計上のポイント

- データ駆動の意思決定（アナリティクス→企画への自動フィードバック）
- 全ステップが CLI / Claude Code スキルから操作可能（GUI 不要）
- チャンネル設定を Single Source of Truth として一元管理

---

## 2. specv — ローカル Markdown プレビューツール

カレントディレクトリの Markdown ファイルをブラウザで GitHub スタイル表示する CLI ツール。npm に公開済み（v0.2.0）。

### 主な機能

- GitHub Flavored Markdown レンダリング + シンタックスハイライト + コピーボタン
- Preview / Source 切替ビュー
- `Cmd+P` でファジー検索（Quick Open）
- `Cmd+B` でファイルツリーサイドバー（.md ファイルまで自動展開）
- ダーク/ライトテーマ（OS 設定連動）
- .md 間のリンクナビゲーション、ローカル画像表示
- パストラバーサル防止のセキュリティ対策

### 技術スタック

```
サーバー:   Hono + @hono/node-server + Commander.js（CLI）
クライアント: React 19 + Vite + Tailwind CSS v4
Markdown:   react-markdown + remark-gfm + prism-react-renderer
検索:       fzf + TanStack Hotkeys
品質:       Vitest / Playwright E2E / knip / oxlint / lefthook
配布:       npm Trusted Publishing + GitHub Actions CI/CD
```

### 設計上のポイント

- CLI → Hono サーバー → React SPA のシンプルな3層構成
- API は `/api/files`（ツリー）、`/api/file?path=`（内容）、`/api/image?path=`（画像）の3エンドポイント
- npm 公開まで含めた CI/CD パイプラインを完備

---

## 3. dotfiles — Nix ベース開発環境管理

macOS の開発環境全体を nix-darwin + Home Manager で宣言的に管理するリポジトリ。

### 管理対象

| レイヤー | 管理内容 | 管理方法 |
| --- | --- | --- |
| Nix (nixpkgs) | CLI ツール（git, gh, ffmpeg, uv, Python 3.14 等） | `flake.nix` home.packages |
| Nix (programs) | Git 設定（.gitconfig, .gitignore） | Home Manager |
| Nix (system.defaults) | macOS 設定（Dock, Finder, キーボード, トラックパッド） | nix-darwin |
| Homebrew (brews) | nixpkgs にないツール（ni, proto, turso） | `flake.nix` homebrew.brews |
| Homebrew (casks) | GUI アプリ（Arc, Claude, Cursor, Figma 等） | `flake.nix` homebrew.casks |
| Home Manager | シンボリンク（.zshrc, .claude/ → dotfiles repo） | home.activation |

### Claude Code のカスタマイズ

Claude Code の設定・スキルもすべて dotfiles で Git 管理:

- **12以上のカスタムスキル**: PR 作成、Issue 作成、GitHub Projects 操作、コミット規約、Nix 管理、並列セッション起動 等
- **設定ファイル**: `CLAUDE.md`（グローバル指示）、`settings.json`、hooks
- シンボリンク経由で `~/.claude/` に展開

### 設計上のポイント

- `darwin-rebuild switch` 一発で環境全体を再現可能
- macOS のシステム設定（ダークモード、キーリピート速度、トラックパッド挙動等）も宣言的に管理
- Claude Code のワークフロー自体をコード化・バージョン管理

---

## 共通する設計思想

1. **テンプレート化・再利用性**: YouTube テンプレート、specv の npm 公開、dotfiles による環境再現
2. **宣言的管理**: Nix による環境管理、JSON によるワークフロー状態管理
3. **CLI ファースト**: すべてのプロジェクトがターミナルから完結する設計
4. **AI 統合**: Claude Code スキルによるワークフロー自動化（YouTube: 21スキル、dotfiles: 12スキル）
