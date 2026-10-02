"""
Genera las imagenes para la vista previa al compartir (Open Graph / Twitter Card).

Los .webp del sitio no los renderizan WhatsApp, Facebook ni Viber, asi que la
tarjeta necesita un PNG de 1200x630. Se generan dos variantes con el isotipo de
la identidad corporativa:

    og-image.png        isotipo oscuro sobre fondo crema (por defecto)
    og-image-dark.png   isotipo dorado sobre fondo oscuro

Uso:  python og_image.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
W, H = 1200, 630

ISOTIPO_OSCURO = os.path.join(BASE, "isotipo-2-removebg-preview.png")
ISOTIPO_DORADO = os.path.join(BASE, "isotipo-dorado-removebg-preview.png")

CREMA = (251, 249, 245)
OSCURO = (48, 49, 46)
DORADO = (201, 164, 87)
TEXTO_CLARO = (78, 69, 60)
TEXTO_SOBRE_OSCURO = (242, 240, 237)

DOMINIO = "estudiorgm.com.ar"
FUENTE_SANS = os.path.join(os.environ.get("WINDIR", r"C:\Windows"), "Fonts", "seguisb.ttf")


def isotipo(recorte, ancho):
    """Corta el PNG transparente a su contenido real y lo escala al ancho pedido."""
    im = Image.open(recorte).convert("RGBA")
    im = im.crop(im.split()[3].getbbox())
    alto = round(im.height * ancho / im.width)
    return im.resize((ancho, alto), Image.LANCZOS)


def centered(draw, y, texto, fuente, color):
    """Escribe texto centrado horizontalmente en la y dada."""
    ancho = draw.textlength(texto, font=fuente)
    draw.text(((W - ancho) / 2, y), texto, font=fuente, fill=color)


def tarjeta(fondo, recorte, texto_color, salida):
    lienzo = Image.new("RGB", (W, H), fondo)
    draw = ImageDraw.Draw(lienzo)

    # Filete doble dorado: el marco de la identidad corporativa
    pad = 34
    draw.rectangle([pad, pad, W - pad, H - pad], outline=DORADO, width=2)
    inner = pad + 12
    draw.rectangle([inner, inner, W - inner, H - inner], outline=DORADO, width=1)

    logo = isotipo(recorte, 268)
    logo_x = (W - logo.width) // 2
    logo_y = 128
    lienzo.paste(logo, (logo_x, logo_y), logo)

    # Regla dorada bajo el isotipo
    rule_w, rule_h = 72, 3
    rule_x = (W - rule_w) // 2
    rule_y = logo_y + logo.height + 54
    draw.rectangle([rule_x, rule_y, rule_x + rule_w, rule_y + rule_h], fill=DORADO)

    fuente = ImageFont.truetype(FUENTE_SANS, 34)
    centered(draw, rule_y + 40, DOMINIO, fuente, texto_color)

    ruta = os.path.join(BASE, salida)
    lienzo.save(ruta, "PNG", optimize=True)
    print(f"{salida:20} {os.path.getsize(ruta) / 1024:6.1f} KB")


if __name__ == "__main__":
    tarjeta(CREMA, ISOTIPO_OSCURO, TEXTO_CLARO, "og-image.png")
    tarjeta(OSCURO, ISOTIPO_DORADO, TEXTO_SOBRE_OSCURO, "og-image-dark.png")