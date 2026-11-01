// Curated visual regroupings run after heading repair and pagination.
// Every match is scoped to a page; original wording remains in the figure.
import fs from 'node:fs';
const enhancements = JSON.parse(fs.readFileSync(new URL('../src/data/diagram-enhancements.json', import.meta.url), 'utf8'));
export function enhanceDiagrams(lines, slug) {
  let text = lines.join('\n');
  for (const item of enhancements.filter((item) => item.slug === slug)) {
    if (text.split(item.find).length !== 2) throw new Error(`Diagram ${item.id}: expected one source block in ${slug}`);
    text = text.replace(item.find, item.replace);
  }
  return text.split('\n');
}
