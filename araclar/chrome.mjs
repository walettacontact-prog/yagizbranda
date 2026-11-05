// Görünmez Chrome (DevTools bağlantısı): ekran karesi alma ve HTML'den görsel çizme için ortak yardımcı.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

export async function chromeAc() {
  const port = 9400 + Math.floor(Math.random() * 400);
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), "raws-chrome-"));
  const surec = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio", "--allow-file-access-from-files",
    `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, "about:blank"], { stdio: "ignore" });
  let hedef;
  for (let i = 0; i < 60 && !hedef; i++) {
    await bekle(150);
    try { hedef = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page"); } catch {}
  }
  const ws = new WebSocket(hedef.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let sira = 0; const bekleyen = new Map(); let olaylar = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && bekleyen.has(m.id)) { bekleyen.get(m.id)(m.result ?? {}); bekleyen.delete(m.id); } else if (m.method) olaylar.push(m.method);
  });
  const gonder = (method, params = {}) => new Promise((r) => { const id = ++sira; bekleyen.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
  await gonder("Page.enable");
  // Hareket azaltma: beliren öğeler baştan görünür, video yerine kapak karesi
  await gonder("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

  // betik: sayfa yüklenip kaydırıldıktan sonra çalıştırılan JS (ör. QR menüde dil seçmek, ürün penceresini açmak)
  const ac = async (adres, { en, boy, olcek = 2, mobil = false, kaydir = 0, sure = 1800, seffaf = false, betik = "" }) => {
    await gonder("Emulation.setDeviceMetricsOverride", { width: en, height: boy, deviceScaleFactor: olcek, mobile: mobil });
    await gonder("Emulation.setTouchEmulationEnabled", { enabled: mobil, maxTouchPoints: mobil ? 5 : 1 });
    await gonder("Emulation.setDefaultBackgroundColorOverride", seffaf ? { color: { r: 0, g: 0, b: 0, a: 0 } } : {});
    olaylar = [];
    await gonder("Page.navigate", { url: adres });
    for (let i = 0; i < 100 && !olaylar.includes("Page.loadEventFired"); i++) await bekle(100);
    await gonder("Runtime.evaluate", { awaitPromise: true, expression: `(async () => { await document.fonts.ready;
      await Promise.all([...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight * 1.5 + ${kaydir})
        .map((i) => i.complete ? 0 : new Promise((r) => { i.loading = "eager"; i.onload = i.onerror = r; setTimeout(r, 6000); })));
      scrollTo(0, ${kaydir}); return true; })()` });
    if (betik) await gonder("Runtime.evaluate", { awaitPromise: true, expression: `(async () => { ${betik}; return true; })()` });
    await bekle(sure);
  };
  return {
    // Bir adresin görünen alanını PNG olarak kaydeder
    async kare(adres, cikti, secenek) {
      await ac(adres, secenek);
      const g = await gonder("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(cikti, Buffer.from(g.data, "base64"));
    },
    // HTML'yi çizer (saydam zeminli olabilir), PNG verisini döndürür
    async ciz(html, { en, boy, olcek = 2, seffaf = false }) {
      const dosya = path.join(profil, `ciz-${Date.now()}.html`);
      fs.writeFileSync(dosya, html);
      await ac(`file://${dosya}`, { en, boy, olcek, seffaf, sure: 400 });
      const g = await gonder("Page.captureScreenshot", { format: "png" });
      return Buffer.from(g.data, "base64");
    },
    // Açık sayfada bir ifadeyi çalıştırıp sonucunu döndürür (ör. QR okuma denemesi)
    async degerlendir(ifade) {
      const r = await gonder("Runtime.evaluate", { expression: ifade, awaitPromise: true, returnByValue: true });
      return r.result?.value;
    },
    async kapat() {
      ws.close(); surec.kill(); await bekle(300);
      fs.rmSync(profil, { recursive: true, force: true });
    },
  };
}
