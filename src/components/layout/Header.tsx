import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollTo } from "../../hooks/useScrollTo";

const NAV_ITEMS = ["about", "projects", "career", "skills"] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const scrollTo = useScrollTo();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ja" ? "en" : "ja");
  };

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-sm tracking-wide">Portfolio</span>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {t(`nav.${item}`)}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="text-xs bg-card px-2 py-1 rounded border border-border hover:border-border-hover transition-colors"
          >
            {i18n.language === "ja" ? "EN" : "JA"}
          </button>
        </nav>

        <button
          className="md:hidden text-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-sm text-muted hover:text-foreground transition-colors text-left"
              >
                {t(`nav.${item}`)}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className="text-xs bg-card px-2 py-1 rounded border border-border w-fit"
            >
              {i18n.language === "ja" ? "EN" : "JA"}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
