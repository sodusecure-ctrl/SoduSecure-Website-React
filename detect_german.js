const fs = require('fs');

function traverse(obj, path = '', results = []) {
    for (let key in obj) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof obj[key] === 'string') {
            results.push({ path: fullPath, value: obj[key] });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            traverse(obj[key], fullPath, results);
        }
    }
    return results;
}

try {
    let rawData = fs.readFileSync('messages/en.json', 'utf8');
    // Strip BOM
    if (rawData.charCodeAt(0) === 0xFEFF) {
        rawData = rawData.slice(1);
    }
    
    const data = JSON.parse(rawData);
    const allEntries = traverse(data);
    
    const germanRegex = /[äöüß]|\b(und|mit|für|der|die|das|nicht|bitte|sicherheit|datenschutz|bedingungen|anfragen|kontakt|bericht)\b/i;
    
    const germanEntries = allEntries.filter(entry => germanRegex.test(entry.value));
    
    console.log(`Total Entries: ${allEntries.length}`);
    console.log(`German Count: ${germanEntries.length}`);
    console.log('First 10 Sample Paths:');
    germanEntries.slice(0, 10).forEach(e => console.log(`- ${e.path}: ${e.value}`));

} catch (err) {
    console.error(err);
    process.exit(1);
}
