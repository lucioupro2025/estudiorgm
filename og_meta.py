"""
Inserta el bloque de vista previa al compartir (Open Graph / Twitter Card) en
las cuatro paginas del sitio, justo antes del </head>.

Es idempotente: si el bloque ya esta (esta comment) no lo vuelve a insertar.
Para ejecutarlo de nuevo, borra el bloque a mano o el comment que lo marca.

Uso:  python og_meta.py
"""

import os
import io
import re

BASE = os.path.dirname(os.path.abspath(__file__))
SITIO = "Rivas González Methol"
IMAGEN = "https://estudiorgm.com.ar/og-image.png"
ALT = "Rivas González Methol — Estudio Contable, Jurídico y Previsional"
MARCA = "<!-- Vista previa al compartir (Open Graph / Twitter Card) -->"

PAGINAS = {
    "index.html": {
        "titulo": "Rivas González Methol — Estudio Contable, Jurídico y Previsional",
        "desc": "Estudio Contable, Jurídico y Previsional en Villa Mercedes, San Luis. Servicios de impuestos, "
                "contabilidad, derecho previsional y consultoría legal. +15 años de experiencia.",
        "url": "https://estudiorgm.com.ar/",
    },
    "contacto.html": {
        "titulo": "Contacto — Rivas González Methol",
        "desc": "Escribinos o visitanos en Balcarce 744, Villa Mercedes, San Luis. "
                "Atención de lunes a viernes de 08:00 a 14:00 hs.",
        "url": "https://estudiorgm.com.ar/contacto.html",
    },
    "equipo.html": {
        "titulo": "Nuestro equipo — Rivas González Methol",
        "desc": "Los socios, asociados y consultores de Rivas González Methol: contadores, abogados y asesores "
                "previsionales de Villa Mercedes, San Luis.",
        "url": "https://estudiorgm.com.ar/equipo.html",
    },
    "privacidad.html": {
        "titulo": "Aviso de privacidad — Rivas González Methol",
        "desc": "Aviso de privacidad de Estudio Rivas González Methol conforme a la Ley 25.326 de "
                "Protección de Datos Personales.",
        "url": "https://estudiorgm.com.ar/privacidad.html",
    },
}


def esc(texto):
    return texto.replace("&", "&amp;").replace('"', "&quot;")


def bloque(d):
    lineas = [
        MARCA,
        f'  <link rel="canonical" href="{d["url"]}" />',
        '  <meta property="og:type" content="website" />',
        f'  <meta property="og:site_name" content="{esc(SITIO)}" />',
        '  <meta property="og:locale" content="es_AR" />',
        f'  <meta property="og:title" content="{esc(d["titulo"])}" />',
        f'  <meta property="og:description" content="{esc(d["desc"])}" />',
        f'  <meta property="og:url" content="{d["url"]}" />',
        f'  <meta property="og:image" content="{IMAGEN}" />',
        f'  <meta property="og:image:secure_url" content="{IMAGEN}" />',
        '  <meta property="og:image:type" content="image/png" />',
        '  <meta property="og:image:width" content="1200" />',
        '  <meta property="og:image:height" content="630" />',
        f'  <meta property="og:image:alt" content="{esc(ALT)}" />',
        '  <meta name="twitter:card" content="summary_large_image" />',
        f'  <meta name="twitter:title" content="{esc(d["titulo"])}" />',
        f'  <meta name="twitter:description" content="{esc(d["desc"])}" />',
        f'  <meta name="twitter:image" content="{IMAGEN}" />',
        f'  <meta name="twitter:image:alt" content="{esc(ALT)}" />',
    ]
    return "\n  ".join(lineas)


def main():
    for nombre, datos in PAGINAS.items():
        ruta = os.path.join(BASE, nombre)
        with io.open(ruta, "r", encoding="utf-8", newline="") as f:
            html = f.read()

        if MARCA in html:
            print(f"{nombre:18} ya tenia el bloque, no se toco")
            continue

        nuevo, n = re.subn(r"</head>", "  " + bloque(datos) + "\n</head>", html, count=1)
        if n != 1:
            print(f"{nombre:18} NO se encontro </head>")
            continue

        with io.open(ruta, "w", encoding="utf-8", newline="") as f:
            f.write(nuevo)
        print(f"{nombre:18} bloque insertado ({len(bloque(datos).splitlines())} lineas)")


if __name__ == "__main__":
    main()