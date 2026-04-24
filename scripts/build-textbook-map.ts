import fs from 'fs';
import path from 'path';

// Load all textbook data
const textbookDir = 'src/data';
const textbookFiles = {
  hardware: 'textbook-hardware.json',
  software: 'textbook-software.json',
  database: 'textbook-database.json',
  network: 'textbook-network.json',
  security: 'textbook-security.json',
  management: 'textbook-management.json',
  'dev-methods': 'textbook-dev-methods.json',
  'project-mgmt': 'textbook-project-mgmt.json',
  'service-mgmt': 'textbook-service-mgmt.json',
};

// Category to ts file mapping
const categoryTsFiles: Record<string, string> = {
  hardware: 'fe-hardware.ts',
  software: 'fe-software.ts',
  database: 'fe-database.ts',
  network: 'fe-network.ts',
  security: 'fe-security.ts',
  management: 'fe-management.ts',
  'dev-methods': 'fe-dev-methods.ts',
  'project-mgmt': 'fe-project-mgmt.ts',
  'service-mgmt': 'fe-service-mgmt.ts',
};

type Question = {
  id: number;
  category: string;
  question: string;
  explanation: string;
  options: { text: string; correct: boolean }[];
  topicIds?: string[];
};

type TextbookTopic = {
  topicId: string;
  title: string;
  summary: string;
  keywords: string[];
};

// Build keyword -> topicId map for each category
function buildKeywordMap(category: string): Map<string, string[]> {
  const filepath = path.join(textbookDir, textbookFiles[category]);
  const data = JSON.parse(fs.readFileSync(filepath, 'utf-8')) as TextbookTopic[];
  const map = new Map<string, string[]>();

  for (const topic of data) {
    // Add title words
    const titleWords = topic.title.split(/[／\(\)]/).filter(w => w.length > 1);
    for (const w of titleWords) {
      add(map, w.trim(), topic.topicId);
    }
    // Add keywords
    for (const kw of topic.keywords) {
      add(map, kw, topic.topicId);
      // Also add shortened versions
      if (kw.length > 3) {
        add(map, kw.substring(0, kw.length - 1), topic.topicId);
      }
    }
  }
  return map;
}

function add(map: Map<string, string[]>, key: string, topicId: string) {
  const k = key.toLowerCase();
  if (k.length < 2) return;
  if (!map.has(k)) map.set(k, []);
  const arr = map.get(k)!;
  if (!arr.includes(topicId)) arr.push(topicId);
}

// Match questions to topics
function matchQuestions(questions: Question[], keywordMap: Map<string, string[]>, category: string): void {
  let matched = 0;
  let total = questions.length;

  for (const q of questions) {
    if (q.category !== category) continue;
    const text = (q.question + ' ' + q.explanation + ' ' + q.options.map(o => o.text).join(' ')).toLowerCase();
    const matchedTopics = new Set<string>();

    // Check all keywords
    for (const [keyword, topicIds] of keywordMap) {
      if (text.includes(keyword)) {
        for (const tid of topicIds) {
          matchedTopics.add(tid);
        }
      }
    }

    if (matchedTopics.size > 0) {
      q.topicIds = Array.from(matchedTopics);
      matched++;
    }
  }

  console.log(`${category}: ${matched}/${total} questions matched`);
}

// Main
const allQuestionsPath = 'src/data/questions.ts';
const content = fs.readFileSync(allQuestionsPath, 'utf-8');

// Parse questions from the TS file
// It exports an array from multiple imports
const categoryData: Record<string, Question[]> = {};

for (const [cat, tsFile] of Object.entries(categoryTsFiles)) {
  const tsPath = path.join(textbookDir, tsFile);
  const tsContent = fs.readFileSync(tsPath, 'utf-8');
  const match = tsContent.match(/export const questions:\s*Question\[\]\s*=\s*(\[[\s\S]*?\n\]);/);
  if (match) {
    try {
      // Remove TypeScript-specific syntax
      let jsonStr = match[1];
      // We need to use eval-like approach since it's TS
      // Instead, read from the compiled questions
      const allQContent = fs.readFileSync(allQuestionsPath, 'utf-8');
      const allMatch = allQContent.match(/export const allQuestions: Question\[\] = \[(.*)\];/s);
      if (allMatch) {
        console.log(`Found ${allMatch[1].substring(0, 100)}...`);
      }
    } catch (e) {
      console.error(`Error parsing ${cat}: ${e}`);
    }
  }
}

// Since TS files are hard to parse, let's read allQuestions directly
// The questions.ts re-exports from category files
console.log('Reading questions.ts...');
const qsMatch = content.match(/import.*\n/g);
console.log(`Found ${qsMatch?.length} imports`);

// Actually, let's just use the data JSON files or read each TS file properly
// For now, output the mapping as a separate JSON that the app can load

// Build mapping files
const topicQuestions: Record<string, Record<string, number[]>> = {};

for (const [cat, textbookFile] of Object.entries(textbookFiles)) {
  const tbPath = path.join(textbookDir, textbookFile);
  const topics = JSON.parse(fs.readFileSync(tbPath, 'utf-8')) as TextbookTopic[];
  const keywordMap = buildKeywordMap(cat);

  // Read questions from each TS file
  const tsPath = path.join(textbookDir, categoryTsFiles[cat]);
  let tsContent = fs.readFileSync(tsPath, 'utf-8');

  // Extract the questions array - simple approach: find the array
  const arrayStart = tsContent.indexOf('[');
  const arrayMatch = tsContent.match(/questions:\s*Question\[\]\s*=\s*\[/);

  if (arrayMatch) {
    let startIdx = tsContent.indexOf('[', arrayMatch.index! + arrayMatch[0].length);
    // Find the end of the array
    let depth = 1;
    let endIdx = startIdx + 1;
    while (depth > 0 && endIdx < tsContent.length) {
      if (tsContent[endIdx] === '[') depth++;
      else if (tsContent[endIdx] === ']') depth--;
      endIdx++;
    }
    let arrayStr = tsContent.substring(startIdx, endIdx);

    // Try to parse by replacing TS syntax
    // Remove trailing commas, etc.
    arrayStr = arrayStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');

    try {
      const questions: Question[] = eval(arrayStr);
      console.log(`${cat}: parsed ${questions.length} questions`);

      const topicQuestionMap: Record<string, number[]> = {};
      for (const topic of topics) {
        topicQuestionMap[topic.topicId] = [];
      }

      for (const q of questions) {
        const text = (q.question + ' ' + q.explanation).toLowerCase();
        for (const topic of topics) {
          const topicText = (topic.title + ' ' + topic.keywords.join(' ')).toLowerCase();
          // Check if any keyword from topic appears in question
          const kws = topic.keywords.filter(kw => kw.length >= 2);
          let score = 0;
          for (const kw of kws) {
            if (text.includes(kw.toLowerCase())) score++;
          }
          // Also check title words
          const titleWords = topic.title.split(/[／\(\)]/).filter(w => w.length >= 2);
          for (const tw of titleWords) {
            if (text.includes(tw.toLowerCase())) score += 2;
          }
          if (score >= 2) {
            topicQuestionMap[topic.topicId].push(q.id);
          }
        }
      }

      let topicMatched = Object.values(topicQuestionMap).filter(v => v.length > 0).length;
      console.log(`${cat}: ${topicMatched}/${topics.length} topics have matching questions`);

      topicQuestions[cat] = topicQuestionMap;
    } catch (e) {
      console.error(`${cat}: Error parsing questions: ${e}`);
    }
  }
}

// Save the mapping
const outputPath = 'src/data/textbook-question-map.json';
fs.writeFileSync(outputPath, JSON.stringify(topicQuestions, null, 2));
console.log(`\nSaved mapping to ${outputPath}`);
