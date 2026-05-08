import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { marked } from "marked";
import matter from "gray-matter";

const here = dirname(fileURLToPath(import.meta.url));
const STYLES_PATH = resolve(here, "print.css");

type ResumeFrontMatter = {
  name?: string;
  nameKana?: string;
  birth?: string;
  address?: string;
  phone?: string;
  email?: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildResumeHeader = (data: ResumeFrontMatter): string => {
  const rows: Array<[string, string | undefined]> = [
    ["氏名", data.name],
    ["フリガナ", data.nameKana],
    ["生年月日", data.birth],
    ["住所", data.address],
    ["電話", data.phone],
    ["メール", data.email],
  ];
  const visible = rows.filter(([, v]) => v && v.trim() !== "");
  if (visible.length === 0) return "";
  const body = visible
    .map(([k, v]) => `<tr><th>${k}</th><td>${escapeHtml(v as string)}</td></tr>`)
    .join("\n");
  return `<section class="resume-header"><table>${body}</table></section>`;
};

const buildHtml = (title: string, styles: string, header: string, content: string): string =>
  `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>
${styles}
</style>
</head>
<body>
<main>
${header}
${content}
</main>
</body>
</html>
`;

export type RenderResult = {
  html: string;
  title: string;
};

export const renderMarkdown = async (mdPath: string): Promise<RenderResult> => {
  const [raw, styles] = await Promise.all([
    readFile(mdPath, "utf8"),
    readFile(STYLES_PATH, "utf8"),
  ]);

  const { content, data } = matter(raw);
  const fm = data as ResumeFrontMatter;

  const bodyHtml = (await marked.parse(content, { gfm: true, breaks: false })).trim();
  const header = buildResumeHeader(fm);

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = fm.name
    ? `${titleMatch?.[1] ?? "Document"} - ${fm.name}`
    : (titleMatch?.[1] ?? "Document");

  return {
    html: buildHtml(title, styles, header, bodyHtml),
    title,
  };
};
