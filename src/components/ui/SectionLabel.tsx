type Props = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: Props) {
  return <h2 className="text-xs tracking-[4px] uppercase text-subtle mb-6">{children}</h2>;
}
