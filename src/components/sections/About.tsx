import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionLabel } from "../ui/SectionLabel";

export function About() {
  const { t } = useTranslation();

  return (
    <motion.section
      id="about"
      className="py-20 px-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionLabel>{t("about.label")}</SectionLabel>
      <div className="max-w-xl space-y-4 text-sm text-[#ccc] leading-relaxed">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
      </div>
    </motion.section>
  );
}
