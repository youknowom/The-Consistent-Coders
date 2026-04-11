import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollOptions {
  enableLocomotiveScroll?: boolean;
  duration?: number;
  lerp?: number;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const {
    enableLocomotiveScroll = true,
    duration = 1.2,
    lerp = 0.1,
  } = options;

  const lenisRef = useRef<Lenis | null>(null);
  const locomotiveRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp,
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Initialize Locomotive Scroll if enabled
    if (enableLocomotiveScroll) {
      const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          duration,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          lerp,
          smoothWheel: true,
        },
      });

      locomotiveRef.current = locomotiveScroll;
    }

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Animation loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Refresh ScrollTrigger
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      lenis.destroy();
      if (locomotiveRef.current) {
        locomotiveRef.current.destroy();
      }
    };
  }, [duration, lerp, enableLocomotiveScroll]);

  return { lenisRef, locomotiveRef };
};
