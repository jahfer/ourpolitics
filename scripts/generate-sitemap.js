import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export function partyToAcronym(party) {
  switch (party) {
    case "Conservative":
      return "CPC";
    case "Green":
      return "GPC";
    case "Liberal":
      return "LPC";
    case "Bloc":
      return "BQ";
    default:
      return party;
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://ourpolitics.ca';
const POLICIES_DIR = join(__dirname, '../public/data/policies');
const OUTPUT_PATH = join(__dirname, '../public/sitemap.xml');

function generateSitemap() {
  const staticUrls = [
    { url: '/', priority: 1.0 },
    { url: '/about', priority: 0.8 },
    { url: '/privacy', priority: 0.5 },
    { url: '/guide', priority: 0.5 },
  ];

  const topics = new Set();
  const policyUrls = [];

  // Read all year directories
  const years = readdirSync(POLICIES_DIR);

  years.forEach(year => {
    const policiesPath = join(POLICIES_DIR, year, 'policies.json');
    if (existsSync(policiesPath)) {
      const policies = JSON.parse(readFileSync(policiesPath, 'utf-8'));

      // Add year index
      policyUrls.push({ url: `/policies/${year}`, priority: 1.0 });

      // Process each policy
      policies.forEach(policy => {
        if (policy.handle || policy.id) {
          policyUrls.push({
            url: `/policies/${year}/${partyToAcronym(policy.party)}/${policy.handle || policy.id}`,
            priority: 0.7
          });
        }
        topics.add(policy.topic);
      });
    }
  });

  // Generate XML
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static routes -->
${staticUrls.map(({url, priority}) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <priority>${priority}</priority>
  </url>`).join('\n')}

  <!-- Policy routes -->
${policyUrls.map(({url, priority}) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <priority>${priority}</priority>
  </url>`).join('\n')}

  <!-- Topic routes -->
${""/*Array.from(topics).map(topic => `  <url>
    <loc>${SITE_URL}/topics/${topic}</loc>
    <priority>0.8</priority>
  </url>`).join('\n')*/}
</urlset>`;

  writeFileSync(OUTPUT_PATH, xmlContent);
  console.log(`Generated sitemap at ${OUTPUT_PATH}`);
}

generateSitemap();
