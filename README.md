# Statik site

Çok sayfalı düz HTML site; sunucu kodu yok. `npm run build` → `dist/`. GitHub Pages'e `.github/workflows/yayin.yml` yayınlar
(her gönderimde derlenir). Alan adı alınınca yalnızca `src/veri.mjs` → `ADRES` değişir; bütün bağlantılar, site haritası,
`robots.txt` ve `site.webmanifest` oradan üretilir.

- **İçerik:** `src/veri.mjs` (işletme bilgileri, 4 hizmet, süreç, sık sorulanlar, iller, fotoğraf açıklamaları). İşletme bilgisi
  uydurulmaz; adres, telefon ve saat Google Haritalar kaydı ve Instagram ile aynıdır. Şehirler işletmenin kendi paylaşımlarından.
- **Sayfalar:** `src/sablon.mjs`: ana sayfa, 4 hizmet sayfası, 404. Her sayfada başlık/açıklama, canonical, paylaşım etiketleri
  ve şema (AutomotiveBusiness, WebSite, WebPage, BreadcrumbList; hizmetlerde Service + FAQPage).
- **Stil ve betik:** `public/site.css`, `public/site.js` (telefonda menü). Yazı tipi Archivo (OFL, `public/yazi/`, Türkçe harfler dahil).
  Derleme stil ve betik bağlantısına içerik özeti ekler (`?v=`), değişiklik hemen görünür.
- **Görseller:** `public/img/` elle değiştirilmez; `npm run gorseller` üretir (kaynak `kaynak/instagram/`, depoya girmez):
  iş fotoğrafları 4:5 WebP (360–1080 px), logo, sekme simgeleri, her sayfanın paylaşım görseli (`img/og/`, 1200×630).

Yerelde açmak (GitHub'daki `/yagizbranda/` yolu ile aynı):

```bash
npm run build
python3 -m http.server 8711 --directory .onizleme
```
