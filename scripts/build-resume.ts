import { mkdir, writeFile, access } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";

import { renderMarkdown } from "./resume/render.ts";
import { closeBrowser, renderPdf } from "./resume/pdf.ts";

const ROOT = resolve(import.meta.dirname ?? "", "..");
const OUT_DIR = resolve(ROOT, "dist-resume");

const TARGETS = [resolve(ROOT, "career/career-history.md"), resolve(ROOT, "career/resume.md")];

const exists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  const args = process.argv.slice(2);
  const htmlOnly = args.includes("--html-only");

  await mkdir(OUT_DIR, { recursive: true });

  let pdfFailureNoticed = false;

  for (const mdPath of TARGETS) {
    if (!(await exists(mdPath))) {
      console.warn(`[skip] ${mdPath} (見つかりません)`);
      continue;
    }

    const stem = basename(mdPath, extname(mdPath));
    const htmlPath = resolve(OUT_DIR, `${stem}.html`);
    const pdfPath = resolve(OUT_DIR, `${stem}.pdf`);

    const { html } = await renderMarkdown(mdPath);
    await writeFile(htmlPath, html, "utf8");
    console.log(`[ok ] ${htmlPath}`);

    if (htmlOnly) continue;

    try {
      await renderPdf(html, pdfPath);
      console.log(`[ok ] ${pdfPath}`);
    } catch (err) {
      pdfFailureNoticed = true;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[warn] PDF 生成に失敗しました: ${stem}.pdf`);
      console.warn(`        ${msg}`);
    }
  }

  await closeBrowser();

  if (pdfFailureNoticed) {
    console.warn("");
    console.warn("PDF が生成できなかった項目があります。");
    console.warn("Chromium 未インストールの場合は次を実行:");
    console.warn("  pnpm exec playwright install chromium");
    process.exitCode = 1;
  }
};

main().catch(async (err) => {
  await closeBrowser().catch(() => {});
  console.error(err);
  process.exit(1);
});
