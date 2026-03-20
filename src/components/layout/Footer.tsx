import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 px-6 max-w-3xl mx-auto border-t border-border">
      <p className="text-xs text-subtle text-center">{t("footer.copyright")}</p>
    </footer>
  );
}
