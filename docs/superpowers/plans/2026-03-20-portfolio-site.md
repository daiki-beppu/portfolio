# ポートフォリオサイト Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 転職活動 + 作品ショーケースを兼ねたミニマル・ダークなシングルページポートフォリオサイトを構築する

**Architecture:** Vite+ で React + TypeScript のシングルページアプリを構築。セクションごとにコンポーネント分割し、react-i18next で日英両対応。framer-motion で控えめなスクロールアニメーション。Cloudflare Pages に静的デプロイ。

**Tech Stack:** Vite+ / React / TypeScript / Tailwind CSS / react-i18next / framer-motion / Cloudflare Pages

**Spec:** `docs/superpowers/specs/2026-03-20-portfolio-site-design.md`

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 固定ヘッダー（ナビ + 言語切替 + ハンバーガー）
│   │   └── Footer.tsx          # コピーライト表示
│   ├── sections/
│   │   ├── Hero.tsx            # Hero セクション（名前 + 肩書き + SNS アイコン）
│   │   ├── About.tsx           # About セクション（ストーリー型テキスト）
│   │   ├── Projects.tsx        # Projects セクション（カードグリッド）
│   │   ├── Career.tsx          # Career セクション（タイムライン）
│   │   └── Skills.tsx          # Skills セクション（タグクラウド）
│   └── ui/
│       ├── SectionLabel.tsx    # セクションラベル（ABOUT, PROJECTS 等）
│       ├── ProjectCard.tsx     # プロジェクトカード
│       ├── TimelineItem.tsx    # タイムラインの各項目
│       ├── SkillTag.tsx        # スキルタグ
│       └── SocialIcon.tsx      # SNS アイコンボタン
├── hooks/
│   └── useScrollTo.ts          # スムーススクロール用フック
├── i18n/
│   ├── config.ts               # react-i18next 設定
│   ├── ja.json                 # 日本語翻訳
│   └── en.json                 # 英語翻訳
├── data/
│   ├── projects.ts             # プロジェクトデータ定義
│   ├── career.ts               # キャリアデータ定義
│   └── skills.ts               # スキルデータ定義
├── App.tsx                     # ルートコンポーネント（セクション配置）
├── main.tsx                    # エントリーポイント
└── index.css                   # グローバルスタイル（Tailwind ディレクティブ + カスタムプロパティ）
```

**設計判断:**

- `data/` ディレクトリにコンテンツデータを分離。コンポーネントとデータの責務を分け、i18n 翻訳キーもここで定義
- `ui/` に再利用可能な小さいコンポーネントを配置。セクションコンポーネントはこれらを組み合わせるだけ
- `hooks/` にスクロール等のロジックを分離

---

## Task 1: プロジェクト初期化（Vite+ セットアップ）

**Files:**

- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `index.html`

- [ ] **Step 1: Vite+ で React + TypeScript プロジェクトを作成**

既存リポジトリ内でプロジェクトを初期化する。`vp create` は新規ディレクトリを作るため、一時ディレクトリで生成してからファイルをコピーする:

```bash
cd /tmp && vp create portfolio-tmp --template react-ts
cp -r /tmp/portfolio-tmp/{package.json,tsconfig*.json,vite.config.ts,index.html,src,public} /Users/mba/01-dev/projects/portfolio/
rm -rf /tmp/portfolio-tmp
cd /Users/mba/01-dev/projects/portfolio
```

既存の `docs/`, `.gitignore`, `.git/` はそのまま保持される。

- [ ] **Step 2: Tailwind CSS をインストール・設定**

```bash
ni -D tailwindcss @tailwindcss/vite
```

`src/index.css` に Tailwind ディレクティブを追加:

```css
@import "tailwindcss";
```

`vite.config.ts` に Tailwind プラグインを追加:

```ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 3: 依存パッケージをインストール**

```bash
ni react-i18next i18next i18next-browser-languagedetector framer-motion lucide-react
```

- `react-i18next` + `i18next`: i18n
- `i18next-browser-languagedetector`: navigator.language + localStorage 検出
- `framer-motion`: アニメーション
- `lucide-react`: アイコン（GitHub, X, Mail 等）

- [ ] **Step 4: グローバルスタイルを設定**

`src/index.css` を更新:

```css
@import "tailwindcss";

@theme {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  --color-muted: #888;
  --color-subtle: #666;
  --color-border: #1a1a1a;
  --color-border-hover: #333;
  --color-card: #111;
  --color-tag: #1a1a1a;
  --color-accent: #14b8a6;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}
```

- [ ] **Step 5: App.tsx に最小限の表示を実装して動作確認**

```tsx
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1 className="text-2xl p-8">Portfolio</h1>
    </div>
  );
}

export default App;
```

```bash
vp dev
```

ブラウザで `http://localhost:5173` を開き、ダーク背景に白文字で「Portfolio」と表示されることを確認。

- [ ] **Step 6: コミット**

```bash
git add -A
git commit -m "feat: Vite+ でプロジェクト初期化（React + TypeScript + Tailwind CSS）"
```

---

## Task 2: i18n セットアップ

**Files:**

- Create: `src/i18n/config.ts`, `src/i18n/ja.json`, `src/i18n/en.json`
- Modify: `src/main.tsx`

- [ ] **Step 1: i18n 設定ファイルを作成**

`src/i18n/config.ts`:

```ts
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ja from "./ja.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ja: { translation: ja },
      en: { translation: en },
    },
    fallbackLng: "ja",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

- [ ] **Step 2: 翻訳ファイルを作成（最小限のキーで開始）**

`src/i18n/ja.json`:

```json
{
  "nav": {
    "about": "About",
    "projects": "Projects",
    "career": "Career",
    "skills": "Skills"
  },
  "hero": {
    "role": "Frontend Engineer",
    "name": "名前",
    "tagline": "チームの生産性を底上げする\nフロントエンドエンジニア"
  },
  "about": {
    "label": "About",
    "p1": "鳶職から完全独学でエンジニアに転職。約1年半で BtoB 業務アプリの FE 基盤を設計・構築できるようになりました。",
    "p2": "個人の実装力だけでなく、DX 改善・AI ツールの社内展開など、チーム全体の生産性を底上げすることに最もやりがいを感じています。",
    "p3": "業務外でも YouTube 自動運用システムや npm パッケージの公開など、技術的な探求を続けています。"
  },
  "footer": {
    "copyright": "© 2026 名前"
  }
}
```

`src/i18n/en.json`:

```json
{
  "nav": {
    "about": "About",
    "projects": "Projects",
    "career": "Career",
    "skills": "Skills"
  },
  "hero": {
    "role": "Frontend Engineer",
    "name": "Name",
    "tagline": "Frontend engineer focused on\nteam productivity"
  },
  "about": {
    "label": "About",
    "p1": "Transitioned from construction work to software engineering through self-study. Built FE foundations for BtoB business apps within 1.5 years.",
    "p2": "Passionate about improving team productivity through DX improvements and AI tool adoption, not just individual output.",
    "p3": "Continuously exploring technology outside of work — YouTube automation systems, npm packages, and more."
  },
  "footer": {
    "copyright": "© 2026 Name"
  }
}
```

- [ ] **Step 3: main.tsx で i18n を初期化**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n/config";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 4: App.tsx で翻訳が動作するか確認**

```tsx
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ja" ? "en" : "ja");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <button
        onClick={toggleLanguage}
        className="mb-4 px-3 py-1 bg-card border border-border rounded text-sm"
      >
        {i18n.language === "ja" ? "EN" : "JA"}
      </button>
      <h1 className="text-2xl font-bold">{t("hero.name")}</h1>
      <p className="text-muted">{t("hero.tagline")}</p>
    </div>
  );
}

export default App;
```

`vp dev` でブラウザ確認。ボタンクリックで日英切替できることを確認。

- [ ] **Step 5: コミット**

```bash
git add src/i18n/ src/main.tsx src/App.tsx
git commit -m "feat: react-i18next で i18n セットアップ（日英対応）"
```

---

## Task 3: 共通 UI コンポーネント

**Files:**

- Create: `src/components/ui/SectionLabel.tsx`, `src/components/ui/SocialIcon.tsx`, `src/components/ui/SkillTag.tsx`, `src/components/ui/ProjectCard.tsx`, `src/components/ui/TimelineItem.tsx`

- [ ] **Step 1: SectionLabel を実装**

`src/components/ui/SectionLabel.tsx`:

```tsx
type Props = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: Props) {
  return <h2 className="text-xs tracking-[4px] uppercase text-subtle mb-6">{children}</h2>;
}
```

- [ ] **Step 2: SocialIcon を実装**

`src/components/ui/SocialIcon.tsx`:

```tsx
import type { LucideIcon } from "lucide-react";

type Props = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export function SocialIcon({ href, icon: Icon, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-border-hover flex items-center justify-center text-muted hover:text-foreground hover:border-foreground transition-colors"
    >
      <Icon size={16} />
    </a>
  );
}
```

- [ ] **Step 3: SkillTag を実装**

`src/components/ui/SkillTag.tsx`:

```tsx
type Props = {
  name: string;
  variant?: "main" | "sub";
};

export function SkillTag({ name, variant = "main" }: Props) {
  const styles =
    variant === "main"
      ? "bg-tag border-border-hover text-[#ccc]"
      : "bg-card border-border text-muted";

  return <span className={`px-3.5 py-1.5 rounded-md border text-sm ${styles}`}>{name}</span>;
}
```

- [ ] **Step 4: ProjectCard を実装**

`src/components/ui/ProjectCard.tsx`:

```tsx
type Props = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon: string;
  gradient: string;
};

export function ProjectCard({ title, description, tags, href, icon, gradient }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-border-hover hover:-translate-y-0.5 transition-all"
    >
      <div
        className="h-32 flex items-center justify-center text-4xl"
        style={{ background: gradient }}
      >
        {icon}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-xs text-subtle leading-relaxed mb-2">{description}</p>
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="bg-tag px-1.5 py-0.5 rounded text-[10px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
```

- [ ] **Step 5: TimelineItem を実装**

`src/components/ui/TimelineItem.tsx`:

```tsx
type Props = {
  period: string;
  title: string;
  description: string;
  tags?: string[];
  dotStyle: "active" | "past" | "origin";
};

export function TimelineItem({ period, title, description, tags, dotStyle }: Props) {
  const dotClass = {
    active: "bg-foreground",
    past: "bg-subtle",
    origin: "border border-subtle bg-background",
  }[dotStyle];

  return (
    <div className="relative pl-6 pb-7 last:pb-0">
      <div className={`absolute -left-[29px] top-[6px] w-2.5 h-2.5 rounded-full ${dotClass}`} />
      <p className="text-xs text-subtle mb-1">{period}</p>
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-subtle leading-relaxed">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-tag px-1.5 py-0.5 rounded text-[10px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: `vp dev` で型エラーがないことを確認**

```bash
vp check
```

- [ ] **Step 7: コミット**

```bash
git add src/components/ui/
git commit -m "feat: 共通 UI コンポーネントを追加（SectionLabel, SocialIcon, SkillTag, ProjectCard, TimelineItem）"
```

---

## Task 4: データ定義

**Files:**

- Create: `src/data/projects.ts`, `src/data/career.ts`, `src/data/skills.ts`

- [ ] **Step 1: projects.ts を作成**

`src/data/projects.ts`:

```ts
export type Project = {
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  href: string;
  icon: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    titleKey: "projects.youtube.title",
    descriptionKey: "projects.youtube.description",
    tags: ["Python", "AI API", "YouTube API"],
    href: "https://github.com/YOUR_USERNAME/youtube-automation",
    icon: "🎵",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
  },
  {
    titleKey: "projects.specv.title",
    descriptionKey: "projects.specv.description",
    tags: ["TypeScript", "React", "Hono"],
    href: "https://github.com/YOUR_USERNAME/specv",
    icon: "📄",
    gradient: "linear-gradient(135deg, #0d1117, #161b22)",
  },
  {
    titleKey: "projects.dotfiles.title",
    descriptionKey: "projects.dotfiles.description",
    tags: ["Nix", "Home Manager"],
    href: "https://github.com/YOUR_USERNAME/dotfiles",
    icon: "⚙️",
    gradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
  },
  {
    titleKey: "projects.libefes.title",
    descriptionKey: "projects.libefes.description",
    tags: ["Next.js", "イベント"],
    href: "https://02-ribe-booth-lp.vercel.app/",
    icon: "👨‍💻",
    gradient: "linear-gradient(135deg, #2a1a1a, #1a2a1a)",
  },
];
```

- [ ] **Step 2: career.ts を作成**

`src/data/career.ts`:

```ts
export type CareerItem = {
  periodKey: string;
  titleKey: string;
  descriptionKey: string;
  tags?: string[];
  dotStyle: "active" | "past" | "origin";
};

export const careerItems: CareerItem[] = [
  {
    periodKey: "career.pj3.period",
    titleKey: "career.pj3.title",
    descriptionKey: "career.pj3.description",
    tags: ["Next.js", "shadcn/ui", "TanStack Query", "nuqs"],
    dotStyle: "active",
  },
  {
    periodKey: "career.pj2.period",
    titleKey: "career.pj2.title",
    descriptionKey: "career.pj2.description",
    dotStyle: "past",
  },
  {
    periodKey: "career.pj1.period",
    titleKey: "career.pj1.title",
    descriptionKey: "career.pj1.description",
    dotStyle: "past",
  },
  {
    periodKey: "career.origin.period",
    titleKey: "career.origin.title",
    descriptionKey: "career.origin.description",
    dotStyle: "origin",
  },
];
```

- [ ] **Step 3: skills.ts を作成**

`src/data/skills.ts`:

```ts
export type SkillCategory = {
  labelKey: string;
  variant: "main" | "sub";
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    labelKey: "skills.frontend",
    variant: "main",
    skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui", "TanStack Query"],
  },
  {
    labelKey: "skills.testing",
    variant: "main",
    skills: ["Vitest", "Playwright"],
  },
  {
    labelKey: "skills.infra",
    variant: "main",
    skills: ["Vercel", "GitHub Actions", "Claude Code", "Nix"],
  },
  {
    labelKey: "skills.sub",
    variant: "sub",
    skills: ["Python", "Shell Script", "SQL"],
  },
];
```

- [ ] **Step 4: 翻訳ファイルにプロジェクト・キャリア・スキルのキーを追加**

`src/i18n/ja.json` に追加:

```json
{
  "projects": {
    "label": "Projects",
    "youtube": {
      "title": "YouTube 自動運用システム",
      "description": "AI で企画→制作→投稿→分析を完全自動化"
    },
    "specv": {
      "title": "specv",
      "description": "Markdown プレビュー CLI — npm 公開済み"
    },
    "dotfiles": {
      "title": "dotfiles",
      "description": "Nix ベース macOS 環境の宣言的管理"
    },
    "libefes": {
      "title": "リベ大フェス2025",
      "description": "子供向けプログラミング教室の出店"
    }
  },
  "career": {
    "label": "Career",
    "company": "BtoB SaaS スタートアップ — 2024.10〜現在",
    "pj3": {
      "period": "2025.10 — 現在",
      "title": "業務管理 Web アプリ（ゼロベース新規構築）",
      "description": "FE 全体をゼロから一人で設計・構築。過去2プロジェクトの学びをすべて反映した設計。"
    },
    "pj2": {
      "period": "2025.08 — 現在",
      "title": "業務管理マルチアプリ（3アプリ統合）",
      "description": "100件超のフィードバック対応。モノレポ化 + 大規模マイグレーションを AI 活用で1ヶ月完了。"
    },
    "pj1": {
      "period": "2025.02 — 現在",
      "title": "BtoB 業務管理 Web アプリ（jQuery → Next.js）",
      "description": "52フィールドの大規模フォーム設計・実装。タブ間双方向状態同期。"
    },
    "origin": {
      "period": "— 2024",
      "title": "鳶職 → 独学でエンジニア転職",
      "description": "YouTube・Udemy 等の動画教材 + 個人開発で独学。"
    }
  },
  "skills": {
    "label": "Skills",
    "frontend": "Frontend",
    "testing": "Testing",
    "infra": "Infra / Tools",
    "sub": "Sub"
  }
}
```

`src/i18n/en.json` に以下の英語キーを追加（Task 2 で作成したキーとマージ）:

```json
{
  "projects": {
    "label": "Projects",
    "youtube": {
      "title": "YouTube Auto System",
      "description": "Fully automated pipeline: planning → production → upload → analytics with AI"
    },
    "specv": {
      "title": "specv",
      "description": "Markdown preview CLI — published on npm"
    },
    "dotfiles": {
      "title": "dotfiles",
      "description": "Declarative macOS environment management with Nix"
    },
    "libefes": {
      "title": "LibeFes 2025",
      "description": "Kids programming workshop at Makuhari Messe"
    }
  },
  "career": {
    "label": "Career",
    "company": "BtoB SaaS Startup — Oct 2024 – Present",
    "pj3": {
      "period": "Oct 2025 — Present",
      "title": "Business Management Web App (Greenfield)",
      "description": "Designed and built the entire FE from scratch. Applied all learnings from previous projects."
    },
    "pj2": {
      "period": "Aug 2025 — Present",
      "title": "Business Management Multi-App (3-App Integration)",
      "description": "Resolved 100+ feedback items. Completed monorepo migration + major upgrades in 1 month with AI."
    },
    "pj1": {
      "period": "Feb 2025 — Present",
      "title": "BtoB Business Management Web App (jQuery → Next.js)",
      "description": "Designed and built a large-scale form with 52 fields. Bidirectional state sync between tabs."
    },
    "origin": {
      "period": "— 2024",
      "title": "Construction Worker → Self-taught Engineer",
      "description": "Self-taught via YouTube, Udemy, and personal projects."
    }
  },
  "skills": {
    "label": "Skills",
    "frontend": "Frontend",
    "testing": "Testing",
    "infra": "Infra / Tools",
    "sub": "Sub"
  }
}
```

- [ ] **Step 5: コミット**

```bash
git add src/data/ src/i18n/
git commit -m "feat: コンテンツデータと翻訳キーを定義"
```

---

## Task 5: Header コンポーネント

**Files:**

- Create: `src/components/layout/Header.tsx`, `src/hooks/useScrollTo.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: useScrollTo フックを実装**

`src/hooks/useScrollTo.ts`:

```ts
export function useScrollTo() {
  return (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
}
```

- [ ] **Step 2: Header を実装**

`src/components/layout/Header.tsx`:

```tsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollTo } from "../../hooks/useScrollTo";

const NAV_ITEMS = ["about", "projects", "career", "skills"] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const scrollTo = useScrollTo();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ja" ? "en" : "ja");
  };

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-sm tracking-wide">Portfolio</span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t(`nav.${item}`)}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="text-xs bg-card px-2 py-1 rounded border border-border hover:border-border-hover transition-colors"
          >
            {i18n.language === "ja" ? "EN" : "JA"}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm text-muted hover:text-foreground transition-colors text-left"
              >
                {t(`nav.${item}`)}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className="text-xs bg-card px-2 py-1 rounded border border-border w-fit"
            >
              {i18n.language === "ja" ? "EN" : "JA"}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 3: App.tsx に Header を配置して動作確認**

```tsx
import { Header } from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-14">
        <div id="about" className="h-screen p-8">
          About
        </div>
        <div id="projects" className="h-screen p-8">
          Projects
        </div>
        <div id="career" className="h-screen p-8">
          Career
        </div>
        <div id="skills" className="h-screen p-8">
          Skills
        </div>
      </main>
    </div>
  );
}

export default App;
```

`vp dev` で確認。固定ヘッダー、ナビクリックでスムーススクロール、言語切替、モバイルでハンバーガーメニューが動作すること。

- [ ] **Step 4: コミット**

```bash
git add src/components/layout/Header.tsx src/hooks/useScrollTo.ts src/App.tsx
git commit -m "feat: 固定ヘッダーを実装（ナビ + 言語切替 + ハンバーガー）"
```

---

## Task 6: Hero セクション

**Files:**

- Create: `src/components/sections/Hero.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Hero を実装**

`src/components/sections/Hero.tsx`:

```tsx
import { Github, Mail, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SocialIcon } from "../ui/SocialIcon";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center px-6 max-w-3xl mx-auto">
      <p className="text-xs tracking-[4px] uppercase text-subtle mb-4">{t("hero.role")}</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{t("hero.name")}</h1>
      <p className="text-sm md:text-base text-subtle leading-relaxed mb-6 whitespace-pre-line">
        {t("hero.tagline")}
      </p>
      <div className="flex gap-4">
        {/* TODO: YOUR_USERNAME と your@email.com を実際の値に置き換えること */}
        <SocialIcon href="https://github.com/YOUR_USERNAME" icon={Github} label="GitHub" />
        <SocialIcon href="https://x.com/YOUR_USERNAME" icon={Twitter} label="X" />
        <SocialIcon href="mailto:your@email.com" icon={Mail} label="Email" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: App.tsx に Hero を配置**

App.tsx の `<main>` 内の先頭に `<Hero />` を追加。

- [ ] **Step 3: `vp dev` で表示確認**

左寄せで名前・肩書き・キャッチコピー・SNS アイコンが表示されること。言語切替で英語に切り替わること。

- [ ] **Step 4: コミット**

```bash
git add src/components/sections/Hero.tsx src/App.tsx
git commit -m "feat: Hero セクションを実装"
```

---

## Task 7: About セクション

**Files:**

- Create: `src/components/sections/About.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: About を実装**

`src/components/sections/About.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { SectionLabel } from "../ui/SectionLabel";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 max-w-3xl mx-auto">
      <SectionLabel>{t("about.label")}</SectionLabel>
      <div className="max-w-xl space-y-4 text-sm text-[#ccc] leading-relaxed">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: App.tsx に About を配置して動作確認**

- [ ] **Step 3: コミット**

```bash
git add src/components/sections/About.tsx src/App.tsx
git commit -m "feat: About セクションを実装"
```

---

## Task 8: Projects セクション

**Files:**

- Create: `src/components/sections/Projects.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Projects を実装**

`src/components/sections/Projects.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionLabel } from "../ui/SectionLabel";

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-20 px-6 max-w-3xl mx-auto">
      <SectionLabel>{t("projects.label")}</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.titleKey}
            title={t(project.titleKey)}
            description={t(project.descriptionKey)}
            tags={project.tags}
            href={project.href}
            icon={project.icon}
            gradient={project.gradient}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: App.tsx に Projects を配置して動作確認**

カードグリッドが2列（モバイルで1列）で表示されること。ホバーで軽くリフトアップすること。

- [ ] **Step 3: コミット**

```bash
git add src/components/sections/Projects.tsx src/App.tsx
git commit -m "feat: Projects セクションを実装（カードグリッド）"
```

---

## Task 9: Career セクション

**Files:**

- Create: `src/components/sections/Career.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Career を実装**

`src/components/sections/Career.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { careerItems } from "../../data/career";
import { SectionLabel } from "../ui/SectionLabel";
import { TimelineItem } from "../ui/TimelineItem";

export function Career() {
  const { t } = useTranslation();

  return (
    <section id="career" className="py-20 px-6 max-w-3xl mx-auto">
      <SectionLabel>{t("career.label")}</SectionLabel>
      <p className="text-xs text-subtle mb-6">{t("career.company")}</p>
      <div className="relative pl-6 border-l border-border">
        {careerItems.map((item) => (
          <TimelineItem
            key={item.titleKey}
            period={t(item.periodKey)}
            title={t(item.titleKey)}
            description={t(item.descriptionKey)}
            tags={item.tags}
            dotStyle={item.dotStyle}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: App.tsx に Career を配置して動作確認**

タイムラインが縦線 + ドットで表示されること。最新のドットが白、過去が灰色、鳶職が中空であること。

- [ ] **Step 3: コミット**

```bash
git add src/components/sections/Career.tsx src/App.tsx
git commit -m "feat: Career セクションを実装（タイムライン）"
```

---

## Task 10: Skills セクション

**Files:**

- Create: `src/components/sections/Skills.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Skills を実装**

`src/components/sections/Skills.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { skillCategories } from "../../data/skills";
import { SectionLabel } from "../ui/SectionLabel";
import { SkillTag } from "../ui/SkillTag";

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 px-6 max-w-3xl mx-auto">
      <SectionLabel>{t("skills.label")}</SectionLabel>
      <div className="space-y-5">
        {skillCategories.map((category) => (
          <div key={category.labelKey}>
            <p className="text-xs text-subtle mb-2.5">{t(category.labelKey)}</p>
            <div className="flex gap-2 flex-wrap">
              {category.skills.map((skill) => (
                <SkillTag key={skill} name={skill} variant={category.variant} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: App.tsx に Skills を配置して動作確認**

カテゴリ別のタグクラウドが表示されること。Sub カテゴリのスタイルが抑えめであること。

- [ ] **Step 3: コミット**

```bash
git add src/components/sections/Skills.tsx src/App.tsx
git commit -m "feat: Skills セクションを実装（タグクラウド）"
```

---

## Task 11: Footer + App.tsx 最終組み立て

**Files:**

- Create: `src/components/layout/Footer.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Footer を実装**

`src/components/layout/Footer.tsx`:

```tsx
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 px-6 max-w-3xl mx-auto border-t border-border">
      <p className="text-xs text-subtle text-center">{t("footer.copyright")}</p>
    </footer>
  );
}
```

- [ ] **Step 2: App.tsx を最終形に組み立て**

```tsx
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { About } from "./components/sections/About";
import { Career } from "./components/sections/Career";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-14">
        <Hero />
        <About />
        <Projects />
        <Career />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: `vp dev` で全体を通して動作確認**

全セクションが正しく表示されること。ナビのスムーススクロール、言語切替、モバイル対応を確認。

- [ ] **Step 4: コミット**

```bash
git add src/components/layout/Footer.tsx src/App.tsx
git commit -m "feat: Footer + App.tsx 最終組み立て"
```

---

## Task 12: framer-motion でスクロールアニメーション

**Files:**

- Modify: `src/components/sections/About.tsx`, `src/components/sections/Projects.tsx`, `src/components/sections/Career.tsx`, `src/components/sections/Skills.tsx`

- [ ] **Step 1: 各セクションに framer-motion のフェードインを追加**

各セクションコンポーネントの `<section>` を `motion.section` に置き換え:

```tsx
import { motion } from "framer-motion";

// <section> を以下に置き換え:
<motion.section
  id="about"
  className="py-20 px-6 max-w-3xl mx-auto"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

About, Projects, Career, Skills の4セクションに同じパターンを適用。

- [ ] **Step 2: `vp dev` でアニメーション確認**

各セクションがスクロール時にフェードインすること。`once: true` で再発火しないこと。

- [ ] **Step 3: コミット**

```bash
git add src/components/sections/
git commit -m "feat: framer-motion でスクロールフェードインアニメーションを追加"
```

---

## Task 13: ビルド確認 + デプロイ準備

**Files:**

- Modify: `index.html`（title, meta タグ）

- [ ] **Step 1: プレースホルダーを実際の値に置き換え**

以下のファイルで `YOUR_USERNAME` と `your@email.com` を実際の GitHub ユーザー名・メールアドレスに置き換える:

- `src/components/sections/Hero.tsx`: SNS リンク
- `src/data/projects.ts`: GitHub リポジトリ URL
- `src/i18n/ja.json` / `src/i18n/en.json`: 名前（`名前` / `Name`）

- [ ] **Step 2: index.html の meta タグを更新**

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Frontend Engineer — Portfolio" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <title>名前 | Frontend Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: プロダクションビルドを実行して成功を確認**

```bash
vp build
```

`dist/` ディレクトリにファイルが生成されること。エラーがないこと。

- [ ] **Step 4: ビルド出力をプレビューで確認**

```bash
vp preview
```

`http://localhost:4173` で本番ビルドが正しく表示されること。

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: プレースホルダー置換 + meta タグ更新 + ビルド確認"
```

---

## Task 14: Cloudflare Pages デプロイ

**Files:** なし（Cloudflare ダッシュボード + CLI 操作）

- [ ] **Step 1: GitHub リポジトリにプッシュ**

```bash
git push origin main
```

- [ ] **Step 2: Cloudflare Pages でプロジェクトを作成**

Cloudflare ダッシュボード（https://dash.cloudflare.com）で:

1. Pages → Create a project → Connect to Git
2. GitHub リポジトリを選択
3. ビルド設定:
   - Build command: `npm run build`（`package.json` の `scripts.build` に `vp build` を設定済み）
   - Build output directory: `dist`
   - Root directory: `/`（デフォルト）
   - Note: Cloudflare Pages のビルド環境には `vp` がインストールされていないため、`npm run build` 経由で実行する。`package.json` の `scripts` に `"build": "vp build"`, `"preview": "vp preview"` を定義しておくこと（Task 1 の `vp create` で自動生成されるが、確認すること）
4. Deploy

- [ ] **Step 3: デプロイ後のサイトを確認**

`xxx.pages.dev` で全セクション、言語切替、レスポンシブが正しく動作すること。

- [ ] **Step 4: 動作確認完了後、デプロイ完了を記録**

```bash
git commit --allow-empty -m "chore: Cloudflare Pages デプロイ完了"
```
