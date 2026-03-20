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
