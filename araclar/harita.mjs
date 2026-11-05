// Türkiye haritası → src/harita.json (şablon SVG'yi sayfaya gömer). Kaynak: Natural Earth 1:50m ülke sınırları (kamu malı),
// kaynak/harita/turkiye-ne50m.geojson. Eşdikdörtgen izdüşüm, enlem 39°'de düzeltilmiş; noktalar sadeleştirilir.
// Kullanım: node araclar/harita.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ILLER, FIRMA } from "../src/veri.mjs";

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const veri = JSON.parse(fs.readFileSync(path.join(kok, "kaynak/harita/turkiye-ne50m.geojson"), "utf8"));
const BATI = 25.6, KUZEY = 42.2, KOS = Math.cos((39 * Math.PI) / 180), EN = 1000;
const OLCEK = EN / ((44.9 - BATI) * KOS);
const xy = ([boylam, enlem]) => [(boylam - BATI) * KOS * OLCEK, (KUZEY - enlem) * OLCEK];
const BOY = Math.ceil((KUZEY - 35.75) * OLCEK);

// Douglas–Peucker sadeleştirme (piksel cinsinden tolerans)
const sadelestir = (n, tol) => {
  if (n.length < 3) return n;
  const [a, b] = [n[0], n[n.length - 1]];
  let enUzak = 0, i0 = 0;
  for (let i = 1; i < n.length - 1; i++) {
    const [x, y] = n[i], dx = b[0] - a[0], dy = b[1] - a[1], u = Math.hypot(dx, dy);
    // kapalı halkada ilk ve son nokta aynıdır: o zaman uzaklık o noktaya ölçülür
    const d = u ? Math.abs(dy * x - dx * y + b[0] * a[1] - b[1] * a[0]) / u : Math.hypot(x - a[0], y - a[1]);
    if (d > enUzak) { enUzak = d; i0 = i; }
  }
  return enUzak > tol ? [...sadelestir(n.slice(0, i0 + 1), tol).slice(0, -1), ...sadelestir(n.slice(i0), tol)] : [a, b];
};
const yollar = veri.geometry.coordinates
  .map((poligon) => sadelestir(poligon[0].map(xy), 0.9))
  .filter((n) => n.length > 3)
  .map((n) => `M${n.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`);

const nokta = (enlem, boylam) => xy([boylam, enlem]).map((v) => Math.round(v * 10) / 10);
fs.writeFileSync(path.join(kok, "src/harita.json"), JSON.stringify({
  en: EN, boy: BOY, yol: yollar.join(""),
  atolye: nokta(FIRMA.enlem, FIRMA.boylam),
  iller: ILLER.filter((il) => il.ad !== FIRMA.il).map((il) => ({ ad: il.ad, n: nokta(il.enlem, il.boylam) })),
}) + "\n");
console.log(`harita: ${yollar.length} parça, ${yollar.join("").length} karakter, ${EN}×${BOY}`);
