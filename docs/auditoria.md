# Auditoría del sitio público

Fecha: 2026-10-19. Alcance: `/`, `/timeline`, `/club`, `/consejo-estudiantil` y `/personal-docente`, en 360px y 1280px, en tema claro y oscuro (20 cargas).

Método: mediciones en el navegador (desborde, contraste calculado, botones táctiles, encabezados, imágenes, errores de consola), detector de anti-patrones de la skill `impeccable` y lectura de código. Es solo diagnóstico; no se cambió código.

## Puntaje

| # | Dimensión | Puntaje | Hallazgo principal |
|---|---|---|---|
| 1 | Accesibilidad | 3 | Contraste y encabezados bien; falta `<main>` en 4 páginas y un enlace "saltar al contenido" |
| 2 | Rendimiento | 2 | Video de 27.7 MB que arranca solo en la landing |
| 3 | Responsive | 3 | Sin desborde horizontal; botones de 28 a 38px de alto |
| 4 | Tematización | 3 | Tema oscuro funcional; quedan colores fijos de la paleta de Tailwind |
| 5 | Anti-patrones | 2 | 7 franjas laterales de color y tarjetas idénticas repetidas |
| **Total** | | **13/20** | **Aceptable: hace falta trabajo importante** |

Bandas: 18-20 excelente, 14-17 bueno, 10-13 aceptable, 6-9 pobre, 0-5 crítico.

## Veredicto de anti-patrones

No parece una plantilla de IA genérica, pero tiene dos tics claros:

- **Franjas laterales de color (`border-l-4`) ×7**, una de las prohibiciones absolutas del sistema (`DESIGN.md`):
  `objetivos.tsx` (líneas 11 y 40), `occupationalField.tsx:18`, `proyectosInvestigacion.tsx:22`, `proyectosVinculacion.tsx:22`, `pdfReader.tsx:56` y `PdfReaderWrapper.tsx:8`.
- **Tarjetas idénticas:** 5 secciones repiten `bg-card border border-border rounded-xl p-5 hover:border-blueti/30`.

Además, ninguna de las 5 páginas tiene `<img>`. `visionMisionBanner.tsx` tiene dos imágenes y no se importa en ningún lado.

## Hallazgos

### P1: arreglar antes de liberar

1. **Video pesado.** `src/sections/landingpage/Video.tsx` arranca solo y silenciado (`autoplay = true`, `muted = true`) y `public/media/videopr.mp4` pesa 27.7 MB. El público es mayormente móvil con datos limitados (`PRODUCT.md`). La portada es `public/media/media.png` (1.6 MB) con ruta relativa `./media/media.png`. Categoría: rendimiento.
2. **Sin salto al contenido ni `<main>`.** Solo `src/app/page.tsx` tiene `<main>`; `timeline`, `club`, `consejo-estudiantil` y `personal-docente` no. No hay enlace "saltar al contenido". WCAG 2.4.1 (A). Categoría: accesibilidad.

### P2: siguiente pasada

3. **Franjas laterales ×7** (ver arriba). Anti-patrón.
4. **Tarjetas idénticas ×5.** Anti-patrón.
5. **Botón del menú móvil sin `aria-expanded`** (`src/sections/header/Navbar.tsx`, botón del menú). WCAG 4.1.2.
6. **`aria-label` fijos en español** en el cambio de tema y el menú, aunque el sitio es bilingüe; el del selector de idioma está en inglés (`Navbar.tsx`, `LanguageSwitcher.tsx`).
7. **Botones táctiles bajo 44px:** idioma 76×28, logo 44×28, tema 34×34, menú 36×36, filtro "All" 49×38 y enlaces del menú de escritorio de 36px de alto. Pasan el mínimo de 24px de WCAG 2.2 AA, pero no los 44px que pide la skill.
8. **Todas las rutas se renderizan en cada petición** (`ƒ` en el build) por `getLocale()` de next-intl. No se midió el tiempo de carga.

### P3: pulido

9. **Colores de la paleta de Tailwind escritos a mano** en vez de tokens: `text-blue-200` ×6, `text-gray-*`, `bg-gray-900`.

## Patrones sistémicos

- Los botones del menú son pequeños en conjunto, no en un componente aislado.
- Hay textos fuera de i18n: los `aria-label` están en español y el del selector de idioma en inglés.

## Lo que está bien

- Contraste AA en casi todo el sitio, en ambos temas. La excepción (números dorados, ver "Correcciones a esta auditoría") ya está resuelta. El texto de respaldo del `<video>` no cuenta, porque no se ve.
- Un solo `h1` por página y sin saltos de nivel de encabezado.
- Sin desborde horizontal a 360px.
- Sin errores de consola en las 5 páginas.
- El lector de PDF se carga bajo demanda y con esqueleto.
- El tema oscuro funciona bien.

## Acciones recomendadas

1. **[P1] `/impeccable optimize`:** video (sin autoplay en móvil, versión comprimida) y portada (WebP, ruta absoluta).
2. **[P1] `/impeccable harden`:** `<main>` en las 5 páginas, enlace "saltar al contenido", `aria-expanded` y `aria-label` traducidos.
3. **[P2] `/impeccable layout`:** quitar las franjas laterales y variar las tarjetas idénticas.
4. **[P2] `/impeccable adapt`:** botones táctiles de 44px en el menú.
5. **[P2] `/impeccable polish`:** como paso final, pasar los colores fijos a tokens.

Repetir `/impeccable audit` después de los arreglos para comparar el puntaje (línea base: 13/20).

## Correcciones a esta auditoría

Después de publicar el informe se detectó un error del método: la medición de contraste ignoraba los textos de un solo carácter. Por eso no marcó los números dorados de los objetivos educativos (`text-gold` sobre `bg-gold/10`), que tenían **2.25:1** en tema claro (AA exige 4.5:1). Repetida la medición contando todos los textos, ese era el único fallo. Está resuelto (ver abajo). El puntaje de accesibilidad (3 de 4) no cambia.

## Seguimiento

| Hallazgo | Estado | Commit |
|---|---|---|
| P1 video pesado | Resuelto: 27.7 MB a 6.0 MB, portada de 1.5 MB a 36 KB, sin autoplay | `47ae0be` |
| P1 sin `<main>` ni salto al contenido | Resuelto en las 5 páginas | `f0a071f` |
| Nuevo: `personal-docente` sin encabezado | Resuelto | `ef77535` |
| P2 franjas laterales ×7 | Resuelto | `1b0a193` |
| P2 tarjetas idénticas ×5 | Resuelto: cada sección usa una forma distinta | `1b0a193` |
| Nuevo: números dorados con contraste 2.25:1 | Resuelto | `1b0a193` |
| P2 `aria-expanded` y `aria-label` fijos | Resuelto: también se cierra con Escape y los ids son únicos | `9cbeb4c` |
| P2 botones táctiles bajo 44px | Resuelto: todo el encabezado mide 44px o más (61px de alto en total) | `9cbeb4c` |
| P2 rutas renderizadas en cada petición | Pendiente | |
| P3 colores de Tailwind escritos a mano | Resuelto en las páginas en uso (tokens `blueti-muted`, `blueti-subtle`, `destructive-text`). Quedan en `TestButton.tsx` y `visionMisionBanner.tsx`, que no se importan en ningún lado | `be75ae2` |
