#!/usr/bin/env python3
"""Yağız Branda — OG görseli (1200x630) ve apple-touch-icon (180x180) üretir."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))

NAVY   = (11, 22, 34)
NAVY2  = (18, 33, 51)
ACCENT = (247, 196, 0)
ACCENT2= (255, 216, 77)
WHITE  = (255, 255, 255)
MUTED  = (176, 196, 216)


def load_font(size, bold=True):
    candidates = [
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def vgradient(w, h, top, bottom):
    base = Image.new("RGB", (w, h), top)
    draw = ImageDraw.Draw(base)
    for y in range(h):
        t = y / max(1, h - 1)
        col = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        draw.line([(0, y), (w, y)], fill=col)
    return base


def car_icon(draw, cx, cy, scale, color):
    """Branda örtülü araç silüeti (yuvarlak kubbe + lastik etek)."""
    w = 150 * scale
    h = 72 * scale
    # branda kubbesi
    dome = [
        (cx - w/2, cy + h/2),
        (cx - w/2 + 18*scale, cy - h/6),
        (cx - w/4, cy - h/2),
        (cx + w/4, cy - h/2),
        (cx + w/2 - 18*scale, cy - h/6),
        (cx + w/2, cy + h/2),
    ]
    draw.polygon(dome, fill=color)
    # alt etek çizgisi
    draw.rounded_rectangle(
        [cx - w/2, cy + h/2 - 7*scale, cx + w/2, cy + h/2 + 4*scale],
        radius=4*scale, fill=color)


def logo_mark(draw, cx, by, r, color, lw):
    """Favicon ile aynı: kubbe (üst yarım daire) + taban çizgisi."""
    draw.arc([cx - r, by - r, cx + r, by + r], 180, 360, fill=color, width=lw)
    draw.line([cx - r * 1.18, by, cx + r * 1.18, by], fill=color, width=lw)


def soft_glow(img, box, color, blur=120):
    """Yumuşak ışık lekesi (gaussian blur)."""
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(box, fill=color)
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def make_og():
    W, H = 1200, 630
    img = vgradient(W, H, (17, 32, 50), NAVY)

    # yumuşak turuncu + yeşil ışık lekeleri
    img = soft_glow(img, [880, -120, 1320, 320], (247, 196, 0, 120), blur=130)
    img = soft_glow(img, [-160, 380, 240, 760], (37, 211, 102, 60), blur=130)

    draw = ImageDraw.Draw(img, "RGBA")

    # ince ızgara dokusu (üst sağ)
    for gx in range(640, W, 46):
        draw.line([(gx, 0), (gx, 300)], fill=(255, 255, 255, 10), width=1)
    for gy in range(0, 300, 46):
        draw.line([(640, gy), (W, gy)], fill=(255, 255, 255, 10), width=1)

    # büyük dekoratif branda-araç silüeti (sağ alt)
    car_icon(draw, 985, 500, 2.7, (247, 196, 0, 235))
    car_icon(draw, 985, 500, 2.7, (255, 255, 255, 0))  # no-op guard

    # sol turuncu şerit
    draw.rectangle([0, 0, 14, H], fill=ACCENT)

    # logo rozeti
    draw.rounded_rectangle([80, 68, 158, 146], radius=20, fill=ACCENT)
    logo_mark(draw, 119, 128, 26, NAVY, 6)

    f_brand = load_font(40)
    draw.text((178, 74), "YAĞIZ BRANDA", font=f_brand, fill=WHITE)
    f_brand2 = load_font(23)
    draw.text((180, 121), "TENTE SİSTEMLERİ", font=f_brand2, fill=ACCENT2)

    # başlık
    f_h1 = load_font(70)
    draw.text((80, 228), "Kamyonet Kasa Tentesi", font=f_h1, fill=WHITE)
    draw.text((80, 312), "Ölçüye Özel ·", font=f_h1, fill=WHITE)
    bbox = draw.textbbox((80, 312), "Ölçüye Özel ·", font=f_h1)
    draw.text((bbox[2] + 18, 312), "Su Geçirmez", font=f_h1, fill=ACCENT2)

    # alt açıklama
    f_p = load_font(28, bold=False)
    draw.text((80, 424), "Açılır kanatlı · Kavisli · Kapalı kutu · Yerinde montaj",
              font=f_p, fill=MUTED)

    # WhatsApp rozeti
    draw.rounded_rectangle([80, 498, 474, 566], radius=34, fill=(37, 211, 102))
    f_btn = load_font(28)
    draw.text((114, 517), "WhatsApp'tan Bilgi Al", font=f_btn, fill=WHITE)

    img.save(os.path.join(HERE, "og-image.jpg"), "JPEG", quality=88, optimize=True)
    print("og-image.jpg yazıldı")


def make_apple_icon():
    S = 180
    img = Image.new("RGB", (S, S), ACCENT)
    draw = ImageDraw.Draw(img)
    logo_mark(draw, 90, 116, 44, NAVY, 10)
    img.save(os.path.join(HERE, "apple-touch-icon.png"), "PNG", optimize=True)
    print("apple-touch-icon.png yazıldı")


if __name__ == "__main__":
    make_og()
    make_apple_icon()
