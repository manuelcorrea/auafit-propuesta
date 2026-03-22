# Experiencia Aquaboard — AUAFIT × InterContinental Cartagena

Propuesta comercial y conceptual para el **Sunset Aquafitness Festival** en el Hotel InterContinental Cartagena de Indias.

## Estructura del proyecto

```
auafit-propuesta/
├── index.html              # Página principal (bilingüe ES/EN)
├── styles.css              # Estilos completos
├── script.js               # Interactividad y animaciones
├── assets/
│   ├── 26.png              # AquaBOARD — ¿Qué es?
│   ├── 27.png              # Entrenamiento Propioceptivo
│   ├── 28.png              # Versatilidad Sin Límites
│   └── 29.png              # Modalidades Premium
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions → GitHub Pages
└── README.md
```

## Despliegue en GitHub Pages

### Opción 1 — Automático con GitHub Actions

1. Sube el proyecto a un repositorio de GitHub
2. Ve a **Settings → Pages**
3. En **Source**, selecciona **GitHub Actions**
4. Cada `git push` a `main` desplegará automáticamente

### Opción 2 — Manual

1. Sube el proyecto a GitHub
2. Ve a **Settings → Pages → Source → Deploy from a branch**
3. Selecciona la rama `main` y la carpeta `/ (root)`
4. Guarda. GitHub Pages publicará en `https://<usuario>.github.io/<repo>/`

## Personalización de imágenes

Para reemplazar los fondos hero con fotos reales del hotel:

1. Descarga imágenes de la **Sunset Pool Terrace** del InterContinental Cartagena desde `intercartagena.com/en/gallery`
2. Guárdalas en `assets/` (ej. `hero-pool.jpg`, `sunset-pool.jpg`)
3. En `styles.css`, reemplaza los gradientes en `.hero__bg` y `.festival-hero__bg`:

```css
/* Antes: gradiente CSS */
.hero__bg {
  background: var(--grad-overlay), linear-gradient(...);
}

/* Después: foto real */
.hero__bg {
  background: var(--grad-overlay), url('assets/hero-pool.jpg') center/cover no-repeat;
}
```

## Idioma

- **Default:** Español (Colombia)
- **Toggle:** botón EN/ES en la barra de navegación
- El idioma se guarda en `localStorage`

## Tecnologías

- HTML5 semántico
- CSS3 puro (variables, animaciones, grid, flexbox)
- JavaScript vanilla (sin dependencias externas)
- Google Fonts (Cormorant Garamond + Inter)
- GitHub Actions para CI/CD

---

© 2026 AUAFIT S.A.S. — Propuesta Confidencial
