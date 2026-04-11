import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BarbaWrapperProps {
  children: React.ReactNode;
}

export const BarbaWrapper: React.FC<BarbaWrapperProps> = ({ children }) => {
  const location = useLocation();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Page transition animation on route change
    const panels = document.querySelectorAll('.curtain-panel');
    
    if (panels.length === 0) {
      // If curtain panels don't exist, just scroll to top and refresh
      window.scrollTo(0, 0);
      setTimeout(() => ScrollTrigger.refresh(), 100);
      return;
    }
    
    const animatePageTransition = async () => {
      try {
        // Note: Do not use ScrollTrigger.getAll().kill() here.
        // React's cleanup functions in child components handle their own revert().
        // Animate curtain panels coming down (covering the page)
        await gsap.timeline()
          .set('.transition-curtain', { display: 'flex' })
          .to(panels, {
            scaleY: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.inOut',
          });
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Wait for content to render
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Refresh ScrollTrigger after content is ready
        ScrollTrigger.refresh();
        
        // Animate curtain panels going up (revealing the new page)
        await gsap.timeline()
          .to(panels, {
            scaleY: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.inOut',
          })
          .set('.transition-curtain', { display: 'none' });
      } catch (error) {
        console.warn('Page transition error:', error);
        // If animation fails, just ensure we scroll to top
        window.scrollTo(0, 0);
        gsap.set('.transition-curtain', { display: 'none' });
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    };
    
    animatePageTransition();
  }, [location.pathname]);

  return <>{children}</>;
};
