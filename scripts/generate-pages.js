const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const chaptersDataPath = path.join(root, 'data', 'chapters.json');
const chaptersDir = path.join(root, 'chapters');
const chapters = JSON.parse(fs.readFileSync(chaptersDataPath, 'utf8'));

function buildChapterPage(chapter) {
  const items = chapter.content.map((item) => `        <p>${item}</p>`).join('\n');
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${chapter.title}</title>
    <meta name="description" content="صفحه‌ی فصل ${chapter.title} برای وب‌سایت نفرولوژی" />
    <link rel="stylesheet" href="../assets/css/style.css" />
  </head>
  <body>
    <nav class="top-nav">
      <div class="container nav-wrap">
        <a class="brand" href="../index.html">نفرولوژی</a>
        <div class="nav-links">
          <a href="../index.html">خانه</a>
          <a href="index.html">فصل‌ها</a>
        </div>
      </div>
    </nav>

    <header class="hero small-hero">
      <div class="container">
        <p class="eyebrow">${chapter.title}</p>
        <h1>${chapter.subtitle}</h1>
        <p class="hero-text">${chapter.summary}</p>
      </div>
    </header>

    <main class="container section">
      <article class="content-card">
        <h2>خلاصه‌ی فصل</h2>
${items}
      </article>
      <div class="section-nav">
        <a href="index.html" class="btn btn-secondary">بازگشت به فهرست فصول</a>
      </div>
    </main>
  </body>
</html>
`;
}

function buildChaptersIndex() {
  const cards = chapters
    .map(
      (chapter) => `        <a class="card link-card" href="${chapter.slug}.html">
          <h3>${chapter.title}</h3>
          <p>${chapter.subtitle}</p>
        </a>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>فصل‌های نفرولوژی</title>
    <meta name="description" content="فهرست فصل‌های وب‌سایت نفرولوژی برای انتشار روی GitHub Pages" />
    <link rel="stylesheet" href="../assets/css/style.css" />
  </head>
  <body>
    <nav class="top-nav">
      <div class="container nav-wrap">
        <a class="brand" href="../index.html">نفرولوژی</a>
        <div class="nav-links">
          <a href="../index.html">خانه</a>
          <a href="index.html">فصل‌ها</a>
        </div>
      </div>
    </nav>

    <header class="hero small-hero">
      <div class="container">
        <p class="eyebrow">فهرست فصول</p>
        <h1>فصل‌های وب‌سایت نفرولوژی</h1>
        <p class="hero-text">این صفحه از فایل داده‌ی فصل‌ها تولید شده است و برای افزودن فصل جدید کافی است یک رکورد اضافه شود.</p>
      </div>
    </header>

    <main class="container section">
      <div class="grid cards">
${cards}
      </div>
      <div class="section-nav">
        <a href="../index.html" class="btn btn-secondary">بازگشت به صفحه اصلی</a>
      </div>
    </main>
  </body>
</html>
`;
}

if (!fs.existsSync(chaptersDir)) {
  fs.mkdirSync(chaptersDir, { recursive: true });
}

for (const chapter of chapters) {
  const outputPath = path.join(chaptersDir, `${chapter.slug}.html`);
  fs.writeFileSync(outputPath, buildChapterPage(chapter));
}

fs.writeFileSync(path.join(chaptersDir, 'index.html'), buildChaptersIndex());
console.log(`Generated ${chapters.length} chapter pages and index.`);
