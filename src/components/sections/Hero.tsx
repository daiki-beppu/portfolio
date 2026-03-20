import { Github, Mail, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SocialIcon } from "../ui/SocialIcon";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center px-6 max-w-3xl mx-auto">
      <img
        src="https://avatars.githubusercontent.com/u/140964131?v=4"
        alt={t("hero.name")}
        className="w-20 h-20 rounded-full border-2 border-border-hover mb-6"
      />
      <p className="text-xs tracking-[4px] uppercase text-subtle mb-4">{t("hero.role")}</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{t("hero.name")}</h1>
      <p className="text-sm md:text-base text-subtle leading-relaxed mb-6 whitespace-pre-line">
        {t("hero.tagline")}
      </p>
      <div className="flex gap-4">
        <SocialIcon href="https://github.com/daiki-beppu" icon={Github} label="GitHub" />
        <SocialIcon href="https://x.com/momochico_eng" icon={Twitter} label="X" />
        <SocialIcon href="mailto:beppu.engineer@gmail.com" icon={Mail} label="Email" />
      </div>
    </section>
  );
}
