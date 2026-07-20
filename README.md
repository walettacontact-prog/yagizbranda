# Yağız Branda — Tente Sistemleri (Kamyonet Kasa Tentesi) Web Sitesi

## 🌍 CANLI SİTE (ücretsiz, 7/24)
### https://walettacontact-prog.github.io/yagizbranda/
Bilgisayar kapalı olsa bile çalışır. **Ücretsiz** (GitHub Pages) — hiçbir ödeme yok.

**Siteyi güncellemek** (dosyalarda değişiklik yaptıktan sonra):
```bash
cd /Users/ensarocakci/yagizbranda
git add -A && git commit -m "guncelleme" && git push
```
~1 dakika içinde canlı siteye yansır.

---

Statik (HTML + CSS + JS) bir web sitesi. **Hiçbir kurulum, build veya Node.js/PHP gerektirmez.**
İleride kendi alan adına/hostinge de aynı dosyaları FTP ile yükleyebilirsin.

---

## 📁 Dosya Yapısı

```
yagizbranda/
├── index.html          ← Ana sayfa (tüm içerik burada)
├── css/style.css       ← Tasarım / stiller
├── js/main.js          ← Menü, animasyon, etkileşimler
├── favicon.svg         ← Site simgesi (sekme ikonu)
├── site.webmanifest    ← PWA / mobil ikon tanımı
├── robots.txt          ← Arama motoru yönergesi
├── sitemap.xml         ← Site haritası (Google'a verilir)
├── .htaccess           ← Hız, önbellek, güvenlik ayarları (Apache)
└── assets/
    ├── og-image.jpg          ← WhatsApp/Facebook paylaşım görseli (1200×630)
    ├── apple-touch-icon.png  ← iPhone ana ekran ikonu
    ├── _gen_images.py        ← (Görselleri üreten script — yüklemeye gerek yok)
    └── img/                  ← Sitedeki TÜM fotoğraflar (senin gerçek iş fotoğrafların)
        ├── t-urun.jpg            (hero — ön çerçeve)
        ├── t-dukkan.jpg          (hero arka çerçeve + "Neden Biz" — dükkan görünür)
        ├── hero-blur.jpg         (hero bulanık arka plan)
        ├── t-kasa.jpg            (Kamyonet Kasa Tentesi kartı)
        ├── t-acilir.jpg          (Açılır Kanatlı kartı)
        ├── t-kavisli.jpg         (Kavisli/Kubbeli kartı)
        ├── t-kapali.jpg          (Kapalı Kutu kartı)
        ├── t-ticari.jpg          (Ticari Araç & Pikap kartı)
        ├── t-kavisli2.jpg        (İmalat/Montaj kartı)
        ├── t-acilir2.jpg         (galeri)
        └── t-acilir3.jpg         (galeri)
```

> `assets/_gen_images.py` sadece OG/ikon üreten yardımcı dosya. Hostinge yüklemen şart değil.

> ✅ **Fotoğraflar senin gönderdiğin gerçek iş fotoğrafları** (kamyonet kasa tentesi). Değiştirmek/eklemek
> istersen aşağıdaki "Fotoğraf Değiştirmek" bölümüne bak. **Logo** hâlâ geçici — sen gönderince değişecek.

---

## 🚀 Yayına Alma (Paylaşımlı Hosting)

1. Hosting kontrol paneline (cPanel / Plesk) veya bir FTP programına (FileZilla) gir.
2. Sitenin yayın klasörüne git — genelde **`public_html`** (bazı firmalarda `httpdocs` veya `www`).
3. Bu klasördeki **tüm dosya ve klasörleri** (`index.html`, `css/`, `js/`, `assets/`, `.htaccess`, `favicon.svg` vb.) olduğu gibi yükle.
4. Tarayıcıdan alan adını aç — site hazır. ✅

> **Not:** `.htaccess` gizli bir dosyadır. FTP programında "gizli dosyaları göster" seçeneğini aç ki onu da yükleyebilesin.

---

## ✏️ Değiştirmen Gerekenler (ÖNEMLİ)

> ✅ **Girildi (gerçek bilgiler):** Telefon `0532 591 34 57`, e-posta `yagizbranda@gmail.com`,
> Instagram `@yagizbranda_tente`. Bunlar sitede hazır.
>
> ⏳ **Kalan:** alan adı (varsa), açık adres, ve **logo** (sen göndereceksin). Fotoğraflar hazır. ✅

Aşağıdaki tablo, ileride bir bilgiyi değiştirmek istersen nerede geçtiğini gösterir.
En kolayı: bir metin editöründe **"Tümünü Değiştir" (Find & Replace)**.

| Şu an yazan                        | Durum / değiştir                        | Nerede geçiyor                  |
|------------------------------------|-----------------------------------------|---------------------------------|
| `905325913457` / `0532 591 34 57`  | ✅ Gerçek numaran girildi                | index.html (WhatsApp + `tel:`)  |
| `yagizbranda@gmail.com`            | ✅ Girildi                               | index.html                       |
| `instagram.com/yagizbranda_tente`  | ✅ Girildi                               | index.html                       |
| `www.yagizbranda.com`              | ⏳ Gerçek alan adın (varsa)              | index.html (canonical, OG), robots.txt, sitemap.xml |
| Adres                              | ⏳ Açık adres **henüz yok** — sadece "Sakarya" yazıyor, harita Sakarya geneli. Adresi verince ekleriz. | index.html (iletişim, harita, JSON-LD) |

> **WhatsApp numarası formatı:** Başında `90`, sonra numara, **boşluk ve sıfır olmadan**.
> Örnek: `0532 591 34 57` → WhatsApp linki `905325913457`, `tel:` ise `+905325913457`.

### Harita (Google Maps)
Harita şu an "Sakarya" geneline ayarlı. Açık adres/dükkan konumu belli olunca:
`index.html` içinde `maps.google.com/maps?q=Sakarya` kısmındaki `Sakarya` yerine
tam adresi veya `enlem,boylam` yaz (örn: `q=40.7731,30.3948`).

---

## 🖼️ Fotoğraf Değiştirmek / Eklemek

Fotoğraflar `assets/img/` klasöründe ve **senin gönderdiğin gerçek iş fotoğrafların** (kamyonet kasa tentesi).
Bir fotoğrafı değiştirmek için **aynı isimle üzerine yazman yeterli** — HTML'e dokunmana gerek yok.

| Dosya (`assets/img/`)   | Sitede nerede görünüyor                         |
|-------------------------|-------------------------------------------------|
| `t-urun.jpg`            | Hero — büyük ön çerçeve (en dikkat çeken kare)   |
| `t-dukkan.jpg`          | Hero arka çerçeve + "Neden Biz" (dükkan görünür) |
| `hero-blur.jpg`         | Hero'nun bulanık arka planı                      |
| `t-kasa.jpg`            | "Kamyonet Kasa Tentesi" kartı                    |
| `t-acilir.jpg`          | "Açılır Kanatlı Tente" kartı + galeri            |
| `t-kavisli.jpg`         | "Kavisli (Kubbeli)" kartı + galeri               |
| `t-kapali.jpg`          | "Kapalı Kutu Tente" kartı + galeri               |
| `t-ticari.jpg`          | "Ticari Araç & Pikap" kartı + galeri             |
| `t-kavisli2.jpg`        | "İmalat, Montaj & Tamir" kartı + galeri          |
| `t-acilir2.jpg` / `t-acilir3.jpg` / `t-gece.jpg` | Galeri                 |

**Değiştirmek:** fotoğrafı JPG yap, **aynı isimle** kaydet, `assets/img/` içindekinin üzerine yaz (FTP). Bitti.
İpucu: yüklemeden önce [squoosh.app](https://squoosh.app) ile sıkıştır (~100–250 KB).

> Daha fazla galeri fotoğrafı eklemek istersen `index.html` içindeki `<!-- GALERİ -->` bölümünde
> mevcut `<figure>` satırlarını çoğaltıp yeni dosya adını yazman yeterli. `alt` metnini anlamlı yaz (SEO).

### Paylaşım görseli (WhatsApp önizleme)
`assets/og-image.jpg` hazır ve çalışıyor. İstersen kendi tasarımınla (1200×630 px) değiştirebilirsin —
WhatsApp'ta link paylaşıldığında çıkan kapak görseli budur.

---

## 🔍 SEO — Yayından Sonra Yapılacaklar

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)) hesabı aç, alan adını doğrula.
2. `sitemap.xml` adresini Search Console'a gönder: `https://senin-alanadin.com/sitemap.xml`
3. **Google İşletme Profili** (Google Business) oluştur — Sakarya yerel aramalarında öne çıkman için en kritik adım. Adres, telefon, fotoğraf, çalışma saati ekle.
4. SSL sertifikası (https) kur — hosting panelinden ücretsiz "Let's Encrypt" genelde tek tık.
5. SSL aktif olunca `.htaccess` dosyasındaki **HTTPS yönlendirme** satırlarının başındaki `#` işaretlerini kaldır (yorumdan çıkar).

### Sitede zaten hazır olan SEO altyapısı ✓
- Başlık, açıklama, anahtar kelimeler (meta etiketleri)
- Open Graph + Twitter Card (sosyal medya önizleme)
- JSON-LD yapısal veri: **LocalBusiness** (yerel işletme) + **FAQ** (Google'da soru-cevap kutusu)
- Coğrafi etiketler (Sakarya konumu)
- `robots.txt`, `sitemap.xml`, canonical link
- Semantik HTML, mobil uyumlu, hızlı yükleme, erişilebilirlik

---

## 🎨 Renkleri Değiştirmek

`css/style.css` dosyasının en üstündeki `:root` bölümünde tüm renkler tanımlı.
Örneğin turuncu vurguyu değiştirmek için `--accent: #f97316;` satırını düzenle.

---

Hazırlayan: Claude · İletişim/numara/fotoğraf güncellemelerini birlikte yapabiliriz.
