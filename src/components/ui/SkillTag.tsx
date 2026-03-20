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
