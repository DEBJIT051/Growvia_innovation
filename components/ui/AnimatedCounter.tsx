"use client";

import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  targetValue, 
  suffix = '', 
  className,
  duration = 2000 // 2-second animation duration
}) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  // Observer to check if the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  // Animation effect
  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);
      
      const currentVal = Math.floor(progress * targetValue);
      setCount(currentVal);

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 25); // ~40 frames per second

    return () => clearInterval(timer);
  }, [isInView, targetValue, duration]);

  return (
    <h3 className={className} ref={ref}>
      {count}{suffix}
    </h3>
  );
};

export default AnimatedCounter;