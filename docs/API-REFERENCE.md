# ScrollFrameAnimator API Reference

## Component Props

### Core Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `framesCount` | `number` | `39` | The total number of frames in your animation sequence. The component will automatically calculate which frame to show based on scroll position. |
| `framesPath` | `string` | `'./frames'` | The directory path where your frame images are stored. This should be a public directory that's accessible to the browser. |
| `framePrefix` | `string` | `'ezgif-frame-'` | The prefix for your frame filenames. For example, if your files are named "image_001.png", "image_002.png", etc., the prefix would be "image_". |
| `frameExtension` | `string` | `'png'` | The file extension of your frame images (without the dot). Common values are "png", "jpg", "webp". |
| `animationSectionHeight` | `string` | `'500dvh'` | The height of the animation section. This controls how long the user has to scroll to see the complete animation. Larger values create a slower animation effect. |

### Visual Customization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | `'100%'` | The width of the animation frame. Can be any valid CSS width value like "100%", "500px", "50vw", etc. |
| `height` | `string` | `'100dvh'` | The height of the animation frame. Can be any valid CSS height value like "100dvh", "500px", "80vh", etc. |
| `position` | `'left'` \| `'right'` \| `'center'` | `'center'` | The horizontal position of the animation within its container. |
| `objectFit` | `'cover'` \| `'contain'` \| `'fill'` \| `'none'` \| `'scale-down'` | `'cover'` | Determines how the frame images should be resized to fit their container. Similar to CSS object-fit property. |
| `background` | `string` | `'#000'` | The background color or image for the animation section. Can be any valid CSS background value including colors, gradients, or images. |

### Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `contentMode` | `'overlay'` \| `'side'` | `'overlay'` | Controls how the content (children) should be positioned relative to the animation. When "overlay", content appears on top of the animation. When "side", content appears beside the animation, opposite to the animation's position. |
| `children` | `ReactNode` | `undefined` | Any React content to display. The positioning is controlled by the contentMode prop. |

## CSS Classes

The component uses the following CSS classes that can be overridden for customization:

| Class | Purpose |
|-------|---------|
| `.animationSection` | The main container for the entire animation section |
| `.animationFrame` | The image element displaying the current animation frame |
| `.animationPlaceholder` | A placeholder displayed when images are loading |
| `.contentContainer` | The container for user-provided content |
| `.contentOverlay` | Applied to contentContainer when contentMode is "overlay" |
| `.contentSide` | Applied to contentContainer when contentMode is "side" |

## Events and Lifecycle

- On mount, the component preloads all frame images to ensure smooth playback
- A scroll event listener is added to track the user's scroll position
- The component determines which frame to display based on the scroll position
- When the component unmounts, all event listeners are properly cleaned up

## Performance Considerations

- Use WebP format for smaller file sizes and faster loading
- Optimize your frame images to reduce their file size
- Consider using a lower number of frames for complex animations
- Use the key prop for optimal React rendering performance
- Consider lazy-loading frames that aren't immediately visible

## Browser Compatibility

The component relies on several modern web features:

- CSS position: sticky
- IntersectionObserver API (for advanced implementations)
- ES6 features including arrow functions, template literals, and destructuring

For best compatibility, consider adding polyfills for older browsers if needed.

## Usage with TypeScript

The component includes TypeScript definitions for all props. Here's an example of using the component with TypeScript:

```tsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';

interface ProductSectionProps {
  productName: string;
  description: string;
}

export function ProductSection({ productName, description }: ProductSectionProps) {
  return (
    <ScrollFrameAnimator
      framesCount={60}
      framesPath="./products"
      framePrefix={`${productName.toLowerCase()}-`}
      width="60%"
      position="right"
      contentMode="side"
      background="#0a192f"
    >
      <div>
        <h2>{productName}</h2>
        <p>{description}</p>
      </div>
    </ScrollFrameAnimator>
  );
}
```
