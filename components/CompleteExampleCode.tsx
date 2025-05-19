// Este archivo es solo para mostrar el código completo como referencia

const ComponentExampleCode = {
  tsx: `'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import styles from './ScrollFrameAnimator.module.css';

interface ScrollFrameAnimatorProps {
    framesCount?: number;
    framesPath?: string;
    framePrefix?: string;
    frameExtension?: string;
    animationSectionHeight?: string;
    width?: string;
    height?: string;
    position?: 'left' | 'right' | 'center';
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    children?: ReactNode;
    contentMode?: 'overlay' | 'side';
    background?: string;
}

export function ScrollFrameAnimator({
    framesCount = 39,
    framesPath = './frames',
    framePrefix = 'ezgif-frame-',
    frameExtension = 'png',
    animationSectionHeight = '500dvh',
    width = '100%',
    height = '100dvh',
    position = 'center',
    objectFit = 'cover',
    children,
    contentMode = 'overlay',
    background = '#000',
}: ScrollFrameAnimatorProps) {
    const currentFrameRef = useRef<number>(0);
    const [imageSrc, setImageSrc] = useState('');
    const animationSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Preload images
        const preloadImages = () => {
            Array.from({ length: framesCount }, (_, i) => {
                const id = \`\${(i + 1).toString().padStart(3, '0')}\`;
                const src = \`\${framesPath}/\${framePrefix}\${id}.\${frameExtension}\`;
                const image = new Image();
                image.src = src;
            });
        };

        // Update image based on frame number
        const updateImage = (frame = 0) => {
            const id = \`\${(frame + 1).toString().padStart(3, '0')}\`;
            const src = \`\${framesPath}/\${framePrefix}\${id}.\${frameExtension}\`;
            setImageSrc(src);
            currentFrameRef.current = frame;
        };

        // Init with first frame
        updateImage(0);
        preloadImages();

        // Set up scroll listener
        const handleScroll = () => {
            if (!animationSectionRef.current) return;

            // Get current scroll position
            const scrollPosition = window.scrollY;
            const animationSectionPosition = animationSectionRef.current.offsetTop;
            const animationSectionHeight = animationSectionRef.current.offsetHeight;
            const maxScrollAnimationSection = animationSectionHeight - window.innerHeight;

            // Before animation section, show first frame
            if (scrollPosition < animationSectionPosition) {
                if (currentFrameRef.current !== 0) updateImage(0);
                return;
            }

            if (scrollPosition > animationSectionPosition + animationSectionHeight - window.innerHeight) {
                if (currentFrameRef.current !== framesCount - 1) updateImage(framesCount - 1);
                return;
            }

            // Calculate relative position within animation section
            const relativeScrollPosition = scrollPosition - animationSectionPosition;

            // Calculate scroll percentage
            const scrollFraction = Math.min(1, Math.max(0, relativeScrollPosition / maxScrollAnimationSection));

            // Determine which frame to show
            const frame = Math.floor(scrollFraction * framesCount);

            // Update only if frame changes
            if (currentFrameRef.current !== frame) updateImage(frame);
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [
        framesCount, framesPath, framePrefix, frameExtension
    ]);

    const animationSectionStyle = {
        height: animationSectionHeight,
        position: 'relative' as const,
        background: background
    };

    // Crear estilos personalizados para la imagen según las propiedades recibidas
    const frameStyle = {
        width: width,
        height: height,
        objectFit: objectFit,
        // Para elementos sticky, necesitamos usar propiedades diferentes para el posicionamiento horizontal
        ...(position === 'right' 
            ? { right: '0', left: 'auto' } 
            : position === 'left' 
                ? { left: '0', right: 'auto' } 
                : { 
                    // Para centrado, usamos un enfoque diferente que funciona con cualquier ancho
                    left: '0', 
                    right: '0',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    transform: 'none'
                  })
    };

    // Cálculo de estilos para el contenido adaptativo
    const getContentStyles = () => {
        // Si es overlay, simplemente usamos los estilos predefinidos
        if (contentMode === 'overlay') {
            return {};
        }
        
        // Para modo 'side', calculamos la posición en función de la posición de la imagen
        const numericWidth = parseInt(width, 10);
        const isFullWidth = width === '100%' || numericWidth >= 100;
        
        // Si la imagen ocupa todo el ancho, el contenido debe superponerse
        if (isFullWidth) {
            return {
                width: '100%',
                left: 0
            };
        }
        
        // Si la imagen está a la derecha, el contenido va a la izquierda
        if (position === 'right') {
            return {
                left: 0,
                width: \`calc(100% - \${width})\`,
                textAlign: 'right' as const
            };
        }
        
        // Si la imagen está a la izquierda, el contenido va a la derecha
        if (position === 'left') {
            return {
                right: 0,
                width: \`calc(100% - \${width})\`,
                textAlign: 'left' as const
            };
        }
        
        // Si la imagen está centrada, dividimos el espacio disponible a ambos lados
        const availableSpace = (100 - numericWidth) / 2;
        return {
            right: 0,
            width: \`\${availableSpace}%\`,
            textAlign: 'left' as const
        };
    };

    return (
        <section
            ref={animationSectionRef}
            className={styles.animationSection}
            style={animationSectionStyle as React.CSSProperties}
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="Scroll animation frame"
                    className={styles.animationFrame}
                    style={frameStyle as React.CSSProperties}
                />
            ) : (
                <div className={styles.animationPlaceholder} style={frameStyle as React.CSSProperties} />
            )}
            {children && (
                <div 
                    className={\`\${styles.contentContainer} \${
                        contentMode === 'overlay' ? styles.contentOverlay : styles.contentSide
                    }\`}
                    style={getContentStyles() as React.CSSProperties}
                >
                    {contentMode === 'overlay' ? (
                        <div className={styles.overlayWrapper}>
                            {children}
                        </div>
                    ) : (
                        children
                    )}
                </div>
            )}
        </section>
    );
}`,

  css: `.animationSection {
    position: relative;
    width: 100vw;
    overflow: visible;
}

.animationFrame {
    position: sticky;
    top: 0;
    display: block;
    z-index: 0;
}

.contentContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    position: absolute;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Contenido al lado de la imagen (se ajusta automáticamente) */
.contentSide {
    top: 0;
    height: 100%;
    /* El ancho y la posición (derecha/izquierda) se calculan dinámicamente en el componente */
}

/* Contenido superpuesto sobre la imagen */
.contentOverlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1;
}

/* Estilos para el contenido superpuesto (fondo semi-transparente) */
.overlayWrapper {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 2rem;
    border-radius: 1rem;
    max-width: 80%;
    z-index: 10;
}

/* Estilos básicos para títulos y texto dentro del contenedor */
.contentContainer h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.contentContainer p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.contentContainer ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
}

.contentContainer li {
    margin-bottom: 0.5rem;
}`,

  usage: {
    en: `import { ScrollFrameAnimator } from '@/components/ScrollFrameAnimator/ScrollFrameAnimator';

/*
  FRAME PREPARATION:
  1. Extract frames from your video using software like Adobe Premiere, After Effects, or FFMPEG
  2. Save frames sequentially (e.g., frame-001.png, frame-002.png) in your public directory
  3. For best performance, optimize your images and consider using WebP format
  4. Typically 30-60 frames are sufficient for most animations
*/

function YourComponent() {
  return (
    <ScrollFrameAnimator 
      framesCount={39} // Total number of frames in the animation
      framesPath="./frames" // Path to the folder containing the frame images
      framePrefix="ezgif-frame-" // Filename prefix for each frame
      frameExtension="png" // File extension of the frame images
      animationSectionHeight="500dvh" // Height of the animation section (controls scroll length)
      width="100%" // Width of the animation frame
      height="100dvh" // Height of the animation frame
      position="center" // Horizontal position of the animation ('left', 'right', or 'center')
      objectFit="cover" // How the frames should be resized to fit their container
      contentMode="overlay" // How to position content: 'overlay' or 'side'
      background="#000" // Background color or image for the animation section
    >
      {/* Optional: Add content that will be displayed according to contentMode */}
      <div>
        <h2>Your Content Here</h2>
        <p>This will appear based on the contentMode setting</p>
      </div>
    </ScrollFrameAnimator>
  );
}`,

    es: `import { ScrollFrameAnimator } from '@/components/ScrollFrameAnimator/ScrollFrameAnimator';

/*
  PREPARACIÓN DE FOTOGRAMAS:
  1. Extrae fotogramas de tu video utilizando software como Adobe Premiere, After Effects o FFMPEG
  2. Guarda los fotogramas secuencialmente (ej. frame-001.png, frame-002.png) en tu directorio público
  3. Para un mejor rendimiento, optimiza tus imágenes y considera usar formato WebP
  4. Normalmente 30-60 fotogramas son suficientes para la mayoría de las animaciones
*/

function TuComponente() {
  return (
    <ScrollFrameAnimator 
      framesCount={39} // Número total de fotogramas en la animación
      framesPath="./frames" // Ruta a la carpeta que contiene las imágenes de los fotogramas
      framePrefix="ezgif-frame-" // Prefijo del nombre de archivo para cada fotograma
      frameExtension="png" // Extensión de archivo de las imágenes
      animationSectionHeight="500dvh" // Altura de la sección de animación (controla la longitud del scroll)
      width="100%" // Ancho del marco de animación
      height="100dvh" // Altura del marco de animación
      position="center" // Posición horizontal de la animación ('left', 'right', o 'center')
      objectFit="cover" // Cómo se deben redimensionar los fotogramas
      contentMode="overlay" // Cómo posicionar el contenido: 'overlay' o 'side'
      background="#000" // Color de fondo o imagen para la sección de animación
    >
      {/* Opcional: Agrega contenido que se mostrará según el contentMode */}
      <div>
        <h2>Tu Contenido Aquí</h2>
        <p>Esto aparecerá según la configuración de contentMode</p>
      </div>
    </ScrollFrameAnimator>
  );
}`
  }
};

export default ComponentExampleCode;
