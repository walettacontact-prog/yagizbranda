// Site üretimi: public/ olduğu gibi dist/'e kopyalanır, sayfalar src/veri.mjs + src/sablon.mjs'den yazılır;
// site haritası (görselleriyle), robots.txt, site.webmanifest ve llms.txt (yapay zekâ asistanları için işletme özeti)
// adrese (ADRES/KOK) göre burada üretilir. __YIL__ o yılın sayısı olur.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { ADRES, KOK, FIRMA, TANIM, ILLER, HIZMETLER, SSS } from "./src/veri.mjs";
import { SAYFALAR, fotoBilgi } from "./src/sablon.mjs";

fs.rmSync("dist", { recursive: true, force: true });
fs.cpSync("public", "dist", { recursive: true, filter: (yol) => !yol.endsWith(".DS_Store") });
const yil = String(new Date().getFullYear());
const bugun = new Date().toISOString().slice(0, 10);
// Stil ve betik dosyasına içerik özeti eklenir: dosya değişince tarayıcı önbelleği eskisini kullanmaz
const surum = (dosya) => crypto.createHash("md5").update(fs.readFileSync(path.join("public", dosya))).digest("hex").slice(0, 8);
const surumler = Object.fromEntries(["site.css", "site.js"].map((d) => [d, surum(d)]));
const surumle = (html) => html.replace(/\/(site\.(?:css|js))"/g, (_, d) => `/${d}?v=${surumler[d]}"`);
const x = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const harita = [];
for (const [dosya, yol, html, gorseller] of SAYFALAR()) {
  const hedef = path.join("dist", dosya);
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  fs.writeFileSync(hedef, surumle(html.replaceAll("__YIL__", yil)));
  if (!yol) continue;
  const resimler = gorseller.map(fotoBilgi).map((g) => `\n    <image:image><image:loc>${g.url}</image:loc><image:caption>${x(g.alt)}</image:caption></image:image>`).join("");
  harita.push(`  <url><loc>${ADRES}${yol}</loc><lastmod>${bugun}</lastmod>${resimler}\n  </url>`);
}
fs.writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${harita.join("\n")}
</urlset>
`);
fs.writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${ADRES}/sitemap.xml\n`);
fs.writeFileSync("dist/site.webmanifest", JSON.stringify({
  name: FIRMA.tamAd, short_name: FIRMA.ad, lang: "tr", start_url: `${KOK}/`, scope: `${KOK}/`, display: "standalone",
  background_color: "#0e0e10", theme_color: "#0e0e10",
  icons: [{ src: `${KOK}/icon-192.png`, sizes: "192x192", type: "image/png" }, { src: `${KOK}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }],
}, null, 2) + "\n");

// llms.txt: sitenin kısa, düz özeti (llmstxt.org biçimi); bilgiler sayfalardakiyle birebir aynı
fs.writeFileSync("dist/llms.txt", `# ${FIRMA.ad}

> ${TANIM}

- Tam adı: ${FIRMA.tamAd}
- Adres: ${FIRMA.sokak}, ${FIRMA.postaKodu} ${FIRMA.ilce} / ${FIRMA.il}, Türkiye
- Telefon ve WhatsApp: ${FIRMA.telYazi}
- E-posta: ${FIRMA.eposta}
- Çalışma saatleri: ${FIRMA.saatYazi}; ${FIRMA.kapali.toLocaleLowerCase("tr")}
- Hizmet bölgesi: Türkiye geneli; araç Erenler'deki atölyeye getirilir, ölçü, imalat ve montaj atölyede yapılır
- Müşterilerin geldiği iller: ${ILLER.map((i) => i.ad).join(", ")}
- Instagram: ${FIRMA.instagram}
- Google Haritalar: ${FIRMA.harita} ("${FIRMA.haritaAd}", kategori: Tenteci; artı kod ${FIRMA.artiKod})

## Hizmetler

${HIZMETLER.map((h) => `- [${h.ad}](${ADRES}/${h.slug}/): ${h.giris}`).join("\n")}

## Sık sorulanlar

${SSS.map(([s, c]) => `- ${s} ${c}`).join("\n")}
`);
// GitHub Pages: Jekyll işlemesin (dosyalar olduğu gibi yayınlansın)
fs.writeFileSync("dist/.nojekyll", "");
console.log(`dist hazır: ${harita.length} sayfa (${ADRES})`);
