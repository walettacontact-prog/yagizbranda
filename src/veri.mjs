// Yağız Branda — sitenin bütün içeriği. İşletme bilgileri 5 Kasım 2026'da doğrulandı (Instagram @yagizbranda_tente,
// Google Haritalar kaydı, işletme sahibinin kullanıcıya verdiği bilgiler); uydurma bilgi, yorum ya da puan yok.
// Şehirler işletmenin kendi Instagram açıklamalarından ("… müşterimize hayırlı olsun"); kişi adları sitede yazılmaz.
// Metinler kısa tutulur (kullanıcı, 5 Kasım: "metin kalabalığı değil, kurumsal ve sade").

// Alan adı alınınca yalnızca bu satır değişir (ör. "https://yagizbranda.com"); bütün bağlantılar buradan üretilir.
export const ADRES = "https://walettacontact-prog.github.io/yagizbranda";
export const KOK = new URL(ADRES).pathname.replace(/\/$/, "");

export const FIRMA = {
  ad: "Yağız Branda",
  tamAd: "Yağız Branda Tente Sistemleri",
  slogan: "Kalite · Güven · Dayanıklılık", // Instagram profilindeki slogan
  tel: "+905325913457",
  telYazi: "0532 591 34 57",
  eposta: "yagizbranda@gmail.com",
  instagram: "https://www.instagram.com/yagizbranda_tente/",
  instagramAd: "@yagizbranda_tente",
  sokak: "Güney Mobilyacılar Sanayi Sitesi, 1282. Sk. No:36",
  ilce: "Erenler",
  il: "Sakarya",
  postaKodu: "54200",
  enlem: 40.741938,
  boylam: 30.410503,
  harita: "https://maps.google.com/?cid=4444806815474403940",
  yolTarifi: "https://www.google.com/maps/dir/?api=1&destination=40.741938%2C30.410503",
  saatYazi: "Pazartesi – Cumartesi 09:00 – 20:00",
  saatKisa: "Pzt–Cmt 09:00–20:00",
  kapali: "Pazar kapalı",
  wpMesaj: "Merhaba, aracım için tente / branda hakkında bilgi almak istiyorum.",
};

// Tek cümlelik tanım: arama motorları ve yapay zekâ asistanları işletmeyi bu cümleyle tanır (alt bilgi, şema, llms.txt)
export const TANIM = "Yağız Branda, Sakarya Erenler'de kamyonet kasa tentesi, kamyon ve TIR brandası, alüminyum kasa döşeme ve tente tamiri yapan bir atölyedir; Türkiye'nin her ilinden araç kabul eder.";

// Müşterilerin geldiği iller (Instagram'daki iş paylaşımlarından) ve haritadaki yerleri (paylaşımdaki ilçe ya da il merkezi)
export const ILLER = [
  { ad: "İstanbul", enlem: 41.01, boylam: 28.98 },
  { ad: "Ankara", enlem: 39.93, boylam: 32.86 },
  { ad: "Kocaeli", enlem: 40.77, boylam: 29.92 },
  { ad: "Bursa", enlem: 40.43, boylam: 29.72 },
  { ad: "Balıkesir", enlem: 40.35, boylam: 27.97 },
  { ad: "Zonguldak", enlem: 41.45, boylam: 31.79 },
  { ad: "Afyonkarahisar", enlem: 38.76, boylam: 30.54 },
  { ad: "Sakarya", enlem: 40.74, boylam: 30.41 },
];

// İş fotoğrafları (araclar/gorseller.mjs üretir: img/is/<ad>-<genişlik>.webp, 4:5). yer: Instagram açıklamasındaki şehir.
export const FOTOLAR = {
  "atolye-onu": { alt: "Erenler'deki Yağız Branda atölyesinin önünde kapalı kasa tenteli kamyonet" },
  "istanbul-kaynarca": { yer: "İstanbul · Kaynarca", alt: "İstanbul Kaynarca'dan gelen kamyonete yapılan açılır kanatlı kasa tentesi, kanatlar açık" },
  "acilir-kanat": { alt: "Kanatları açık, sarı açılır kanatlı Kia kamyonet kasa tentesi, arkadan görünüm" },
  "istanbul-pendik": { yer: "İstanbul · Pendik", alt: "İstanbul Pendik'ten gelen kamyonetin yük dolu kasasında açılır kanatlı tente" },
  "ankara": { yer: "Ankara", alt: "Ankara'dan gelen Hyundai H100'e yapılan kasa tentesi ve alüminyum kasa döşeme" },
  "bandirma": { yer: "Balıkesir · Bandırma", alt: "Bandırma'dan gelen Ford Transit kamyonete yapılan koyu renk kapalı kasa tentesi" },
  "zonguldak": { yer: "Zonguldak", alt: "Zonguldak'tan gelen Ford Transit kamyonete yapılan açılır kanatlı kasa tentesi" },
  "afyon": { yer: "Afyonkarahisar", alt: "Afyon'dan gelen kamyonete yapılan beyaz kapalı kasa tentesi" },
  "izmit": { yer: "Kocaeli · İzmit", alt: "İzmit'ten gelen kamyonete yapılan beyaz kapalı kasa tentesi" },
  "iznik": { yer: "Bursa · İznik", alt: "İznik'ten gelen kamyonete yapılan sarı açılır kanatlı kasa tentesi" },
  "karacabey": { yer: "Bursa · Karacabey", alt: "Karacabey'den gelen kamyonete yapılan açılır kanatlı kasa tentesi" },
  "serdivan": { yer: "Sakarya · Serdivan", alt: "Serdivan'dan gelen kamyonete yapılan beyaz kasa tentesi, Yağız Branda atölyesi önünde" },
  "istanbul": { yer: "İstanbul", alt: "İstanbul'dan gelen kamyonete yapılan siyah kapalı kasa tentesi" },
  "istanbul-kaynarca-mavi": { yer: "İstanbul · Kaynarca", alt: "İstanbul Kaynarca'dan gelen kamyonete yapılan mavi üstlü, sarı kanatlı kasa tentesi" },
  "ford-koyu": { alt: "Ford Transit kamyonete yapılan koyu renk kasa tentesi, Yağız Branda atölyesi önünde" },
  "gece": { alt: "Gece atölye önünde mavi kasa tenteli turuncu kamyonet" },
  "branda-yakin": { alt: "Yağız Branda'nın yaptığı siyah kasa brandası, yakından" },
};

// Ana sayfadaki "İşlerimizden" (şehirli kareler) ve kasa tentesi sayfasındaki kareler
export const GALERI = ["istanbul-pendik", "ankara", "bandirma", "zonguldak", "izmit", "iznik", "afyon", "serdivan"];
export const GALERI_KASA = ["acilir-kanat", "karacabey", "istanbul", "istanbul-kaynarca-mavi"];

export const HIZMETLER = [
  {
    slug: "kamyonet-kasa-tentesi",
    menu: "Kasa tentesi",
    ad: "Kamyonet kasa tentesi",
    kisa: "Açılır kanatlı, kavisli, kapalı kutu",
    baslik: "Kamyonet Kasa Tentesi İmalatı ve Montajı | Yağız Branda",
    aciklama: "Kamyonet kasasına ölçüye özel tente: açılır kanatlı, kavisli ve kapalı kutu. Sakarya Erenler'de imalat ve montaj; her ilden araç kabul ediyoruz.",
    h1: "Kamyonet kasa tentesi",
    giris: "Kasanızı ölçer, tenteyi ona göre üretir ve atölyemizde aracınıza monte ederiz.",
    gorsel: "istanbul-kaynarca",
    maddeler: [
      ["Açılır kanatlı", "Kanatlar kalkar, yükleme kolaylaşır."],
      ["Kavisli (kubbeli)", "Kavisli üst, su birikmeden akar."],
      ["Kapalı kutu", "Kasa dört taraftan kapanır."],
      ["Ölçüye özel", "Standart kalıp yok; her kasaya ayrı."],
    ],
    araclar: ["Hyundai H100", "Kia Bongo", "Kia K2500", "Ford Transit", "Iveco", "Mitsubishi Canter"],
    sss: [
      ["Hangi tente tipini seçmeliyim?", "Sık yükleme yapıyorsanız açılır kanatlı, yükü tamamen kapatmak istiyorsanız kapalı kutu uygundur. Aracınızı yazın, birlikte seçelim."],
      ["Aracımı atölyeye getirmem gerekiyor mu?", "Evet. Ölçü, imalat ve montaj Erenler'deki atölyemizde yapılır."],
      ["Tente ne kadar sürede hazır olur?", "İşin tipine göre değişir; net süreyi aracınızı gördükten sonra söyleriz."],
    ],
  },
  {
    slug: "kamyon-tir-brandasi",
    menu: "Kamyon & TIR",
    ad: "Kamyon ve TIR brandası",
    kisa: "Kasa ve dorse brandası",
    baslik: "Kamyon ve TIR Brandası İmalatı | Yağız Branda Sakarya",
    aciklama: "Kamyon kasası ve TIR dorsesi için ölçüye özel branda: imalat, değişim ve tamir. Sakarya Erenler'deki atölyemiz; Türkiye'nin her ilinden araç geliyor.",
    h1: "Kamyon ve TIR brandası",
    giris: "Kamyon kasası ve TIR dorsesi için ölçüye özel branda üretir, eskiyen brandayı yeniler ya da tamir ederiz.",
    gorsel: "branda-yakin",
    maddeler: [
      ["Ölçüye özel branda", "Kasa ya da dorse ölçülerek dikilir."],
      ["Branda değişimi", "Eskiyen brandanın yerine yenisi."],
      ["Tamir", "Yırtık ve sökük dikişler onarılır."],
    ],
    sss: [
      ["Fiyat nasıl belirlenir?", "Aracın ölçüsüne ve yapılacak işe göre değişir. Aracınızın bilgilerini WhatsApp'tan yazın, bilgi verelim."],
      ["Eski brandamı tamir ettirebilir miyim?", "Evet. Brandayı görünce tamirin mi yenilemenin mi uygun olduğunu söyleriz."],
    ],
  },
  {
    slug: "aluminyum-kasa-doseme",
    menu: "Alüminyum döşeme",
    ad: "Alüminyum kasa döşeme",
    kisa: "Kasa tabanına alüminyum",
    baslik: "Alüminyum Kasa Döşeme | Kamyonet Kasası – Yağız Branda",
    aciklama: "Kamyonet kasa tabanına alüminyum döşeme: paslanmaz, kolay temizlenir. Tenteyle birlikte aynı seferde yapılabilir. Yağız Branda, Erenler / Sakarya.",
    h1: "Alüminyum kasa döşeme",
    giris: "Kamyonet kasasının tabanını alüminyumla döşeriz; tenteyle birlikte aynı seferde yapılabilir.",
    gorsel: "ankara",
    maddeler: [
      ["Paslanmaz", "Alüminyum paslanmaz, tabanı korur."],
      ["Kolay temizlik", "Düz yüzey kolayca yıkanır."],
      ["Tenteyle birlikte", "Aracınız atölyeye bir kez gelir."],
    ],
    sss: [
      ["Döşemeyi tente olmadan da yaptırabilir miyim?", "Aracınızı ve kasanızı WhatsApp'tan yazın; yapılacak işi ve fiyatı konuşalım."],
      ["Hangi araçlara yapılıyor?", "Kamyonet kasalarına yapılır. Aracınızın modelini yazın, uygun olup olmadığını söyleyelim."],
    ],
  },
  {
    slug: "tente-tamiri",
    menu: "Tamir",
    ad: "Tente tamiri ve yenileme",
    kisa: "Tamir ve komple yenileme",
    baslik: "Kamyonet Tente Tamiri ve Yenileme | Yağız Branda Sakarya",
    aciklama: "Yırtılan, dikişi sökülen ya da eskiyen kamyonet tentesinin ve brandanın tamiri; gerekirse ölçüye özel yenisi. Erenler / Sakarya atölyesi.",
    h1: "Tente tamiri ve yenileme",
    giris: "Yırtılan ya da eskiyen tenteyi onarır, gerekirse kasanın ölçüsüne göre yenisini yaparız.",
    gorsel: "ford-koyu",
    maddeler: [
      ["Yırtık ve dikiş", "Kumaş ve dikişler onarılır."],
      ["Komple yenileme", "Ölçüye özel yeni tente takılır."],
      ["Açık söz", "Tamir mi yenileme mi, aracı görünce söyleriz."],
    ],
    sss: [
      ["Başka yerde yapılmış tenteyi tamir ediyor musunuz?", "Tenteyi görmemiz gerekir. Fotoğrafını WhatsApp'tan gönderin ya da aracınızla atölyeye gelin."],
      ["Tamir mi yenileme mi daha uygun?", "Kumaşın ve iskeletin durumuna bağlıdır. Aracı görünce ikisinin farkını ve fiyatını söyleriz."],
    ],
  },
];

export const SUREC = ["WhatsApp'tan yazın", "Aracınızı atölyeye getirin", "Tenteli teslim alın"];

export const SSS = [
  ["Başka şehirden gelebilir miyim?", "Evet. İstanbul, Ankara, Kocaeli, Bursa, Balıkesir, Zonguldak ve Afyon'dan müşterilerimiz araçlarını Erenler'deki atölyemize getiriyor. Gelmeden önce WhatsApp'tan yazın, gün belirleyelim."],
  ["Aracımı getirmem gerekiyor mu?", "Evet. Tente kasanın ölçüsüne göre yapıldığı için ölçü, imalat ve montaj atölyemizde yapılır."],
  ["Hangi tente tipleri var?", "Açılır kanatlı, kavisli (kubbeli) ve kapalı kutu kasa tentesi. Kamyon ve TIR brandası, alüminyum kasa döşeme ve tente tamiri de yapılır."],
  ["Hangi araçlara tente yapıyorsunuz?", "Hyundai H100, Kia Bongo, Kia K2500, Ford Transit, Iveco, Mitsubishi Canter ve benzeri kamyonet, pikap ve kamyonlara."],
  ["Fiyat ne kadar?", "Aracın kasa ölçüsüne ve tente tipine göre değişir. Aracınızın modelini WhatsApp'tan yazın, bilgi verelim."],
];
