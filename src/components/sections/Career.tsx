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
