import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

// Production domain verified for GKD-YDI
const BASE_URL = (process.env.SITE_URL || "https://www.gkd-ydi.com.ng").replace(/\/+$/, "");
const TODAY = new Date().toISOString().split("T")[0];

// The 5 core pages requested for Google indexing
const topPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/our-focus", priority: "0.9", changefreq: "monthly" },
  { path: "/media", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
];

export function generateSitemap() {
  const xmlEntries = topPages
    .map(
      (entry) => `  <url>
    <loc>${BASE_URL}${entry.path === "/" ? "/" : entry.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(sitemapPath, sitemapXml.trim() + "\n", "utf8");
  console.log(`[sitemap] Successfully generated 5 pages sitemap for ${BASE_URL} at ${sitemapPath}`);
}

generateSitemap();
