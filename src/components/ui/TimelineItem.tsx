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
