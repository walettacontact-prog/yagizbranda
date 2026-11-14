// Sayfa şablonları: ortak iskelet (head, SEO, paylaşım etiketleri, şema), üst menü, alt bilgi, ana sayfa, hizmet sayfaları, 404.
// Bütün bağlantılar KOK ile başlar (GitHub Pages'te /yagizbranda, alan adında boş), böylece adres değişince yalnızca ADRES değişir.
// Sade düzen (5 Kasım): kısa metin, fotoğraf üstünde başlıklı hizmet karoları, Türkiye haritası, sık sorulanlar kapalı gelir.
import fs from "node:fs";
import { ADRES, KOK, FIRMA, TANIM, ILLER, FOTOLAR, YATAY, DEGERLER, GALERI, GALERI_KASA, HIZMETLER, SUREC, SSS } from "./veri.mjs";

const oku = (ad) => JSON.parse(fs.readFileSync(new URL(ad, import.meta.url), "utf8"));
const FOTO_BOY = oku("./fotolar.json");
const HARITA = oku("./harita.json");
const e = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const u = (yol) => `${KOK}${yol}`;
const wp = (mesaj = FIRMA.wpMesaj) => `https://wa.me/${FIRMA.tel.slice(1)}?text=${encodeURIComponent(mesaj)}`;
const adres = `${FIRMA.sokak}, ${FIRMA.postaKodu} ${FIRMA.ilce} / ${FIRMA.il}`;

const SIMGE = {
  tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  wp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a5 5 0 0 1-2.9-2.9l1-1-1-2z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
  konum: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  saat: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  posta: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  ok: '<svg class="ok" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  tik: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  olcu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 15 12-12 6 6L9 21z"/><path d="m7 11 2 2M10 8l2 2M13 5l2 2"/></svg>',
  atolye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V9l9-6 9 6v12"/><path d="M7 21v-7h10v7M7 17h10"/></svg>',
  turkiye: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
};

// 4:5 iş fotoğrafı; sizes sayfadaki genişliğe göre
const foto = (ad, sizes, { yukle = "lazy", sinif = "" } = {}) => {
  const g = FOTO_BOY[ad], en = Math.max(...g);
  return `<img${sinif ? ` class="${sinif}"` : ""} src="${u(`/img/is/${ad}-${g.includes(800) ? 800 : en}.webp`)}" srcset="${g.map((w) => `${u(`/img/is/${ad}-${w}.webp`)} ${w}w`).join(", ")}"
    sizes="${sizes}" width="800" height="1000" alt="${e(FOTOLAR[ad].alt)}" ${yukle === "lazy" ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"'}>`;
};

// Yatay 4:3 fotoğraf (ekip)
const yatayFoto = (ad, sizes) => {
  const g = FOTO_BOY[ad], en = Math.max(...g);
  return `<img src="${u(`/img/is/${ad}-${en}.webp`)}" srcset="${g.map((w) => `${u(`/img/is/${ad}-${w}.webp`)} ${w}w`).join(", ")}"
    sizes="${sizes}" width="720" height="540" alt="${e(YATAY[ad].alt)}" loading="lazy" decoding="async">`;
};

// ---- Şema (JSON-LD) ----
const ISLETME = {
  "@type": "AutomotiveBusiness", "@id": `${ADRES}/#isletme`, name: FIRMA.ad, alternateName: FIRMA.tamAd, slogan: FIRMA.slogan,
  url: `${ADRES}/`, description: TANIM,
  logo: { "@type": "ImageObject", url: `${ADRES}/img/logo.png`, width: 150, height: 150 },
  image: [`${ADRES}/img/og/ana.jpg`, `${ADRES}/img/is/atolye-onu-1080.webp`],
  telephone: "+90-532-591-34-57", email: FIRMA.eposta,
  address: { "@type": "PostalAddress", streetAddress: FIRMA.sokak, addressLocality: FIRMA.ilce, addressRegion: FIRMA.il, postalCode: FIRMA.postaKodu, addressCountry: "TR" },
  geo: { "@type": "GeoCoordinates", latitude: FIRMA.enlem, longitude: FIRMA.boylam },
  hasMap: FIRMA.harita,
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" }],
  areaServed: { "@type": "Country", name: "Türkiye" },
  knowsAbout: ["Kamyonet kasa tentesi", "Açılır kanatlı tente", "Kavisli tente", "Kapalı kutu tente", "Kamyon brandası", "TIR brandası", "Alüminyum kasa döşeme", "Tente tamiri"],
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Hizmetler",
    itemListElement: HIZMETLER.map((h) => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": `${ADRES}/${h.slug}/#hizmet`, name: h.ad, url: `${ADRES}/${h.slug}/` } })),
  },
  sameAs: [FIRMA.instagram, FIRMA.harita, FIRMA.kgmid],
};
const SITE = {
  "@type": "WebSite", "@id": `${ADRES}/#site`, url: `${ADRES}/`, name: FIRMA.ad, inLanguage: "tr-TR",
  publisher: { "@id": `${ADRES}/#isletme` },
  creator: { "@type": "Organization", name: "RAWS MEDIA", url: "https://rawsmedia.com/" },
};
const kirintiSema = (yol, ad) => ({
  "@type": "BreadcrumbList", "@id": `${ADRES}${yol}#kirinti`,
  itemListElement: [["Ana sayfa", "/"], [ad, yol]].map(([n, y], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: `${ADRES}${y}` })),
});
const sssSema = (yol, liste) => ({
  "@type": "FAQPage", "@id": `${ADRES}${yol}#sss`,
  mainEntity: liste.map(([s, c]) => ({ "@type": "Question", name: s, acceptedAnswer: { "@type": "Answer", text: c } })),
});

// ---- İskelet ----
function iskelet({ yol, baslik, aciklama, og, govde, sema = [], kirinti = null, onYukle = "" }) {
  const sayfaAdres = `${ADRES}${yol}`;
  const sayfa = {
    "@type": "WebPage", "@id": `${sayfaAdres}#sayfa`, url: sayfaAdres, name: baslik, description: aciklama, inLanguage: "tr-TR",
    isPartOf: { "@id": `${ADRES}/#site` }, about: { "@id": `${ADRES}/#isletme` }, primaryImageOfPage: `${ADRES}/img/og/${og}.jpg`,
    ...(kirinti ? { breadcrumb: { "@id": `${sayfaAdres}#kirinti` } } : {}),
  };
  const graf = [ISLETME, SITE, sayfa, ...(kirinti ? [kirintiSema(yol, kirinti)] : []), ...sema];
  const menu = [...HIZMETLER.map((h) => [`/${h.slug}/`, h.menu]), ["/#iletisim", "İletişim"]];
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(baslik)}</title>
<meta name="description" content="${e(aciklama)}">
<link rel="canonical" href="${sayfaAdres}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0e0e10">
<meta name="geo.region" content="TR-54">
<meta name="geo.placename" content="Erenler, Sakarya">
<meta name="geo.position" content="${FIRMA.enlem};${FIRMA.boylam}">
<meta name="ICBM" content="${FIRMA.enlem}, ${FIRMA.boylam}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${FIRMA.ad}">
<meta property="og:locale" content="tr_TR">
<meta property="og:url" content="${sayfaAdres}">
<meta property="og:title" content="${e(baslik)}">
<meta property="og:description" content="${e(aciklama)}">
<meta property="og:image" content="${ADRES}/img/og/${og}.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${e(baslik)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${e(baslik)}">
<meta name="twitter:description" content="${e(aciklama)}">
<meta name="twitter:image" content="${ADRES}/img/og/${og}.jpg">
<link rel="icon" href="${u("/favicon.ico")}" sizes="48x48">
<link rel="icon" href="${u("/favicon-32x32.png")}" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${u("/apple-touch-icon.png")}">
<link rel="manifest" href="${u("/site.webmanifest")}">
<link rel="alternate" type="text/markdown" href="${u("/llms.txt")}" title="İşletme özeti">
<link rel="preload" href="${u("/yazi/archivo-latin.woff2")}" as="font" type="font/woff2" crossorigin>
${onYukle}<link rel="stylesheet" href="${u("/site.css")}">
<script>document.documentElement.classList.add("js")</script>
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graf })}</script>
</head>
<body>
<a class="atla" href="#icerik">İçeriğe geç</a>
<div class="serit"><div class="kap serit-ic">
  <a href="${FIRMA.harita}" target="_blank" rel="noopener">${SIMGE.konum}${e(FIRMA.sokak)}, ${FIRMA.ilce} / ${FIRMA.il}</a>
  <span>${SIMGE.saat}${e(FIRMA.saatKisa)} · ${FIRMA.kapali}</span>
  <a href="${FIRMA.instagram}" target="_blank" rel="noopener">${SIMGE.ig}${FIRMA.instagramAd}</a>
</div></div>
<header class="ust">
  <div class="kap ust-ic">
    <a class="marka" href="${u("/")}"><img src="${u("/img/logo.webp")}" width="44" height="44" alt=""><span><b>YAĞIZ BRANDA</b><small>Tente Sistemleri</small></span></a>
    <nav class="menu" id="menu" aria-label="Ana menü">
      ${menu.map(([y, ad]) => `<a href="${u(y)}"${yol === y ? ' aria-current="page"' : ""}>${e(ad)}</a>`).join("\n      ")}
      <a class="dugme dugme-sari menu-tel" href="tel:${FIRMA.tel}">${SIMGE.tel}${FIRMA.telYazi}</a>
    </nav>
    <button class="menu-ac" type="button" aria-controls="menu" aria-expanded="false"><span class="gizli">Menü</span><i></i><i></i></button>
  </div>
</header>
<main id="icerik">
${govde}
</main>
${altBilgi()}
<div class="alt-cubuk"><a class="dugme dugme-wp" href="${wp()}" target="_blank" rel="noopener">${SIMGE.wp}WhatsApp</a><a class="dugme dugme-sari" href="tel:${FIRMA.tel}">${SIMGE.tel}Hemen ara</a></div>
<script src="${u("/site.js")}" defer></script>
</body>
</html>
`;
}

const dugmeler = (mesaj) => `<div class="dugmeler">
      <a class="dugme dugme-wp dugme-buyuk" href="${wp(mesaj)}" target="_blank" rel="noopener">${SIMGE.wp}WhatsApp'tan yazın</a>
      <a class="dugme dugme-cizgi dugme-buyuk" href="tel:${FIRMA.tel}">${SIMGE.tel}${FIRMA.telYazi}</a>
    </div>`;

const bolumBas = (ust, baslik, sag = "") => `<div class="bolum-bas${sag ? " bolum-bas-yan" : ""}">
      <div><p class="ust-baslik">${ust}</p><h2>${baslik}</h2></div>${sag}
    </div>`;

const sssYaz = (liste) => `<div class="sss">
${liste.map(([s, c]) => `      <details><summary>${e(s)}</summary><p>${e(c)}</p></details>`).join("\n")}
    </div>`;

const galeriYaz = (liste) => `<div class="galeri">
${liste.map((ad) => `      <figure>${foto(ad, "(min-width: 1100px) 270px, (min-width: 760px) 30vw, 46vw")}${FOTOLAR[ad].yer ? `<figcaption>${e(FOTOLAR[ad].yer)}</figcaption>` : ""}</figure>`).join("\n")}
    </div>`;

const instagramBag = `<a class="yazi-bag" href="${FIRMA.instagram}" target="_blank" rel="noopener">${SIMGE.ig}Instagram'da tüm işler</a>`;

// Fotoğraf üstünde başlıklı hizmet karosu
const karolar = (liste, sizes) => `<div class="karolar karolar-${liste.length}">
${liste.map((h) => `      <a class="karo" href="${u(`/${h.slug}/`)}">
        ${foto(h.gorsel, sizes)}
        <div class="karo-yazi"><h3>${e(h.ad)}</h3><p>${e(h.kisa)}</p></div>${SIMGE.ok}
      </a>`).join("\n")}
    </div>`;

// Türkiye haritası: atölyeden müşterilerin geldiği illere yaylar (araclar/harita.mjs, Natural Earth)
const harita = () => {
  const [ax, ay] = HARITA.atolye;
  const yaylar = HARITA.iller.map(({ n: [x, y] }) => {
    const kx = (ax + x) / 2, ky = Math.min(ay, y) - Math.max(36, Math.hypot(x - ax, y - ay) * 0.35);
    return `<path class="yay" d="M${ax} ${ay}Q${kx.toFixed(1)} ${ky.toFixed(1)} ${x} ${y}"/>`;
  }).join("");
  const noktalar = HARITA.iller.map(({ n: [x, y] }) => `<circle class="il" cx="${x}" cy="${y}" r="9"/>`).join("");
  return `<figure class="harita">
      <svg viewBox="0 0 ${HARITA.en} ${HARITA.boy}" role="img" aria-labelledby="harita-baslik">
        <title id="harita-baslik">Türkiye haritası: Sakarya'daki atölyemize araç gelen iller</title>
        <path class="ulke" d="${HARITA.yol}"/>${yaylar}${noktalar}
        <circle class="atolye-hale" cx="${ax}" cy="${ay}" r="26"/><circle class="atolye" cx="${ax}" cy="${ay}" r="13"/>
      </svg>
      <figcaption><ul class="iller">${ILLER.map((il) => `<li${il.ad === FIRMA.il ? ' class="merkez"' : ""}>${il.ad}</li>`).join("")}</ul></figcaption>
    </figure>`;
};

const cagri = (mesaj) => `<section class="cagri koyu">
  <div class="kap cagri-ic">
    <div><h2>Aracınızın modelini yazın, gün belirleyelim.</h2><p>${e(FIRMA.saatYazi)} · ${FIRMA.kapali}</p></div>
    ${dugmeler(mesaj)}
  </div>
</section>`;

const altBilgi = () => `<footer class="alt koyu">
  <div class="kap alt-ust">
    <div class="alt-marka">
      <a class="marka" href="${u("/")}"><img src="${u("/img/logo.webp")}" width="44" height="44" alt="" loading="lazy"><span><b>YAĞIZ BRANDA</b><small>Tente Sistemleri</small></span></a>
      <p>${e(TANIM)}</p>
    </div>
    <nav class="alt-liste" aria-label="Hizmetler">
      <h2>Hizmetler</h2>
      ${HIZMETLER.map((h) => `<a href="${u(`/${h.slug}/`)}">${e(h.ad)}</a>`).join("\n      ")}
    </nav>
    <div class="alt-liste">
      <h2>İletişim</h2>
      <a href="tel:${FIRMA.tel}">${SIMGE.tel}${FIRMA.telYazi}</a>
      <a href="${wp()}" target="_blank" rel="noopener">${SIMGE.wp}WhatsApp</a>
      <a href="mailto:${FIRMA.eposta}">${SIMGE.posta}${FIRMA.eposta}</a>
      <a href="${FIRMA.instagram}" target="_blank" rel="noopener">${SIMGE.ig}${FIRMA.instagramAd}</a>
    </div>
    <div class="alt-liste">
      <h2>Atölye</h2>
      <a href="${FIRMA.harita}" target="_blank" rel="noopener">${SIMGE.konum}<span>${e(adres)}</span></a>
      <p>${SIMGE.saat}<span>${e(FIRMA.saatYazi)}<br>${FIRMA.kapali}</span></p>
    </div>
  </div>
  <div class="kap alt-alt">
    <p>© __YIL__ ${FIRMA.tamAd}</p>
    <a href="https://rawsmedia.com/" target="_blank" rel="noopener">Web tasarım ve yazılım · RAWS MEDIA</a>
  </div>
</footer>`;

// ---- Ana sayfa ----
function anaSayfa() {
  const govde = `<section class="giris giris-ana koyu">
  <div class="kap giris-ic">
    <div class="giris-yazi">
      <p class="ust-baslik">${FIRMA.slogan}</p>
      <h1>Kamyonet kasa tentesi <span class="altin-yazi">ve branda</span></h1>
      <p class="giris-p">Sakarya'daki atölyemizde ölçüye özel imalat ve montaj. Türkiye'nin her ilinden araç kabul ediyoruz.</p>
      ${dugmeler()}
    </div>
    <div class="giris-gorsel">
      <figure class="giris-foto">${foto("atolye-onu", "(min-width: 960px) 420px, (min-width: 640px) 60vw, 92vw", { yukle: "hemen" })}</figure>
      <div class="giris-kart"><img src="${u("/img/logo.webp")}" width="48" height="48" alt=""><span><b>Atölyemiz</b><small>Erenler / Sakarya</small></span></div>
    </div>
  </div>
</section>

<section class="guven" aria-label="Neden Yağız Branda">
  <ul class="kap guven-ic">
    <li>${SIMGE.olcu}<span><b>Ölçüye özel imalat</b>Her kasaya ayrı tente</span></li>
    <li>${SIMGE.atolye}<span><b>Atölyede montaj</b>Erenler / Sakarya</span></li>
    <li>${SIMGE.turkiye}<span><b>Türkiye geneli</b>Her ilden araç kabul</span></li>
    <li>${SIMGE.saat}<span><b>09:00 – 20:00</b>Pzt–Cmt · ${FIRMA.kapali}</span></li>
  </ul>
</section>

<section class="bolum" id="hizmetler">
  <div class="kap">
    ${bolumBas("Hizmetlerimiz", "Tente ve brandada tek adres")}
    ${karolar(HIZMETLER, "(min-width: 1100px) 270px, (min-width: 760px) 45vw, 46vw")}
  </div>
</section>

<section class="bolum bolum-gri ekip" id="ekibimiz">
  <div class="kap ekip-ic">
    <figure class="ekip-foto">${yatayFoto("ekip", "(min-width: 960px) 560px, 92vw")}<figcaption>Teslim günü · İstanbul Gaziosmanpaşa</figcaption></figure>
    <div class="ekip-yazi">
      <p class="ust-baslik">Ekibimiz</p>
      <h2>Ölçüden montaja aynı ekip, aynı atölye</h2>
      <p>Aracınızı Erenler'deki atölyemizde karşılar, kasayı ölçer, tenteyi ona göre hazırlar ve yine burada monte ederiz. Teslim ettiğimiz araçları Instagram'da sahiplerine “hayırlı olsun” diyerek paylaşıyoruz.</p>
      <ul class="degerler">
${DEGERLER.map(([b, a]) => `        <li><b>${e(b)}</b><span>${e(a)}</span></li>`).join("\n")}
      </ul>
    </div>
  </div>
</section>

<section class="turkiye koyu">
  <div class="kap turkiye-ic">
    <div class="turkiye-yazi">
      <p class="ust-baslik">Türkiye geneli</p>
      <h2>Türkiye'nin her ilinden araç geliyor</h2>
      <p>Aracınızı Erenler'deki atölyemize getirin; ölçü, imalat ve montaj tek yerde yapılır.</p>
      <ol class="adimlar">${SUREC.map((a) => `<li>${e(a)}</li>`).join("")}</ol>
    </div>
    ${harita()}
  </div>
</section>

<section class="bolum bolum-gri" id="galeri">
  <div class="kap">
    ${bolumBas("İşlerimizden", "Farklı illerden gelen araçlar", instagramBag)}
    ${galeriYaz(GALERI)}
  </div>
</section>

<section class="bolum" id="sss">
  <div class="kap kap-dar">
    ${bolumBas("Sık sorulanlar", "Merak edilenler")}
    ${sssYaz(SSS)}
  </div>
</section>

<section class="bolum bolum-gri" id="iletisim">
  <div class="kap iletisim">
    <div>
      ${bolumBas("İletişim", "Atölyemize bekleriz")}
      <ul class="bilgi">
        <li>${SIMGE.konum}<span><b>Adres</b>${e(adres)}</span></li>
        <li>${SIMGE.saat}<span><b>Çalışma saatleri</b>${e(FIRMA.saatYazi)} · ${FIRMA.kapali}</span></li>
        <li>${SIMGE.tel}<span><b>Telefon ve WhatsApp</b><a href="tel:${FIRMA.tel}">${FIRMA.telYazi}</a></span></li>
        <li>${SIMGE.posta}<span><b>E-posta</b><a href="mailto:${FIRMA.eposta}">${FIRMA.eposta}</a></span></li>
      </ul>
    </div>
    <div class="iletisim-kart koyu">
      <p class="ust-baslik">Yol tarifi</p>
      <h3>Güney Mobilyacılar Sanayi Sitesi, Erenler</h3>
      <p>Google Haritalar'da “Yağız Branda” olarak kayıtlıyız.</p>
      <div class="dugmeler">
        <a class="dugme dugme-sari dugme-buyuk" href="${FIRMA.yolTarifi}" target="_blank" rel="noopener">${SIMGE.konum}Yol tarifi al</a>
        <a class="dugme dugme-cizgi dugme-buyuk" href="${FIRMA.harita}" target="_blank" rel="noopener">Haritada aç</a>
      </div>
    </div>
  </div>
</section>`;
  return iskelet({
    yol: "/",
    baslik: "Yağız Branda | Kamyonet Kasa Tentesi ve Branda – Sakarya",
    aciklama: "Erenler / Sakarya'da kamyonet kasa tentesi, kamyon ve TIR brandası, alüminyum kasa döşeme ve tente tamiri. Ölçüye özel imalat; her ilden araç kabul.",
    og: "ana",
    govde,
    sema: [sssSema("/", SSS)],
    onYukle: `<link rel="preload" as="image" href="${u("/img/is/atolye-onu-800.webp")}" imagesrcset="${FOTO_BOY["atolye-onu"].map((w) => `${u(`/img/is/atolye-onu-${w}.webp`)} ${w}w`).join(", ")}" imagesizes="(min-width: 960px) 420px, (min-width: 640px) 60vw, 92vw" fetchpriority="high">\n`,
  });
}

// ---- Hizmet sayfası ----
function hizmetSayfasi(h) {
  const yol = `/${h.slug}/`;
  const mesaj = `Merhaba, ${h.ad.toLocaleLowerCase("tr")} hakkında bilgi almak istiyorum.`;
  const govde = `<section class="giris giris-kisa koyu">
  <div class="kap giris-ic">
    <div class="giris-yazi">
      <nav class="kirinti" aria-label="Sayfa yolu"><a href="${u("/")}">Ana sayfa</a><span aria-hidden="true">/</span><span aria-current="page">${e(h.ad)}</span></nav>
      <h1>${e(h.h1)}</h1>
      <p class="giris-p">${e(h.giris)}</p>
      ${dugmeler(mesaj)}
      <ul class="olgular">
        <li>${SIMGE.tik}Erenler / Sakarya</li>
        <li>${SIMGE.tik}Her ilden araç</li>
        <li>${SIMGE.tik}${e(FIRMA.saatKisa)}</li>
      </ul>
    </div>
    <figure class="giris-foto">${foto(h.gorsel, "(min-width: 960px) 420px, (min-width: 640px) 60vw, 92vw", { yukle: "hemen" })}</figure>
  </div>
</section>

<section class="bolum">
  <div class="kap">
    ${bolumBas("Neler yapıyoruz", `${e(h.ad)}`)}
    <ul class="maddeler maddeler-${h.maddeler.length}">
${h.maddeler.map(([b, a]) => `      <li>${SIMGE.tik}<h3>${e(b)}</h3><p>${e(a)}</p></li>`).join("\n")}
    </ul>
${h.araclar ? `    <div class="araclar"><h3>Tente yaptığımız araçlardan bazıları</h3><ul>${h.araclar.map((a) => `<li>${e(a)}</li>`).join("")}<li>ve benzerleri</li></ul></div>\n` : ""}  </div>
</section>
${h.slug === "kamyonet-kasa-tentesi" ? `
<section class="bolum bolum-gri">
  <div class="kap">
    ${bolumBas("İşlerimizden", "Farklı illerden gelen kamyonetler", instagramBag)}
    ${galeriYaz([...GALERI_KASA, ...GALERI.slice(0, 4)])}
  </div>
</section>
` : ""}
<section class="bolum${h.slug === "kamyonet-kasa-tentesi" ? "" : " bolum-gri"}">
  <div class="kap kap-dar">
    ${bolumBas("Sık sorulanlar", `${e(h.ad)} hakkında`)}
    ${sssYaz(h.sss)}
  </div>
</section>

<section class="bolum">
  <div class="kap">
    ${bolumBas("Diğer hizmetler", "Bunlar da atölyemizde")}
    ${karolar(HIZMETLER.filter((x) => x !== h), "(min-width: 1100px) 360px, (min-width: 760px) 30vw, 46vw")}
  </div>
</section>
${cagri(mesaj)}`;
  return iskelet({
    yol, baslik: h.baslik, aciklama: h.aciklama, og: h.slug, govde, kirinti: h.ad,
    sema: [
      {
        "@type": "Service", "@id": `${ADRES}${yol}#hizmet`, name: h.ad, serviceType: h.ad, description: `${h.giris} ${TANIM}`, url: `${ADRES}${yol}`,
        provider: { "@id": `${ADRES}/#isletme` }, areaServed: { "@type": "Country", name: "Türkiye" }, image: `${ADRES}/img/og/${h.slug}.jpg`,
      },
      sssSema(yol, h.sss),
    ],
  });
}

function bulunamadi() {
  const govde = `<section class="giris giris-kisa koyu bulunamadi">
  <div class="kap">
    <p class="ust-baslik">404</p>
    <h1>Aradığınız sayfa bulunamadı</h1>
    <p class="giris-p">Adres değişmiş olabilir. Ana sayfadan devam edebilir ya da bize doğrudan ulaşabilirsiniz.</p>
    <div class="dugmeler"><a class="dugme dugme-sari dugme-buyuk" href="${u("/")}">Ana sayfaya dönün</a><a class="dugme dugme-cizgi dugme-buyuk" href="tel:${FIRMA.tel}">${SIMGE.tel}${FIRMA.telYazi}</a></div>
  </div>
</section>`;
  return iskelet({ yol: "/404.html", baslik: "Sayfa bulunamadı | Yağız Branda", aciklama: "Aradığınız sayfa bulunamadı.", og: "ana", govde })
    .replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">')
    .replace(/<link rel="canonical"[^>]*>\n/, "");
}

// [dosya, site haritasındaki yol (null: haritaya girmez), html, haritadaki görseller]
export const SAYFALAR = () => [
  ["index.html", "/", anaSayfa(), ["atolye-onu", "ekip", ...GALERI]],
  ...HIZMETLER.map((h) => [`${h.slug}/index.html`, `/${h.slug}/`, hizmetSayfasi(h), [h.gorsel, ...(h.slug === "kamyonet-kasa-tentesi" ? GALERI_KASA : [])]]),
  ["404.html", null, bulunamadi(), []],
];

// Görsel site haritası için: fotoğrafın en büyük boyu ve açıklaması
export const fotoBilgi = (ad) => ({ url: `${ADRES}/img/is/${ad}-${Math.max(...FOTO_BOY[ad])}.webp`, alt: (FOTOLAR[ad] || YATAY[ad]).alt });
