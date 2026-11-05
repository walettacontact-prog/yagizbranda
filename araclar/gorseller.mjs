// Yağız Branda görselleri → public/img/ (kaynak: kaynak/instagram/, işletmenin Instagram'ından kullanıcı onayıyla, 5 Kasım 2026):
// - İş fotoğrafları: video kapaklarındaki siyah şeritler ve yuvarlak köşeler kesilir, 4:5 kırpılır → img/is/<ad>-<genişlik>.webp
// - Logo (Instagram profil görseli, 150 px) ve sekme simgeleri
// - Her sayfa için paylaşım görseli (img/og/<ad>.jpg, 1200×630), sitenin yazı tipiyle Chrome'da çizilir
// Kullanım: npm run gorseller   (Google Chrome gerekir; sharp siteler/ortak-sistem'den alınır, ffmpeg favicon.ico için)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromeAc } from "./chrome.mjs";
import { FOTOLAR, HIZMETLER, FIRMA } from "../src/veri.mjs";

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sharp = createRequire(path.join(kok, "..", "ortak-sistem", "package.json"))("sharp");
const kaynak = path.join(kok, "kaynak", "instagram");
const hedef = path.join(kok, "public", "img");
fs.rmSync(hedef, { recursive: true, force: true });
for (const k of ["is", "og"]) fs.mkdirSync(path.join(hedef, k), { recursive: true });

// ad → [Instagram gönderi kodu, dikey odak (0 üst … 1 alt), isteğe bağlı bölge [x0, y0, x1] (oran)]
const KAYNAK = {
  "atolye-onu": ["DauoeCMMvIe", 0.4],
  "istanbul-kaynarca": ["DZqGzGosv0h", 0.45],
  "acilir-kanat": ["Da2gzBMMloK", 0.5],
  "istanbul-pendik": ["DdXB8ZsRBei", 0.62],
  "ankara": ["DaBOhEYszlz", 0.5],
  "bandirma": ["Da0CUZfsHoS", 0.5],
  "zonguldak": ["DbRC2QekWjD", 0.4],
  "afyon": ["DeOH8dasG46", 0.45],
  "izmit": ["DeJoqaBsEO-", 0.45],
  "iznik": ["Da8NWq1MWk4", 0.45],
  "karacabey": ["DaTP6WiMVKC", 0.5],
  "serdivan": ["DdZTTS7MCul", 0.55],
  "istanbul": ["Dai89X3MRCQ", 0.5],
  "istanbul-kaynarca-mavi": ["Depo5sNsSJk", 0.5],
  "ford-koyu": ["DdtvlopMSyn", 0.4],
  "gece": ["DefLMc2x63B", 0.6],
  "branda-yakin": ["Dai89X3MRCQ", 0, [0.22, 0.27, 0.78]],
};
const GENISLIK = [360, 480, 800, 1080];

// Video kapaklarının üstündeki/altındaki siyah şeritler: satırın ortalaması çok koyu ve düzse şerittir
const seritler = async (dosya) => {
  const { data, info } = await sharp(dosya).greyscale().raw().toBuffer({ resolveWithObject: true });
  const koyu = (y) => {
    let t = 0, t2 = 0;
    for (let x = 0; x < info.width; x++) { const v = data[y * info.width + x]; t += v; t2 += v * v; }
    const ort = t / info.width;
    return ort < 14 && Math.sqrt(t2 / info.width - ort * ort) < 10;
  };
  let ust = 0, alt = info.height;
  while (ust < info.height / 3 && koyu(ust)) ust++;
  while (alt > (info.height * 2) / 3 && koyu(alt - 1)) alt--;
  return { en: info.width, ust, alt };
};

const fotoOzet = {};
for (const [ad, [kod, odak, bolge]] of Object.entries(KAYNAK)) {
  if (!FOTOLAR[ad]) throw new Error(`src/veri.mjs FOTOLAR'da yok: ${ad}`);
  const dosya = path.join(kaynak, `ig-${kod}.jpg`);
  const { en, ust, alt } = await seritler(dosya);
  const pay = Math.round(en * 0.025); // ekran görüntülerindeki yuvarlak köşeler
  let kirp;
  if (bolge) {
    const [x0, y0, x1] = bolge, g = Math.round((x1 - x0) * en);
    kirp = { left: Math.round(x0 * en), top: ust + Math.round(y0 * (alt - ust)), width: g, height: Math.round((g * 5) / 4) };
  } else {
    const g = en - 2 * pay, y = Math.round((g * 5) / 4), bos = alt - ust - 2 * pay - y;
    if (bos < 0) throw new Error(`${ad}: 4:5 için yükseklik yetmiyor`);
    kirp = { left: pay, top: ust + pay + Math.round(bos * odak), width: g, height: y };
  }
  const genislikler = [...new Set(GENISLIK.map((w) => Math.min(w, kirp.width)))];
  for (const w of genislikler) {
    await sharp(dosya).extract(kirp).resize({ width: w }).webp({ quality: 74, effort: 6 }).toFile(path.join(hedef, "is", `${ad}-${w}.webp`));
  }
  fotoOzet[ad] = genislikler;
}
// Şablon hangi genişliklerin var olduğunu buradan okur (srcset)
fs.writeFileSync(path.join(kok, "src", "fotolar.json"), JSON.stringify(fotoOzet, null, 1) + "\n");

// Logo ve sekme simgeleri: Instagram profil görseli (siyah zemin üzerinde altın renk logo, 150 px)
const profil = path.join(kaynak, "ig-profil.jpg");
await sharp(profil).png().toFile(path.join(hedef, "logo.png"));
await sharp(profil).webp({ quality: 88 }).toFile(path.join(hedef, "logo.webp"));
const pub = path.join(kok, "public");
for (const [boy, ad] of [[32, "favicon-32x32.png"], [180, "apple-touch-icon.png"], [192, "icon-192.png"]]) {
  await sharp(profil).resize(boy, boy, { kernel: "lanczos3" }).png().toFile(path.join(pub, ad));
}
const ico48 = path.join(hedef, "ico-48.png");
await sharp(profil).resize(48, 48).png().toFile(ico48);
execFileSync("ffmpeg", ["-v", "error", "-y", "-i", ico48, path.join(pub, "favicon.ico")]);
fs.rmSync(ico48);

// Paylaşım görselleri
const url = (yol) => pathToFileURL(yol).href;
const yazi = path.join(pub, "yazi");
const ogHtml = (baslik, alt, foto) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: A; font-weight: 400 800; font-stretch: 100% 125%; src: url("${url(path.join(yazi, "archivo-latin.woff2"))}"); }
@font-face { font-family: A; font-weight: 400 800; font-stretch: 100% 125%; src: url("${url(path.join(yazi, "archivo-tr.woff2"))}"); unicode-range: U+011E-011F, U+0130, U+015E-015F; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; display: flex; background: #101215; color: #fff; font-family: A, sans-serif; overflow: hidden; }
.sol { flex: 1; padding: 60px 56px 54px 64px; display: flex; flex-direction: column; background: radial-gradient(120% 90% at 0% 0%, #23262c 0%, #101215 60%); }
.marka { display: flex; align-items: center; gap: 18px; }
.marka img { width: 84px; height: 84px; border-radius: 14px; }
.marka b { font-weight: 800; font-stretch: 125%; font-size: 30px; letter-spacing: .02em; }
.marka small { display: block; font-size: 16px; font-weight: 500; color: #c9ccd2; letter-spacing: .14em; text-transform: uppercase; margin-top: 4px; }
h1 { margin-top: auto; font-weight: 800; font-stretch: 112%; font-size: ${baslik.length > 30 ? 56 : 64}px; line-height: 1.04; letter-spacing: -.01em; }
h1 i { font-style: normal; color: #f5b800; }
p { margin-top: 18px; font-size: 24px; color: #d5d8dd; line-height: 1.35; }
.tel { margin-top: 30px; display: inline-flex; align-self: flex-start; gap: 12px; align-items: center; background: #f5b800; color: #111; font-weight: 800; font-size: 26px; padding: 14px 24px; border-radius: 10px; }
.foto { width: 504px; height: 630px; object-fit: cover; }
</style></head><body><div class="sol"><div class="marka"><img src="${url(profil)}"><div><b>YAĞIZ BRANDA</b><small>Tente Sistemleri</small></div></div>
<h1>${baslik}</h1><p>${alt}</p><span class="tel">${FIRMA.telYazi}</span></div>
<img class="foto" src="${url(path.join(hedef, "is", `${foto}-${Math.max(...fotoOzet[foto])}.webp`))}"></body></html>`;

const OG = [
  ["ana", "Kamyonet kasa tentesi <i>ve branda</i>", "Erenler / Sakarya · Her ilden araç kabul ediyoruz", "atolye-onu"],
  ...HIZMETLER.map((h) => [h.slug, h.ad.replace(/ (ve .+)$/, " <i>$1</i>"), "Yağız Branda · Erenler / Sakarya", h.gorsel]),
];
const chrome = await chromeAc();
for (const [ad, baslik, alt, foto] of OG) {
  const png = await chrome.ciz(ogHtml(baslik, alt, foto), { en: 1200, boy: 630, olcek: 1 });
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(hedef, "og", `${ad}.jpg`));
}
await chrome.kapat();
console.log(`görseller hazır: ${Object.keys(fotoOzet).length} fotoğraf, ${OG.length} paylaşım görseli`);
