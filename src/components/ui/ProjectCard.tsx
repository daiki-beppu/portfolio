type Props = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  icon: string;
  gradient: string;
};

export function ProjectCard({ title, description, tags, href, icon, gradient }: Props) {
  const Component = href ? "a" : "div";
  const linkProps = href ? { href, target: "_blank" as const, rel: "noopener noreferrer" } : {};

  return (
    <Component
      {...linkProps}
      className={`group block bg-card border border-border rounded-lg overflow-hidden ${href ? "hover:border-border-hover hover:-translate-y-0.5 cursor-pointer" : "opacity-90"} transition-all`}
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
    </Component>
  );
}
