const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\haro\\.openclaw\\workspace\\fe-exam-study\\src\\data';

// Load terms
const termsMod = require(path.join(base, 'terms.ts'));
const terms = termsMod.terms;
const termSet = new Set(terms.map(t => t.term.toLowerCase()));

// Load all textbook keywords
const tbFiles = [
  'textbook-hardware.json',
  'textbook-software.json',
  'textbook-database.json',
  'textbook-network.json',
  'textbook-security.json',
  'textbook-management.json',
  'textbook-dev-methods.json',
  'textbook-project-mgmt.json',
  'textbook-service-mgmt.json',
];

const missing = {};
let totalKeywords = 0;

for (const file of tbFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(base, file), 'utf-8'));
  for (const topic of data) {
    for (const kw of topic.keywords) {
      totalKeywords++;
      const kwLower = kw.toLowerCase();
      let found = false;
      for (const t of terms) {
        if (t.term.toLowerCase() === kwLower) {
          found = true;
          break;
        }
        if (t.term.toLowerCase().includes(kwLower) || kwLower.includes(t.term.toLowerCase())) {
          if (kwLower.length >= 3) {
            found = true;
            break;
          }
        }
      }
      if (!found) {
        if (!missing[kw]) {
          missing[kw] = { count: 0, files: [] };
        }
        missing[kw].count++;
        missing[kw].files.push(file.replace('textbook-', '').replace('.json', ''));
      }
    }
  }
}

const sorted = Object.entries(missing).sort((a, b) => b[1].count - a[1].count);

console.log('Total textbook keywords: ' + totalKeywords);
console.log('Terms in glossary: ' + termSet.size);
console.log('Missing keywords: ' + sorted.length);
console.log('');
console.log('=== Missing keywords (sorted by frequency) ===');
for (const [kw, info] of sorted) {
  console.log('  ' + kw + ' (' + info.count + 'x in: ' + [...new Set(info.files)].join(', ') + ')');
}
