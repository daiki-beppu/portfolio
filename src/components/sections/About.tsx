import { useTranslation } from "react-i18next";
import { SectionLabel } from "../ui/SectionLabel";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 max-w-3xl mx-auto">
      <SectionLabel>{t("about.label")}</SectionLabel>
      <div className="max-w-xl space-y-4 text-sm text-[#ccc] leading-relaxed">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
      </div>
    </section>
  );
}
