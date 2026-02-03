const fs = require('fs');

const keysToMove = [
  'about',
  'contact', 
  'careers',
  'howItWorks',
  'caseStudies'
];

['en.json', 'de.json'].forEach(file => {
  const filepath = `./messages/${file}`;
  const msgs = require(filepath);
  
  console.log(`\n=== Processing ${file} ===`);
  
  keysToMove.forEach(key => {
    if (msgs.home && msgs.home[key]) {
      console.log(`✓ Moving '${key}' from home to root`);
      msgs[key] = msgs.home[key];
      delete msgs.home[key];
    } else {
      console.log(`- '${key}' not found in home`);
    }
  });
  
  fs.writeFileSync(filepath, JSON.stringify(msgs, null, 2));
  console.log(`✓ ${file} updated`);
});

console.log('\n✓ All keys moved to root level successfully!');
