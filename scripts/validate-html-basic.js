const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const checks = [
  {
    file: 'index.html',
    css: 'assets/css/style.css',
    forbiddenCss: '../assets/css/style.css',
  },
  {
    file: 'chapters/index.html',
    css: '../assets/css/style.css',
    forbiddenCss: 'assets/css/style.css',
  },
];

const tagNames = ['html', 'head', 'body', 'nav', 'header', 'main', 'section', 'div', 'article', 'a', 'footer'];
let hasError = false;

function count(pattern, text) {
  return (text.match(pattern) || []).length;
}

for (const item of checks) {
  const fullPath = path.join(root, item.file);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing file: ${item.file}`);
    hasError = true;
    continue;
  }

  const html = fs.readFileSync(fullPath, 'utf8');
  const titleCount = count(/<title>/g, html);
  const titleCloseCount = count(/<\/title>/g, html);

  if (titleCount !== 1 || titleCloseCount !== 1) {
    console.error(`${item.file}: expected exactly one <title> and </title>. Found ${titleCount}/${titleCloseCount}`);
    hasError = true;
  }

  if (!html.includes(`href="${item.css}"`)) {
    console.error(`${item.file}: missing expected CSS path: ${item.css}`);
    hasError = true;
  }

  if (html.includes(`href="${item.forbiddenCss}"`)) {
    console.error(`${item.file}: contains wrong CSS path: ${item.forbiddenCss}`);
    hasError = true;
  }

  if (/<<<<<<<|=======|>>>>>>>/.test(html)) {
    console.error(`${item.file}: contains merge conflict markers.`);
    hasError = true;
  }

  for (const tag of tagNames) {
    const open = count(new RegExp(`<${tag}(\\s|>|$)`, 'g'), html);
    const close = count(new RegExp(`</${tag}>`, 'g'), html);
    if (open !== close) {
      console.error(`${item.file}: tag count mismatch for <${tag}>: ${open} open / ${close} close`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log('Basic HTML checks passed.');
