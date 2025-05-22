'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import styles from './ScrollFrameAnimator.module.css';

/**
 * Props for the ScrollFrameAnimator component.
 *
 * @property {number} [framesCount] - Total number of frames in the animation.
 * @property {string} [framesPath] - Path to the directory containing frame images.
 * @property {string} [framePrefix] - Prefix for frame image filenames.
 * @property {string} [frameExtension] - File extension for frame images (e.g., 'png', 'jpg').
 * @property {string} [animationSectionHeight] - Height of the animation section (e.g., '100vh', '500px').
 * @property {string} [width] - Width of the animation container (e.g., '100%', '800px').
 * @property {string} [height] - Height of the animation container (e.g., '100%', '600px').
 * @property {'left' | 'right' | 'center'} [position] - Position of the animation within its container.
 * @property {'cover' | 'contain' | 'fill' | 'none' | 'scale-down'} [objectFit] - CSS object-fit property for the frame images.
 * @property {ReactNode} [children] - Optional children to render inside the component.
 * @property {'overlay' | 'side'} [contentMode] - Mode for displaying content relative to the animation ('overlay' overlays content, 'side' places it beside).
 * @property {string} [background] - Background color or image for the animation container (e.g., '#fff', 'linear-gradient(...)').
 */

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
                const id = `${(i + 1).toString().padStart(3, '0')}`;
                const src = `${framesPath}/${framePrefix}${id}.${frameExtension}`;
                const image = new Image();
                image.src = src;
            });
        };

        // Update image based on frame number
        const updateImage = (frame = 0) => {
            const id = `${(frame + 1).toString().padStart(3, '0')}`;
            const src = `${framesPath}/${framePrefix}${id}.${frameExtension}`;
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
        window.addEventListener('scroll', handleScroll);
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

    // Create custom styles for the image based on the received properties
    const frameStyle = {
        width: width,
        height: height,
        objectFit: objectFit,
        // For sticky elements, we need to use different properties for horizontal positioning
        ...(position === 'right' 
            ? { right: '0', left: '100%' } 
            : position === 'left' 
                ? { left: '0', right: 'auto' } 
                : { 
                    // For centering, we use a different approach that works with any width
                    left: '0', 
                    right: '0',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    transform: 'none'
                  })
    };

    // Memoize content styles calculation for better performance
    const contentStyles = (() => {
        // If overlay, return empty object immediately to avoid unnecessary calculations
        if (contentMode === 'overlay') {
            return {};
        }
        
        // Only parse width once
        const numericWidth = parseInt(width, 10);
        const isFullWidth = width === '100%' || numericWidth >= 100;
        
        // If the image takes up the full width, the content should overlap
        if (isFullWidth) {
            return {
                width: '100%',
                left: 0
            };
        }
        
        // Efficient style calculation based on position
        switch(position) {
            case 'right':
                return {
                    left: 0,
                    width: `calc(100% - ${width})`,
                    textAlign: 'left' as const
                };
            case 'left':
                return {
                    right: 0,
                    width: `calc(100% - ${width})`,
                    textAlign: 'left' as const
                };
            default:
                // For centered images, calculate once
                const availableSpace = (100 - numericWidth) / 2;
                return {
                    right: 0,
                    width: `${availableSpace}%`,
                    textAlign: 'left' as const
                };
        }
    })();

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
                    className={`${styles.contentContainer} ${
                        contentMode === 'overlay' ? styles.contentOverlay : styles.contentSide
                    }`}
                    style={contentStyles as React.CSSProperties}
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
};