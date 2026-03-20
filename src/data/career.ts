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
