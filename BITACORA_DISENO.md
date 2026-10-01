# Bitácora de Diseño y Registro de Estilos — Estudio RGM

Registro de decisiones de diseño, tokens y cambios aplicados al sitio de **Estudio Rivas González Methol**
(Villa Mercedes, San Luis).

> **Última actualización:** sesión de migración a Tailwind compilado (fin del CDN), unificación de las 4 páginas a
> la paleta actual y corrección de `rounded-full`. Ver §7 *Registro de cambios*.

---

## 1. Arquitectura y dependencias de estilo

El sitio usa **Tailwind compilado a CSS estático**. No hay CDN ni hojas de estilo externas de terceros: el HTML solo
enlaza `dist/app.css`, que se genera desde `src/input.css` + `tailwind.config.js`.

| Archivo | Estado | Descripción |
| :--- | :--- | :--- |
| `index.html` | **Activo** | Home. Enlaza `dist/app.css`. Incluye el scrollspy y el reveal. |
| `contacto.html` / `equipo.html` | Activos | Paleta actual, misma config compartida. |
| `privacidad.html` | Activo | Migrado desde `style-v2.css` a Tailwind. Header y footer unificados. |
| `tailwind.config.js` | **Fuente única de verdad** | Tokens de diseño. Consumido en build, no en runtime. |
| `src/input.css` | **Entrada del build** | Directivas Tailwind + clases propias en la capa `components`. |
| `dist/app.css` | **Activo, versionado** | CSS compilado y minificado (~45 KB). |
| `package.json` | Activo | `npm install` + `npm run build`. |
| `style-v2.css` | **Eliminado** | Diseño anterior (verde inglés / oro / marfil). Sin referencias desde la migración. |
| `style.css` | **Eliminado** | Diseño previo (tono cobrizo/marrón). |
| `style.original.css` | **Eliminado** | Copia de seguridad. |
| `main.js` | **Eliminado** | JS de la versión anterior; rompía con selectores nulos. |
| `index.original.html` | Respaldo (gitignored) | HTML previo al rediseño. Excluido del escaneo de Tailwind. Rompió al borrar `style-v2.css` y `main.js`. |

**Flujo de build:**

```
tailwind.config.js  ┐
src/input.css       ├─→  npm run build  →  dist/app.css  →  <link> en las 4 páginas
*.html (content)    ┘
```

**Comandos:**

```bash
npm install          # instala tailwindcss
npm run build        # build minificado (para publicar)
npm run build:dev    # build sin minificar (para depurar)
npm run watch        # recompila al guardar
```

**Puntos de entrada de estilo por página:**

1. Google Fonts: `Playfair Display` (400–900) + `Plus Jakarta Sans` (300–800) + `Material Symbols Outlined`.
2. `<link rel="stylesheet" href="dist/app.css" />`.

`dist/app.css` **se versiona a propósito**: es un sitio estático sin CI, así que el build no corre solo al publicar.

### Orden de cascada (importante)

Las clases propias viven dentro de `@layer components` en `src/input.css`, que Tailwind emite **antes** que
`utilities`. Así una utilidad del HTML siempre gana el empate de especificidad:

| Capa | Rango en `dist/app.css` | Contenido |
| :--- | :--- | :--- |
| `base` | 0 – 4.7 KB | Preflight + resets. |
| `components` | 5.0 – 7.8 KB | `.card-interactive`, `.btn-shimmer`, `.gold-initial`, `.reveal-on-scroll`, `.stagger-*`, … |
| `utilities` | 8.3 KB – fin | Todo lo que se escribe en el HTML. |

Esto replica el criterio del CDN anterior, donde el `<style>` inline precedía a las utilidades inyectadas.
**No mover las reglas propias fuera de `@layer components`.**

Por conflicto de especificidad, 8 tarjetas de `index.html` combinan `.card-interactive` con una utilidad
`hover:shadow-*`: **gana la utilidad**, igual que antes de la migración.

> ⚠️ Al agregar un token hay que **duplicarlo en cada HTML**, porque la config no está externalizada.

---

## 2. Paleta activa

### 2.1 Tokens base (derivados de un esquema Material warm-toned)

| Rol | HEX | Uso observado |
| :--- | :--- | :--- |
| `background` / `surface` / `surface-bright` | `#fbf9f5` | Fondo del `<body>` y superficies base (marfil cálido). |
| `surface-container-low` | `#f5f3ef` | Fondos secundarios, hover suave de tarjetas. |
| `surface-container` | `#efeeea` | Hero, botón secundario del hero, botón del menú móvil. |
| `surface-container-high` | `#eae8e4` | Hovers y capas de relieve. |
| `surface-container-highest` / `surface-variant` | `#e4e2de` | Capas de máxima elevación. |
| `surface-dim` | `#dbdad6` | Superficies atenuadas. |
| `surface-container-lowest` | `#ffffff` | Tarjetas de equipo, tarjetas blancas. |
| `on-surface` | `#1b1c1a` | Texto principal. |
| `on-surface-variant` | `#4e453c` | Texto secundario / bajadas. |
| `outline-variant` | `#d1c4b9` | Bordes y filetes finos. |
| `outline` | `#7f756b` | Bordes por defecto. |
| `inverse-surface` | `#30312e` | Botones oscuros (p. ej. "Agendar Consulta"). |
| `inverse-on-surface` | `#f2f0ed` | Texto sobre `inverse-surface`. |
| **`primary`** | `#6f583c` | **Café de marca.** Kickers, subtítulos de tarjeta, iconos, hover de enlaces. |
| `surface-tint` | `#715a3e` | Tinte de superficie. |
| `primary-container` | `#897052` | Contenedor primario. |
| `primary-fixed` / `primary-fixed-dim` | `#fdddb9` / `#e0c29f` | Acentos cálidos (antes usados como rellenos rosados). |
| `tertiary` / `tertiary-container` | `#6d593f` / `#877156` | Acentos terciarios. |
| `tertiary-fixed` / `tertiary-fixed-dim` | `#fadebe` / `#ddc2a3` | Fondos cálidos suaves. |
| `secondary` / `secondary-container` | `#5a5f67` / `#dee2ec` | Neutros fríos, uso puntual. |
| `error` | `#ba1a1a` | Errores de formulario. |

### 2.2 Tokens de acción (agregados en esta sesión)

| Token | HEX | Uso |
| :--- | :--- | :--- |
| **`cta`** | `#9B933B` | **Verde oliva.** Fondo de CTAs primarios, badge de nav activo, rellenos decorativos. |
| **`cta-hover`** | `#847D32` | Estado hover de CTAs. |

**Regla de contraste asociada:** sobre `cta` / `cta-hover` el texto es **oscuro** (`#1b1c1a`), nunca blanco.

| Combinación | Ratio | Normativa |
| :--- | :--- | :--- |
| `#1b1c1a` sobre `#9B933B` | **5.4:1** | AA (texto normal) ✔ |
| Blanco sobre `#9B933B` | 3.17:1 | ✘ falla AA |

### 2.3 Paleta dorada del H1 (no es token, es gradiente en línea)

| Elemento | Valor |
| :--- | :--- |
| Gradiente del `h1` completo | `linear-gradient(225deg, #dfba73 0%, #c5a059 50%, #9f7b37 100%)` |
| Bandas metálicas de `.gold-initial` | `linear-gradient(178deg, #fff3bd 0%, #e3c070 26%, #9a7329 49%, #c9a457 53%, #edcf8b 76%, #a87f33 100%)` |
| Ruido (grano) | `feTurbulence` SVG embebido como data URI, `blend-mode: overlay` |
| Bisel/profundidad | `drop-shadow(0 1.5px 0 rgba(150,112,40,.45))` + `drop-shadow(0 3px 5px rgba(80,58,22,.12))` |

Ángulo 225° (no 135°) para que la zona más oscura caiga hacia la izquierda. **Sin `-webkit-text-stroke`**: el contorno
oscuro restaba definición; se logra profundidad con bisel cálido.

---

## 3. Tipografía

Dos familias, contrastadas por rol: **Playfair Display** = titulares editoriales; **Plus Jakarta Sans** = UI y texto.

| Token | px / line-height | Peso | Tracking |
| :--- | :--- | :--- | :--- |
| `display-lg` (H1) | 56 / 64 | 600 | -0.02em |
| `display-lg-mobile` | 36 / 44 | 600 | -0.01em |
| `headline-lg` (H2 de sección) | 40 / 48 | 500 | -0.01em |
| `headline-lg-mobile` | 28 / 36 | 500 | 0 |
| `headline-md` | 32 / 40 | 500 | — |
| `headline-sm` (H3 de tarjeta) | 24 / 32 | 600 | — |
| `title-lg` | 20 / 28 | 600 | -0.01em |
| `title-md` (subtítulo de tarjeta) | 16 / 24 | 600 | — |
| `body-lg` (bajada hero) | 18 / 28 | 400 | — |
| `body-md` (cuerpo) | 15 / 24 | 400 | — |
| `body-sm` (texto auxiliar) | 13 / 20 | 400 | — |
| `label-lg` (nav, botones) | 13 / 18 | 600 | +0.08em, mayúsculas |
| `label-md` (kickers) | 11 / 16 | 600 | +0.1em, mayúsculas |

---

## 4. Espaciado y radios

| Token | Valor | | Token | Valor |
| :--- | :--- | :--- | :--- | :--- |
| `space-xs` | 0.25rem | | `gutter` | 1.5rem |
| `space-sm` | 0.5rem | | `gutter-mobile` | 1rem |
| `space-md` | 1rem | | `margin` | 3rem |
| `space-lg` | 1.5rem | | `margin-mobile` | 1.25rem |
| `space-xl` | 2.5rem | | | |

`borderRadius`: `DEFAULT` 0.125rem · `lg` 0.25rem · `xl` 0.5rem · `full` **9999px**.
Contenedor máximo: `1320px`.

> `full` estaba en `0.75rem` y se corrigió: convertía todos los avatares circulares, el punto de estado y el botón
> flotante de WhatsApp en cuadrados redondeados. Ver §7, cambio 15.

---

## 5. Efectos y utilidades propias (capa `components` de `src/input.css`)

| Clase / keyframe | Función |
| :--- | :--- |
| `.reveal-on-scroll` (+ `.is-visible`) | Entrada con `translateY(24px)` → 0, 0.75 s, `cubic-bezier(.16,1,.3,1)`. |
| `.stagger-1` … `.stagger-6` | Retardos escalonados (0.08 s) para grids en cascada. |
| `.card-interactive` | Elevación `-5px` + sombra cálida `rgba(111,88,60,.15)` en hover. |
| `.btn-shimmer` | Barrido de brillo diagonal en CTAs (`.btn-shimmer::after`, 0.85 s). |
| `.animate-float` | Flotación vertical de 6 px, 4.5 s — insignias del hero. |
| `.animate-ambient` | Deriva de aura de fondo, 8 s. |
| `.wa-pulse-ring` | Pulso orgánico del botón de WhatsApp, 2.2 s. |
| `.gold-initial` | Iniciales R/G/M: peso 600, gradiente metálico 178°, grano SVG, bisel cálido. Se aplica sobre un `span` con `text-[1.15em]` dentro del `h1`. |
| `header.is-scrolled` | Filete inferior dorado `rgba(197,160,89,.35)` + sombra al hacer scroll. |
| Scrollspy (IIFE al cierre del `<body>`) | Resalta el link de nav correspondiente a la sección visible. Actúa sobre **todos** los `nav[data-active-classes]`, alterna `aria-current`, y aplica un **bloqueo de 1.5 s** tras un click para que el *smooth scroll* no produzca parpadeos. |

**Contrato del scrollspy** (usado por los dos navs):

| Atributo | Rol |
| :--- | :--- |
| `data-active-classes` | Clases que se aplican **solo** al link activo. |
| `data-strip-classes` | Clases que se quitan del link activo por colisión (p. ej. el color de texto inactivo). |
| `data-nav-link` | Marca los links de sección dentro del nav (excluye el CTA "Agendar Consulta"). |

El script reconstruye `link.className` desde cero en cada cambio: **las clases base viven solo en el HTML**, nunca
se hardcodean en JS. Si un link activo pierde su token de tipografía, se nota en viewport.

**Estado activo por nav:**

| Nav | Activo | Strip |
| :--- | :--- | :--- |
| Escritorio (`lg:flex`) | `bg-cta text-[#1b1c1a] font-title-md rounded-lg` | `font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface` |
| Móvil | `bg-cta text-[#1b1c1a]` | `text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low` |

> En escritorio el link activo **crece** a `title-md` (20px) — es intencional, da jerarquía al ítem actual.
> En móvil mantiene `label-lg` (13px) porque el menú es una lista vertical densa.

**Accesibilidad:** `prefers-reduced-motion: reduce` desactiva animaciones, shimmer, pulsos y el reveal.

---

## 6. Decisiones por sección

**Header (`header` fijo)**
- Fondo `bg-surface/85` + `backdrop-blur-xl`, altura 80 px. Se descartó la variante oscura para no competir con el hero.
- Nav de escritorio con scrollspy; el estado activo usa `bg-cta text-[#1b1c1a]`.
- El **menú móvil comparte el scrollspy** con el de escritorio y refleja la misma sección activa.

**Hero (`#inicio`)**
- Fondo `bg-surface-container` (`#efeeea`) con dos auras difusas (`bg-cta/30` y `bg-surface-container-high/60`).
- Kicker sobre filete: "SERVICIO CONTABLE, JURÍDICO Y PREVISIONAL INTEGRADO".
- `h1` "Rivas González Methol" con gradiente dorado a 225° y las tres iniciales en `.gold-initial`.
- **Sin sombra de texto** sobre el `h1` (compite con el bisel metálico).
- CTAs: primario oliva `bg-cta text-[#1b1c1a]` + shimmer; secundario `bg-surface-container`.

**Áreas de Práctica (`#areas-practica`)**
- Badges de área unificados en `bg-cta text-[#1b1c1a]` (los tres antes mezclaban rosa y marrón).
- CTA de cierre de sección en oliva.

**Equipo (`#equipo`)**
- Encabezado en **flujo vertical** (`max-w-3xl`), no en dos columnas: kicker (gavel + EQUIPO PROFESIONAL) → `h2` "Un equipo interdisciplinario que te guía en cada paso" → bajada unificada (derecho + contabilidad + fiscalidad + atención directa).
- Se eliminó el rótulo "Socia Directora ·" de los subtítulos bajo las fotos (se conserva en los `alt`).
- Tarjetas: foto en grayscale que vira a color al hover, credenciales con ícono, *pills* de especialidades.
- **Línea de sinergia** al cierre de cada descripción: filete superior `border-outline-variant/40` + texto
  `body-sm` en `text-primary` que conecta las áreas ("Trabaja de forma coordinada con el área contable y
  tributaria para blindar tu patrimonio." y variantes por socia).

**Contacto / Banner / Footer**
- Banner intermedio con CTA oliva y punto `bg-cta`; formulario sobre `surface-container-lowest`.
- Links del footer: hover `bg-cta hover:text-[#1b1c1a]`.

---

## 7. Registro de cambios

### A. Color y CTAs
1. **CTAs marrones → verde oliva.** Se Aggregate_added `cta` / `cta-hover` al `tailwind.config` y se migraron todos
   los botones primarios: hero "Solicitar Primera Consulta", banner "Coordinar Consulta", CTA de cierre de
   `#areas-practica` y CTA de sección de contacto.
2. **Rellenos "rosados" → oliva.** `bg-primary-fixed/30` → `bg-cta/30`; `bg-primary-fixed` → `bg-cta` (con icono en
   oscuro); punto decorativo y hover de Instagram.
3. **Badges de área unificados.** Los tres pasaron a `bg-cta text-[#1b1c1a]` (Área Contable, Previsional y Jurídica),
   eliminando la inconsistencia rosa/marrón.
4. **Contraste.** Se evaluó texto blanco sobre oliva (3.17:1, falla AA) y se adoptó texto oscuro (5.4:1, AA).

### B. Tipografía y marca
5. **H1 dorado.** Gradiente de marca vía `bg-clip-text`; se ajustó el ángulo de 135° a 225° para ubicar la zona más
   oscura hacia la izquierda.
6. **Iniciales R/G/M refinadas en tres rondas:** `font-weight` 900 → 700 → **600**; se descartó el trazo oscuro
   (`-webkit-text-stroke`) a favor de bisel + grano metálico, y se eliminó la sombra general del `h1`.

### C. Navegación
7. **Scrollspy del navbar.** No existía JS para `data-active-classes`: se añadió un IIFE vanilla con `aria-current`
   y bloqueo de 1.5 s post-click.
8. **Fondo del header** revertido a `bg-surface/85` y **hero oscurecido** a `bg-surface-container` para que el
   dorado del `h1` resalte sobre un valor más bajo.

### D. Contenido
9. **Sección Equipo.** Nuevo `h2` + bajada reorganizada en flujo vertical (antes el texto estaba en una columna a la
   derecha), y línea de sinergia en las tres tarjetas.
10. **Cra. González.** Nombre completo ("María Eugenia González"), descripción y credenciales actualizadas
    (CPCESL Mat. Nº 1856, Universidad Nacional de San Luis, Consultora en Gestión Contable y Financiera) y lista de
    especialidades ampliada a cinco *pills*.
11. **Subtítulos bajo fotos** depurados (se retira "Socia Directora ·").

### E. Navegación (2ª iteración)
12. **Scrollspy también en el menú móvil.** El IIFE se generalizó de un nav a todos los `nav[data-active-classes]`.
    Cada link se marca con `data-nav-link` para que el CTA "Agendar Consulta" quede fuera, y se ajoutó
    `data-strip-classes` por nav (el strip del escritorio incluye los tokens de tamaño; el del móvil no, para no
    degradar el link activo a `body-md`).
13. **Estado inicial corregido.** "Inicio" ya no viene con `aria-current` y las clases activas hardcodeadas: el
    estado lo decide el JS en el `update()` inicial, evitando que haya dos fuentes de verdad.

### F. Migración a Tailwind compilado (3ª iteración)

14. **Configuración extraída a `tailwind.config.js`.** Las 4 páginas tenían el `tailwind.config` duplicado (con
    diferencias: `contacto`/`equipo` no definían `cta`). Ahora hay una fuente única, consumida **en build**, no en
    runtime. Se ajustó `content` para listar las 4 páginas explícitamente y excluir `index.original.html`.
15. **`rounded-full` corregido a `9999px`.** El token heredado decía `0.75rem`, así que las ~45 instancias de
    `rounded-full` (avatares `w-8/10/11/14`, punto de estado, botón de WhatsApp) compilaban a cuadrados redondeados.
16. **Capa `components` explícita.** El CSS propio se movió a `@layer components` dentro de `src/input.css`. Tailwind
    dejaba el CSS sin capa en una posición intermedia del archivo; depender de eso era frágil. Ahora
    `base < components < utilities` está garantizado por el orden de capas y replica el criterio del CDN.
17. **Pipeline npm.** `package.json` con `tailwindcss@^3.4.17` y scripts `build` / `build:dev` / `watch`.
    `dist/app.css` (~45 KB minificado) queda versionado porque el sitio no tiene CI.
18. **Fin del CDN.** Eliminados `<script src="cdn.tailwindcss.com">`, el `<script id="tailwind-config">` y el
    `<style>` inline de `index.html`, `contacto.html` y `equipo.html`. Las 4 páginas enlazan `dist/app.css`.
19. **`contacto.html` y `equipo.html` a la paleta actual.** Nav activo en `bg-cta text-[#1b1c1a]`, CTA principal en
    `bg-cta` con `hover:bg-cta-hover`, auras cálidas. Se eliminaron links duplicados de Material Symbols.
20. **`privacidad.html` migrado.** Reescrito a Tailwind: se fue `style-v2.css`, el layout legal responsive y el
    contenido (Ley 25.326, derechos,cookies) se conservó. Se unificó header y footer con el resto del sitio y se
    agregó el nav, que se había perdido en la reescritura. Script mínimo inline para el año del footer.
22. **Archivos huérfanos eliminados.** `style-v2.css`, `style.css`, `style.original.css` y `main.js` ya no los cargaba
    ninguna página; se borraron con `git rm` (recuperables desde el historial: 2, 1, 1 y 2 commits respectivamente).
    Única casualty: `index.original.html`, que sigue enlazando `style-v2.css` y `main.js` y quedó sin estilos ni JS
    si se abre en el navegador. Es un backup gitignored, no una página publicada.
23. **Verificación.** Script de chequeo que extrae las clases de los 4 HTML y las contrasta contra el CSS compilado:
    **953 clases, 0 faltantes** (el único no-macheado es `material-symbols-outlined`, que viene de la fuente de
    Google). También se verificaron las **11 clases que el JS inyecta en runtime** (`classList`, `innerHTML`),
    que es el riesgo clásico al pasar de CDN a build estático: todas presentes.

---

## 8. Pendientes y notas

- `contacto.html` y `equipo.html` **no tienen menú móvil** (el nav es `hidden lg:flex` y no hay drawer). Es una
  brecha de UX preexistente, ajena a esta migración. Resoluble con los tokens de spacing que ya existen.
- El build no valida `borderRadius`, `colors` ni nada del config: un token mal escrito compila en silencio. Conviene
  revisar el diff de `dist/app.css` junto a cualquier cambio de token.
- `index.original.html` ya no renderiza (le faltan `style-v2.css` y `main.js`). Si se quiere conservar como
  referencia visual, hay que borrarlo también o reconstruirlo contra `dist/app.css`.
