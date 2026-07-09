const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const chaptersDataPath = path.join(root, 'data', 'chapters.json');
const chaptersDir = path.join(root, 'chapters');
const chapters = JSON.parse(fs.readFileSync(chaptersDataPath, 'utf8'));

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function persianChapterNumber(index) {
  return String(index + 1).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
}

function buildNav(prefix = '..') {
  return `    <nav class="site-nav" aria-label="ناوبری اصلی">
      <div class="container nav-shell">
        <a class="brand" href="${prefix}/index.html" aria-label="خانه درسنامه نفرولوژی">
          <span class="brand__mark">✚</span>
          <span>درسنامه نفرولوژی</span>
        </a>
        <div class="nav-links">
          <a href="${prefix}/index.html">خانه</a>
          <a href="index.html">فصل‌ها</a>
        </div>
      </div>
    </nav>`;
}

function buildChapterPage(chapter, index) {
  const contentItems = Array.isArray(chapter.content) ? chapter.content : [];
  const items = contentItems
    .map((item) => `          <p>${escapeHtml(item)}</p>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(chapter.title)}</title>
    <meta name="description" content="${escapeHtml(chapter.summary || chapter.subtitle || chapter.title)}" />
    <link rel="stylesheet" href="../assets/css/style.css" />
  </head>

  <body id="top">
    <a class="skip-link" href="#main-content">پرش به محتوای اصلی</a>
${buildNav('..')}

    <header class="hero hero--compact">
      <div class="container hero-shell">
        <div>
          <p class="eyebrow">فصل ${persianChapterNumber(index)}</p>
          <h1>${escapeHtml(chapter.subtitle || chapter.title)}</h1>
          <p class="hero__text">${escapeHtml(chapter.summary || '')}</p>
        </div>
      </div>
    </header>

    <main id="main-content" class="container section">
      <article class="feature-card">
        <h2>خلاصه‌ی فصل</h2>
${items || '        <p>محتوای این فصل به‌زودی تکمیل می‌شود.</p>'}
      </article>

      <div class="section-nav">
        <a href="index.html" class="btn btn--secondary">بازگشت به فهرست فصل‌ها</a>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-shell">
        <p>${escapeHtml(chapter.title)}</p>
        <a class="text-link" href="#top">بازگشت به بالا</a>
      </div>
    </footer>
  </body>
</html>
`;
}

function buildChaptersIndex() {
  const cards = chapters
    .map((chapter, index) => {
      const chapterNumber = persianChapterNumber(index);
      return `          <a class="chapter-card" href="${escapeHtml(chapter.slug)}.html">
            <div class="chapter-card__meta">
              <span class="badge">فصل ${chapterNumber}</span>
              <span class="chapter-card__status">درسنامه</span>
            </div>
            <h3>${escapeHtml(chapter.subtitle || chapter.title)}</h3>
            <p>${escapeHtml(chapter.summary || '')}</p>
          </a>`;
    })
    .join('\n\n');

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>فهرست فصل‌های درسنامه نفرولوژی</title>
    <meta name="description" content="فهرست فصل‌های درسنامه جامع نفرولوژی، کلیه، آب و الکترولیت." />
    <link rel="stylesheet" href="../assets/css/style.css" />
  </head>

  <body id="top">
    <a class="skip-link" href="#main-content">پرش به محتوای اصلی</a>
${buildNav('..')}

    <header class="hero hero--compact">
      <div class="container hero-shell">
        <div>
          <p class="eyebrow">فهرست فصل‌ها</p>
          <h1>مسیر آموزشی نفرولوژی، کلیه، آب و الکترولیت</h1>
          <p class="hero__text">
            فصل‌های درسنامه به‌ترتیب مطالعه تنظیم شده‌اند و هر فصل برای تکمیل محتوای آموزشی،
            نکات آزمونی، جدول‌ها و الگوریتم‌ها آماده است.
          </p>
        </div>
      </div>
    </header>

    <main id="main-content" class="container section">
      <div class="section-heading">
        <p class="section-heading__eyebrow">مسیر مطالعه</p>
        <h2>فصل‌های موجود در درسنامه</h2>
      </div>

      <div class="card-grid">
${cards}
      </div>

      <div class="section-nav">
        <a href="../index.html" class="btn btn--secondary">بازگشت به صفحه اصلی</a>
      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-shell">
        <p>فهرست فصل‌های درسنامه نفرولوژی</p>
        <a class="text-link" href="#top">بازگشت به بالا</a>
      </div>
    </footer>
  </body>
</html>
`;
}

if (!fs.existsSync(chaptersDir)) {
  fs.mkdirSync(chaptersDir, { recursive: true });
}

chapters.forEach((chapter, index) => {
  const outputPath = path.join(chaptersDir, `${chapter.slug}.html`);
  fs.writeFileSync(outputPath, buildChapterPage(chapter, index));
});

fs.writeFileSync(path.join(chaptersDir, 'index.html'), buildChaptersIndex());
console.log(`Generated ${chapters.length} chapter pages and index.`);
