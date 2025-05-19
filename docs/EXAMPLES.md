# ScrollFrameAnimator Examples

A collection of examples demonstrating how to use the ScrollFrameAnimator component in different scenarios.

## Full Width Animation with Overlay Content

Perfect for hero sections or product showcases where you want the animation to be the background with text content on top:

```jsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';

export default function HeroSection() {
  return (
    <ScrollFrameAnimator
      framesCount={60}
      framesPath="./hero-frames"
      contentMode="overlay"
      background="linear-gradient(to right, #0f0c29, #302b63, #24243e)"
    >
      <div>
        <h1>Introducing Our New Product</h1>
        <p>Scroll down to see the innovative features in action</p>
        <button>Learn More</button>
      </div>
    </ScrollFrameAnimator>
  );
}
```

## Split Layout with Animation on Right

Ideal for product features or storytelling where you want to explain something alongside the animation:

```jsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';

export default function ProductFeature() {
  return (
    <ScrollFrameAnimator
      width="60%"
      position="right"
      framesCount={40}
      framesPath="./feature-frames"
      contentMode="side"
      background="#0a192f"
      height="90vh"
    >
      <div>
        <h2>Seamless Experience</h2>
        <p>
          Our product offers a smooth, intuitive interface that makes complex tasks simple. 
          With advanced AI assistance and real-time feedback, you'll complete projects 
          faster than ever before.
        </p>
        <ul>
          <li>Intelligent suggestions based on your workflow</li>
          <li>Real-time collaboration features</li>
          <li>Cross-platform synchronization</li>
        </ul>
      </div>
    </ScrollFrameAnimator>
  );
}
```

## Custom Sized Animation with Side Content

Perfect for highlighting specific product details:

```jsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';

export default function ProductDetail() {
  return (
    <ScrollFrameAnimator
      width="400px"
      height="400px"
      position="left"
      framesCount={30}
      framesPath="./detail-frames"
      contentMode="side"
      objectFit="contain"
      background="#f8f9fa"
      animationSectionHeight="300dvh"
    >
      <div style={{ color: "#333" }}>
        <h2>Precision Engineering</h2>
        <p>
          Every component is designed with precision and tested thoroughly 
          to ensure the highest quality and durability.
        </p>
        <button>View Specifications</button>
      </div>
    </ScrollFrameAnimator>
  );
}
```

## Multiple Animations on One Page

Create a narrative flow by combining multiple animations:

```jsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';

export default function StoryPage() {
  return (
    <>
      <header>
        <h1>Our Journey</h1>
      </header>
      
      {/* First animation - full width */}
      <ScrollFrameAnimator 
        framesCount={50}
        framesPath="./journey/beginning"
        contentMode="overlay"
        background="#1a1a2e"
      >
        <div>
          <h2>The Beginning</h2>
          <p>How it all started in a small garage...</p>
        </div>
      </ScrollFrameAnimator>
      
      {/* Second animation - right side */}
      <ScrollFrameAnimator 
        width="65%"
        position="right"
        framesCount={45}
        framesPath="./journey/growth"
        contentMode="side"
        background="#16213e"
      >
        <div>
          <h2>Growth Phase</h2>
          <p>Expanding our team and vision...</p>
        </div>
      </ScrollFrameAnimator>
      
      {/* Third animation - left side */}
      <ScrollFrameAnimator 
        width="65%"
        position="left"
        framesCount={40}
        framesPath="./journey/today"
        contentMode="side"
        background="#0f3460"
      >
        <div>
          <h2>Where We Are Today</h2>
          <p>Leading the industry with innovation...</p>
        </div>
      </ScrollFrameAnimator>
      
      <footer>
        <h2>Join Us on Our Mission</h2>
        <button>Contact Us</button>
      </footer>
    </>
  );
}
```

## Responsive Considerations

The component works well across different screen sizes, but consider these tips for responsive design:

- Use percentage values for width when possible
- Consider using media queries to adjust width and position on smaller screens:

```jsx
import { ScrollFrameAnimator } from 'scroll-frame-animator';
import { useEffect, useState } from 'react';

export default function ResponsiveSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return (
    <ScrollFrameAnimator 
      width={isMobile ? "100%" : "60%"}
      position={isMobile ? "center" : "right"}
      contentMode={isMobile ? "overlay" : "side"}
      framesCount={40}
      framesPath="./responsive-frames"
    >
      <div>
        <h2>Responsive Animation</h2>
        <p>This animation adapts to different screen sizes</p>
      </div>
    </ScrollFrameAnimator>
  );
}
```
