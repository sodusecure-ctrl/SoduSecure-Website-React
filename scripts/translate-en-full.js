const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

const dePath = path.join(__dirname, '..', 'messages', 'de.json');
const enPath = path.join(__dirname, '..', 'messages', 'en.json');

function readJson(p) {
  let content = fs.readFileSync(p, 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  return JSON.parse(content);
}

const de = readJson(dePath);
const en = readJson(enPath);

let translatedCount = 0;

let failedCount = 0;

const germanSignal = /[äöüß]|\b(und|mit|für|der|die|das|nicht|bitte|sicherheit|datenschutz|bedingungen|anfragen|kontakt|bericht)\b/i;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateWithRetry(text, options, attempt = 0) {
  try {
    return await translate(text, options);
  } catch (err) {
    const isRateLimited = String(err?.message || '').includes('429');
    if (isRateLimited && attempt < 6) {
      const waitMs = 15000 * (attempt + 1);
      console.log(`Rate limited. Waiting ${waitMs}ms before retry ${attempt + 1}...`);
      await sleep(waitMs);
      return translateWithRetry(text, options, attempt + 1);
    }

    throw err;
  }
}

function tokenize(text) {
  const placeholders = [];
  let tokenized = text;
  
  // Placeholders like {year}, {{var}}, %s
  const regex = /\{\{.*?\}\}|\{.*?\}|%s/g;
  tokenized = tokenized.replace(regex, (match) => {
    const id = `__PH${placeholders.length}__`;
    placeholders.push(match);
    return id;
  });
  return { tokenized, placeholders };
}

function restore(text, placeholders) {
  let restored = text;
  placeholders.forEach((ph, i) => {
    restored = restored.replace(new RegExp(`__PH${i}__`, 'g'), ph);
    restored = restored.replace(new RegExp(`__PH ${i} __`, 'g'), ph); // Handle Google adding spaces
  });
  return restored;
}

function shouldSkip(text) {
  if (/^https?:\/\//i.test(text)) return true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return true;
  if (/^\+?[\d\s-]{7,}$/.test(text)) return true;
  if (text.length < 8 && text === text.toUpperCase() && /[A-Z]/.test(text)) return true;
  return false;
}

async function walk(deObj, enObj) {
  for (const key in deObj) {
    if (typeof deObj[key] === 'object' && deObj[key] !== null) {
      if (!enObj[key]) enObj[key] = Array.isArray(deObj[key]) ? [] : {};
      await walk(deObj[key], enObj[key]);
    } else if (typeof deObj[key] === 'string') {
      const currentEn = typeof enObj[key] === 'string' ? enObj[key] : '';
      const shouldTranslate =
        (currentEn === deObj[key] || germanSignal.test(currentEn)) &&
        !shouldSkip(deObj[key]);

      if (shouldTranslate) {
        const { tokenized, placeholders } = tokenize(deObj[key]);
        try {
          const translated = await translateWithRetry(tokenized, { from: 'de', to: 'en' });
          enObj[key] = restore(translated, placeholders);
          translatedCount++;
          if (translatedCount % 50 === 0) {
            fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
            console.log(`Progress: translated ${translatedCount} entries...`);
          }
        } catch (err) {
          failedCount++;
          if (failedCount <= 20) {
            console.error(`Failed to translate "${deObj[key]}":`, err.message);
          }
        }
      }
    }
  }
}

(async () => {
  await walk(de, en);
  fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
  console.log(`Successfully translated ${translatedCount} items. Failed: ${failedCount}`);
})();
