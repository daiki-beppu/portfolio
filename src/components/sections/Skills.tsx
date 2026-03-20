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
