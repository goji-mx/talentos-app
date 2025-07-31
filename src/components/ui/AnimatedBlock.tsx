import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedBlockProps {
  show: boolean;
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

const AnimatedBlock: React.FC<AnimatedBlockProps> = ({
  show,
  children,
  duration = 0.4,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (show) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration,
          delay,
          ease: 'power2.out',
        }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: duration * 0.75,
        ease: 'power2.inOut',
      });
    }
  }, [show]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      {show && children}
    </div>
  );
};

export default AnimatedBlock;