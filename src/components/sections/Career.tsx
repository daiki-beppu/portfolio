import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { careerItems } from "../../data/career";
import { SectionLabel } from "../ui/SectionLabel";
import { TimelineItem } from "../ui/TimelineItem";

export function Career() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="career"
      className="py-20 px-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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
    </motion.section>
  );
}
