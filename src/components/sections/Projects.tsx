import { useTranslation } from "react-i18next";
import { projects } from "../../data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionLabel } from "../ui/SectionLabel";

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-20 px-6 max-w-3xl mx-auto">
      <SectionLabel>{t("projects.label")}</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.titleKey}
            title={t(project.titleKey)}
            description={t(project.descriptionKey)}
            tags={project.tags}
            href={project.href}
            icon={project.icon}
            gradient={project.gradient}
          />
        ))}
      </div>
    </section>
  );
}
