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
    href: "https://github.com/daiki-beppu/youtube-automation",
    icon: "🎵",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
  },
  {
    titleKey: "projects.specv.title",
    descriptionKey: "projects.specv.description",
    tags: ["TypeScript", "React", "Hono"],
    href: "https://github.com/daiki-beppu/specv",
    icon: "📄",
    gradient: "linear-gradient(135deg, #0d1117, #161b22)",
  },
  {
    titleKey: "projects.dotfiles.title",
    descriptionKey: "projects.dotfiles.description",
    tags: ["Nix", "Home Manager"],
    href: "https://github.com/daiki-beppu/dotfiles",
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
