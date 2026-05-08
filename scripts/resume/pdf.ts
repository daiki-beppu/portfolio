import { chromium, type Browser } from "playwright";

let browserPromise: Promise<Browser> | null = null;

const getBrowser = () => {
  if (!browserPromise) {
    browserPromise = chromium.launch();
  }
  return browserPromise;
};

const FOOTER_TEMPLATE = `
<div style="font-size:7.5pt;width:100%;color:#6b7280;padding:0 14mm;display:flex;justify-content:flex-end;">
  <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`.trim();

export const renderPdf = async (html: string, outPath: string): Promise<void> => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "14mm", bottom: "13mm", left: "14mm", right: "14mm" },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: FOOTER_TEMPLATE,
    });
  } finally {
    await page.close();
  }
};

export const closeBrowser = async (): Promise<void> => {
  if (browserPromise) {
    const browser = await browserPromise;
    await browser.close();
    browserPromise = null;
  }
};
