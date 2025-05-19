# ScrollFrameAnimator

A React component for creating smooth frame-by-frame animations controlled by page scrolling.

[Español](#español) | [English](#english)

---

## English

### Overview

The ScrollFrameAnimator component allows you to create engaging scroll-controlled animations using a sequence of images. As the user scrolls down the page, the component displays different frames from your animation sequence, creating a smooth animation effect.

### Installation

```bash
npm install scroll-frame-animator
```

### Basic Usage

```jsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';

function MyPage() {
  return (
    <ScrollFrameAnimator 
      framesCount={39}
      framesPath="./frames"
      framePrefix="ezgif-frame-"
      frameExtension="png"
    />
  );
}
```

### Adding Content

You can add content that appears alongside your animation:

```jsx
<ScrollFrameAnimator 
  width="70%" 
  position="right"
  contentMode="side"
  background="#16213e"
>
  <div>
    <h2>Your Title Here</h2>
    <p>Your description or additional content</p>
  </div>
</ScrollFrameAnimator>
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| framesCount | number | 39 | Total number of frames in the animation |
| framesPath | string | './frames' | Path to the folder containing the frame images |
| framePrefix | string | 'ezgif-frame-' | Filename prefix for each frame |
| frameExtension | string | 'png' | File extension of the frame images |
| animationSectionHeight | string | '500dvh' | Height of the animation section (controls scroll length) |
| width | string | '100%' | Width of the animation frame |
| height | string | '100dvh' | Height of the animation frame |
| position | 'left' \| 'right' \| 'center' | 'center' | Horizontal position of the animation |
| objectFit | 'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down' | 'cover' | How frames should be resized to fit |
| contentMode | 'overlay' \| 'side' | 'overlay' | How to position content |
| background | string | '#000' | Background color or image for the section |

### Advanced Customization

The component offers extensive customization options:

```jsx
<ScrollFrameAnimator 
  framesCount={121}
  framesPath="./my-custom-frames"
  framePrefix="image_"
  frameExtension="webp"
  animationSectionHeight="800dvh"
  width="50%"
  height="80vh"
  position="left"
  objectFit="contain"
  contentMode="side"
  background="linear-gradient(to bottom, #1a1a2e, #16213e)"
>
  <div>
    <h2>Custom Animation</h2>
    <p>This example shows all customization options</p>
  </div>
</ScrollFrameAnimator>
```

### Content Positioning

- **overlay**: Content appears on top of the animation
- **side**: Content appears next to the animation (automatically positioned based on the animation's width and position)

### How It Works

1. The component tracks the user's scroll position within the animation section
2. All animation frames are preloaded for smooth playback
3. As the user scrolls, the component calculates which frame to show
4. The frame is updated only when necessary to maintain performance

### Browser Support

The component works in all modern browsers that support:
- CSS position: sticky
- IntersectionObserver
- ES6 features

---

## Español

### Descripción General

El componente ScrollFrameAnimator permite crear animaciones atractivas controladas por scroll utilizando una secuencia de imágenes. A medida que el usuario se desplaza por la página, el componente muestra diferentes fotogramas de tu secuencia de animación, creando un efecto de animación fluido.

### Instalación

```bash
npm install scroll-frame-animator
```

### Uso Básico

```jsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';

function MiPagina() {
  return (
    <ScrollFrameAnimator 
      framesCount={39}
      framesPath="./frames"
      framePrefix="ezgif-frame-"
      frameExtension="png"
    />
  );
}
```

### Añadir Contenido

Puedes agregar contenido que aparece junto a tu animación:

```jsx
<ScrollFrameAnimator 
  width="70%" 
  position="right"
  contentMode="side"
  background="#16213e"
>
  <div>
    <h2>Tu Título Aquí</h2>
    <p>Tu descripción o contenido adicional</p>
  </div>
</ScrollFrameAnimator>
```

### Propiedades

| Propiedad | Tipo | Valor Predeterminado | Descripción |
|-----------|------|----------------------|-------------|
| framesCount | number | 39 | Número total de fotogramas en la animación |
| framesPath | string | './frames' | Ruta a la carpeta que contiene las imágenes de los fotogramas |
| framePrefix | string | 'ezgif-frame-' | Prefijo del nombre de archivo para cada fotograma |
| frameExtension | string | 'png' | Extensión de archivo de las imágenes |
| animationSectionHeight | string | '500dvh' | Altura de la sección de animación (controla la longitud del scroll) |
| width | string | '100%' | Ancho del marco de animación |
| height | string | '100dvh' | Altura del marco de animación |
| position | 'left' \| 'right' \| 'center' | 'center' | Posición horizontal de la animación |
| objectFit | 'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down' | 'cover' | Cómo se deben redimensionar los fotogramas |
| contentMode | 'overlay' \| 'side' | 'overlay' | Cómo posicionar el contenido |
| background | string | '#000' | Color de fondo o imagen para la sección |

### Personalización Avanzada

El componente ofrece amplias opciones de personalización:

```jsx
<ScrollFrameAnimator 
  framesCount={121}
  framesPath="./mis-frames-personalizados"
  framePrefix="imagen_"
  frameExtension="webp"
  animationSectionHeight="800dvh"
  width="50%"
  height="80vh"
  position="left"
  objectFit="contain"
  contentMode="side"
  background="linear-gradient(to bottom, #1a1a2e, #16213e)"
>
  <div>
    <h2>Animación Personalizada</h2>
    <p>Este ejemplo muestra todas las opciones de personalización</p>
  </div>
</ScrollFrameAnimator>
```

### Posicionamiento del Contenido

- **overlay**: El contenido aparece encima de la animación
- **side**: El contenido aparece al lado de la animación (se posiciona automáticamente según el ancho y la posición de la animación)

### Cómo Funciona

1. El componente rastrea la posición de desplazamiento del usuario dentro de la sección de animación
2. Todos los fotogramas de la animación se precargan para una reproducción fluida
3. A medida que el usuario se desplaza, el componente calcula qué fotograma mostrar
4. El fotograma se actualiza solo cuando es necesario para mantener el rendimiento

### Compatibilidad con Navegadores

El componente funciona en todos los navegadores modernos que admiten:
- CSS position: sticky
- IntersectionObserver
- Características de ES6
