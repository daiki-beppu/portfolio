import { Github, Mail, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SocialIcon } from "../ui/SocialIcon";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center px-6 max-w-3xl mx-auto">
      <p className="text-xs tracking-[4px] uppercase text-subtle mb-4">{t("hero.role")}</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{t("hero.name")}</h1>
      <p className="text-sm md:text-base text-subtle leading-relaxed mb-6 whitespace-pre-line">
        {t("hero.tagline")}
      </p>
      <div className="flex gap-4">
        <SocialIcon href="https://github.com/YOUR_USERNAME" icon={Github} label="GitHub" />
        <SocialIcon href="https://x.com/YOUR_USERNAME" icon={Twitter} label="X" />
        <SocialIcon href="mailto:your@email.com" icon={Mail} label="Email" />
      </div>
    </section>
  );
}
