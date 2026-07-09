# Nephrology

این پروژه یک وب‌سایت استاتیک چندصفحه‌ای برای موضوع نفرولوژی است که در حال حاضر به‌صورت ساختار اولیه و قابل توسعه آماده شده است.

## ساختار فعلی
- صفحه اصلی در [index.html](index.html)
- فهرست فصول در [chapters/index.html](chapters/index.html)
- صفحات آماده‌ی فصل‌ها در [chapters](chapters)
- سبک و طراحی پایه در [assets/css/style.css](assets/css/style.css)

## نحوه‌ی مشاهده
می‌توانید با اجرای یک سرور محلی، پروژه را مشاهده کنید:

```bash
cd /workspaces/Nephrology
python3 -m http.server 8000
```

سپس در مرورگر به آدرس زیر بروید:

http://127.0.0.1:8000/

## نکته
در این نسخه، معماری سایت به‌صورت داده‌محور آماده شده است تا افزودن فصل جدید فقط با ثبت یک رکورد در فایل داده انجام شود.

## ساخت و به‌روزرسانی صفحات فصل‌ها
برای تولید یا به‌روزرسانی صفحات فصل‌ها، این دستور را اجرا کنید:

```bash
cd /workspaces/Nephrology
node scripts/generate-pages.js
```

این کار فایل‌های HTML فصل‌ها و صفحه‌ی فهرست را بر اساس داده‌های موجود بازتولید می‌کند.

## انتشار روی GitHub Pages
برای اینکه سایت در آدرس عمومی GitHub Pages دیده شود:
1. در تنظیمات ریپوزیتوری، بخش Pages را باز کنید.
2. Source را روی GitHub Actions بگذارید.
3. تغییرات را به شاخه main push کنید.

فایل workflow آماده شده در [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) این کار را انجام می‌دهد.