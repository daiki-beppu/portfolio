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
