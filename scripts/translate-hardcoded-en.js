const fs = require('fs');
const path = require('path');
const translate = require('translate-google');
const { promisify } = require('util');

const SRC_DIRS = [
  path.join(process.cwd(), 'src', 'app'),
  path.join(process.cwd(), 'src', 'components')
];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

function shouldSkip(text) {
  text = text.trim();
  if (text.length < 2) return true;
  if (/^https?:\/\//i.test(text)) return true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return true;
  if (/^\+?[\d\s-]{7,}$/.test(text)) return true; // Phone
  if (/^[\/]/.test(text)) return true; // Paths
  if (text.includes(' ') && text.split(' ').every(w => /^[a-z]+(-[a-z0-0]+)+$/.test(w))) return true; // Tailwind classes
  if (!/[a-zA-ZäöüÄÖÜß]/.test(text)) return true; // No letters
  // Common technical terms/values in props that shouldn't be translated
  const technical = ['ghost', 'outline', 'secondary', 'destructive', 'link', 'default', 'sm', 'lg', 'icon', 'submit', 'button', 'reset'];
  if (technical.includes(text.toLowerCase())) return true;
  return false;
}

async function translateString(text) {
  try {
    const res = await translate(text, { from: 'de', to: 'en' });
    return res;
  } catch (err) {
    console.error(`Error translating "${text}": ${err.message}`);
    return text;
  }
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  const matches = new Set();
  
  // 1. JSX text nodes: >Text<
  const jsxTextRegex = />([^<>{}\s][^<>{}]*)<\/?/g;
  let match;
  while ((match = jsxTextRegex.exec(content)) !== null) {
    if (!shouldSkip(match[1])) matches.add(match[1].trim());
  }
  
  // 2. Props: title="Text", placeholder="Text", etc.
  const propsRegex = /\b(title|description|placeholder|label|alt|aria-label)="([^"]+)"/g;
  while ((match = propsRegex.exec(content)) !== null) {
    if (!shouldSkip(match[2])) matches.add(match[2]);
  }
  
  // 3. Object keys variant 1: title: "Text"
  const objRegex = /\b(title|description|subtitle|label|text|question|answer|cta|button|placeholder):\s*"([^"]+)"/g;
  while ((match = objRegex.exec(content)) !== null) {
    if (!shouldSkip(match[2])) matches.add(match[2]);
  }

  // 4. Object keys variant 2: "title": "Text"
  const objRegex2 = /"(title|description|subtitle|label|text|question|answer|cta|button|placeholder)":\s*"([^"]+)"/g;
  while ((match = objRegex2.exec(content)) !== null) {
    if (!shouldSkip(match[2])) matches.add(match[2]);
  }

  if (matches.size === 0) return 0;

  console.log(`Found ${matches.size} strings in ${path.relative(process.cwd(), filePath)}`);
  
  const translations = {};
  for (const str of matches) {
    translations[str] = await translateString(str);
    console.log(`  "${str}" -> "${translations[str]}"`);
  }

  // Replace
  let newContent = content;
  // Sort by length descending to avoid partial replacements
  const sortedStrings = Array.from(matches).sort((a, b) => b.length - a.length);
  
  for (const str of sortedStrings) {
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Replace only in specific contexts to be safer
    // This is hard with simple string replace, so we do it globally but only for the strings we found.
    // To be safer, we can try to replace with a more specific regex that matches the context we found it in.
    
    // Replace in JSX text
    const jsxRegex = new RegExp(`>\\s*${escaped}\\s*<`, 'g');
    newContent = newContent.replace(jsxRegex, `>${translations[str]}<`);
    
    // Replace in props
    const propRegex = new RegExp(`(\\b(title|description|placeholder|label|alt|aria-label)=")${escaped}(")`, 'g');
    newContent = newContent.replace(propRegex, `$1${translations[str]}$3`);
    
    // Replace in objects
    const objRegexContext = new RegExp(`(\\b(title|description|subtitle|label|text|question|answer|cta|button|placeholder):\\s*\\"?)${escaped}(\\"?)`, 'g');
    newContent = newContent.replace(objRegexContext, `$1${translations[str]}$3`);
  }

  if (newContent !== originalContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return sortedStrings.length;
  }
  return 0;
}

async function main() {
  const allFiles = [];
  SRC_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      getAllFiles(dir, allFiles);
    }
  });

  console.log(`Processing ${allFiles.length} files...`);
  const changedFiles = [];
  let totalReplacements = 0;

  for (const file of allFiles) {
    const replacements = await processFile(file);
    if (replacements > 0) {
      changedFiles.push(file);
      totalReplacements += replacements;
    }
  }

  console.log(`\nFinished.`);
  console.log(`Files changed: ${changedFiles.length}`);
  console.log(`Total replacements: ${totalReplacements}`);
  
  if (changedFiles.length > 0) {
      fs.writeFileSync('changed-files.txt', changedFiles.join('\n'), 'utf8');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
