# Bitácora de Diseño y Registro de Estilos — Estudio RGM

Este documento resume los cambios realizados, las decisiones de diseño adoptadas, la paleta cromática y la arquitectura de archivos de estilo para el sitio web de **Estudio Rivas González Methol**.

---

## 1. Estructura y Respaldo de Archivos CSS

Para garantizar la seguridad del trabajo previo y permitir experimentar sin riesgo de pérdida:

| Archivo | Estado | Descripción |
| :--- | :--- | :--- |
| **`style.css`** | Preservado | Hoja de estilos de la versión anterior (tono cobrizo/marrón). |
| **`style.original.css`** | Respaldo inmutable | Copia de seguridad intacta del diseño original. |
| **`style-v2.css`** | **Activo** | Nuevo diseño: Verde Inglés señorial, Oro Imperial y Marfil Cálido. |
| **`index.html`** | Actualizado | Vinculado a `style-v2.css` (con favicon actualizado a verde y oro). |

> **Cómo alternar entre versiones:**  
> En la línea 17 de `index.html`, simplemente cambia:  
> - `<link rel="stylesheet" href="style-v2.css">` *(Nuevo estilo activo)*  
> - `<link rel="stylesheet" href="style.css">` *(Estilo anterior)*

---

## 2. Paleta Cromática Institucional (Estilo v2)

Inspirada en la identidad de firmas legales y contables de alta gama:

| Tono / Elemento | Código HEX | Aplicación |
| :--- | :--- | :--- |
| **Verde Inglés Base** | `#27532F` | Encabezado, subtítulos y botones secundarios. |
| **Verde Bosque Profundo** | `#1C3C22` | Títulos principales de sección (`h1`, `h2`, `h3`). |
| **Verde Nocturno / Ébano** | `#0C1A0F` | Fondo del pie de página (*footer*). |
| **Oro Champagne** | `#C5A059` | Filetes de fotos, marcos de tarjetas, borde de tipografía del header. |
| **Oro Brillante** | `#D4AF37` | Iniciales destacadas (**R**, **G**, **M**) y degradé de botón Hero. |
| **Fondo Marfil Cálido** | `#FAF8F5` | Fondo base del cuerpo del sitio (máxima legibilidad). |
| **Marfil Contraste** | `#F3EEE5` | Fondos de secciones alternas (`section-alt`). |

---

## 3. Decisiones de Diseño por Sección

1. **Encabezado (`header.site-header`)**:
   - Fondo en Verde Inglés traslúcido (`rgba(22, 48, 27, 0.94)`) con efecto vidrio (*backdrop blur*).
   - Moldura inferior en línea fina dorada (`#C5A059`).
   - **Tipografía con contorno fino dorado**: El texto de marca lleva `-webkit-text-stroke: 0.45px var(--color-secondary)` y suave resplandor dorado.
   - Botón CTA *"Contacto"* en degradé oro imperial metálico.

2. **Portada / Hero (`section.hero`)**:
   - Fondo en **Verde Inglés señorial** (`#142A19` a `#204727`) con elegante degradé radial continuo (sin entramado de rombos).
   - Iniciales (**R**, **G**, **M**) con gradiente de oro brillante.
   - Botón *"Consultá ahora"* con botón dorado de alto impacto.

3. **Servicios (`#servicios`), Nosotros (`#nosotros`) y Por qué elegirnos (`#elegirnos`)**:
   - Fondos en **marfil cálido** que permiten una lectura reposada y profesional.
   - Tarjetas de servicios con acentos superiores y bordes finos en oro al hacer *hover*.
   - Fotografía del equipo enmarcada con marco desplazado en oro noble.

4. **Contacto (`#contacto`)**:
   - Fondo en marfil cálido continuo.
   - Formulario en tarjeta blanca pulcra (`#FFFFFF`) con bordes dorados y campos con foco verde/oro.
   - Mapa de ubicación integrado con marco dorado fino.

5. **Pie de página (`footer.site-footer`)**:
   - Remate en **Verde Inglés ultra profundo** con moldura superior dorada y enlaces en oro champagne.

---

## 4. Opciones Alternativas Disponibles en el Código

En el archivo `style-v2.css` (sección Hero) se dejó documentada la alternativa:
- **Opción 1 (Activa)**: Fondo Verde Inglés + Entramado sutil de rombos monograma.
- **Opción 2 (Opcional)**: Degradé puro sin rombos (basta con descomentar la línea indicada en el CSS si se desea comparar).
