# -*- coding: utf-8 -*-
"""
Génère les bannières de couverture PixForge aux dimensions exactes
demandées par LinkedIn et Facebook.

Le monogramme est redessiné (et non redimensionné) à partir de la même
géométrie que scripts/generate-logo.cjs, avec suréchantillonnage 4x.

    python scripts/generate-social.py public/brand/social
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

# Dégradé de marque, identique au logo.
GRADIENT_FROM = (0x1E, 0x8B, 0xFF)
GRADIENT_TO = (0x00, 0x59, 0xCC)

FONT_DIR = r"C:\Windows\Fonts"
FONT_BOLD = os.path.join(FONT_DIR, "segoeuib.ttf")
FONT_REGULAR = os.path.join(FONT_DIR, "segoeui.ttf")

SS = 4  # suréchantillonnage

# Proportions du glyphe, reprises du générateur de logo (canevas 1024).
G_HEIGHT = 576.0
G_WIDTH = 358.0
G_STEM = 104.0
G_AX_OUT = 254.0
G_AY_OUT = 179.0
G_COUNTER_R = 75.0


def mark_mask(height):
    """Masque alpha du « P », dessiné à la hauteur demandée."""
    s = height * SS / G_HEIGHT
    w = int(round(G_WIDTH * s))
    h = int(round(G_HEIGHT * s))

    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)

    cx_out = G_STEM * s
    cy = G_AY_OUT * s
    ax = G_AX_OUT * s
    ay = G_AY_OUT * s

    # Panse : moitié droite de l'ellipse extérieure uniquement.
    bowl = Image.new("L", (w, h), 0)
    ImageDraw.Draw(bowl).ellipse([cx_out - ax, cy - ay, cx_out + ax, cy + ay], fill=255)
    right = bowl.crop((int(cx_out), 0, w, h))
    mask.paste(255, (int(cx_out), 0), right)

    # Contreforme ronde, évidée.
    cx_in = (G_STEM + G_COUNTER_R) * s
    r = G_COUNTER_R * s
    draw.ellipse([cx_in - r, cy - r, cx_in + r, cy + r], fill=0)

    # Hampe, posée en dernier : elle borde la contreforme à gauche.
    draw.rectangle([0, 0, G_STEM * s, G_HEIGHT * s], fill=255)

    return mask.resize(
        (max(1, w // SS), max(1, h // SS)), Image.LANCZOS
    )


def gradient(width, height):
    """Dégradé diagonal, calculé en petit puis étiré (rendu identique, bien plus rapide)."""
    small = Image.new("RGB", (64, 64))
    pixels = []
    for y in range(64):
        for x in range(64):
            t = (x / 63.0) * 0.45 + (y / 63.0) * 0.55
            pixels.append(
                tuple(
                    int(round(GRADIENT_FROM[c] + (GRADIENT_TO[c] - GRADIENT_FROM[c]) * t))
                    for c in range(3)
                )
            )
    small.putdata(pixels)
    return small.resize((width, height), Image.BICUBIC)


def text_size(draw, text, font):
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def draw_ink(draw, text, font, fill, top, center_x=None, left=None):
    """
    Dessine un texte en calant le haut de l'encre sur `top`.

    Pillow positionne le texte sur l'ascendante de la police, qui laisse un
    blanc variable au-dessus des capitales : les empilements paraissent alors
    mal espacés. On compense avec les décalages de la boîte d'encre.
    """
    box = draw.textbbox((0, 0), text, font=font)
    width = box[2] - box[0]
    height = box[3] - box[1]
    x = (center_x - width // 2) if center_x is not None else left
    draw.text((x - box[0], top - box[1]), text, font=font, fill=fill)
    return width, height


def cover_linkedin(path, width=4200, height=700):
    """
    Bandeau LinkedIn. Taille recommandée par l'aide LinkedIn : 4200x700.

    La mise en page est décrite à l'échelle historique (191 px de haut) puis
    multipliée : changer `height` suffit pour sortir une autre définition.
    """
    s = height / 191.0
    image = gradient(width, height)
    draw = ImageDraw.Draw(image)

    px = lambda value: max(1, int(round(value * s)))

    title_font = ImageFont.truetype(FONT_BOLD, px(46))
    tag_font = ImageFont.truetype(FONT_REGULAR, px(21))

    title = "PixForge"
    tagline = "Studio de développement web · Sites, applications métier et API sur mesure"

    mark = mark_mask(px(88))
    gap = px(28)
    line_gap = px(14)

    title_w, title_h = text_size(draw, title, title_font)
    tag_w, tag_h = text_size(draw, tagline, tag_font)
    text_w = max(title_w, tag_w)
    block_h = title_h + line_gap + tag_h

    x = (width - (mark.width + gap + text_w)) // 2
    image.paste((255, 255, 255), (x, (height - mark.height) // 2), mark)

    text_x = x + mark.width + gap
    top = (height - block_h) // 2

    draw_ink(draw, title, title_font, (255, 255, 255), top, left=text_x)
    draw_ink(draw, tagline, tag_font, (229, 240, 255), top + title_h + line_gap, left=text_x)

    image.save(path, "PNG")
    return width, height


def cover_facebook(path, width=1702, height=630):
    """
    Couverture Facebook : le double de la taille officielle (851x315), pour
    les écrans à haute densité. Affichage réel ~820x312 sur ordinateur, recadré
    à ~640x360 sur mobile : tout le contenu reste donc dans la zone centrale,
    et à l'écart du coin bas-gauche que recouvre la photo de profil.
    """
    s = height / 624.0
    image = gradient(width, height)
    draw = ImageDraw.Draw(image)

    px = lambda value: max(1, int(round(value * s)))

    title_font = ImageFont.truetype(FONT_BOLD, px(96))
    tag_font = ImageFont.truetype(FONT_REGULAR, px(40))
    services_font = ImageFont.truetype(FONT_REGULAR, px(29))

    title = "PixForge"
    tagline = "Studio de développement web"
    services = "Sites web · Applications métier · API · Maintenance"

    mark = mark_mask(px(164))
    _, title_h = text_size(draw, title, title_font)
    _, tag_h = text_size(draw, tagline, tag_font)
    _, srv_h = text_size(draw, services, services_font)

    gaps = (px(44), px(24), px(18))
    block_h = mark.height + gaps[0] + title_h + gaps[1] + tag_h + gaps[2] + srv_h
    y = (height - block_h) // 2
    center = width // 2

    image.paste((255, 255, 255), ((width - mark.width) // 2, y), mark)
    y += mark.height + gaps[0]

    draw_ink(draw, title, title_font, (255, 255, 255), y, center_x=center)
    y += title_h + gaps[1]

    draw_ink(draw, tagline, tag_font, (232, 241, 255), y, center_x=center)
    y += tag_h + gaps[2]

    draw_ink(draw, services, services_font, (198, 220, 252), y, center_x=center)

    image.save(path, "PNG")
    return width, height


def main():
    out_dir = sys.argv[1] if len(sys.argv) > 1 else "public/brand/social"
    os.makedirs(out_dir, exist_ok=True)

    targets = [
        ("linkedin-couverture-4200x700.png", cover_linkedin),
        ("facebook-couverture-1702x630.png", cover_facebook),
    ]

    for name, builder in targets:
        path = os.path.join(out_dir, name)
        w, h = builder(path)
        size_ko = os.path.getsize(path) / 1024
        print("%s — %dx%d, %.1f Ko" % (name, w, h, size_ko))


if __name__ == "__main__":
    main()
