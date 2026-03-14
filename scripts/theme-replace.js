const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css'));
let changed = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/navy-950/g, 'neutral-950')
                          .replace(/navy-50/g, 'neutral-50')
                          .replace(/navy-100/g, 'neutral-100')
                          .replace(/navy-200/g, 'neutral-200')
                          .replace(/navy-800/g, 'neutral-800')
                          .replace(/navy-900/g, 'neutral-900')
                          .replace(/bg-navy-/g, 'bg-neutral-')
                          .replace(/text-navy-/g, 'text-neutral-')
                          .replace(/border-navy-/g, 'border-neutral-')
                          .replace(/gold-gradient/g, 'bg-brand-coral text-neutral-950 font-bold')
                          .replace(/gold-text/g, 'text-brand-coral font-bold')
                          .replace(/text-gold-400/g, 'text-brand-coral')
                          .replace(/bg-gold-500\/10/g, 'bg-brand-coral/10')
                          .replace(/bg-gold-500/g, 'bg-brand-coral')
                          .replace(/border-gold-500\/20/g, 'border-brand-coral/20')
                          .replace(/shadow-gold-400\/20/g, 'shadow-brand-coral/20');
                          
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated', file);
    changed++;
  }
}
console.log(`Updated ${changed} files.`);
