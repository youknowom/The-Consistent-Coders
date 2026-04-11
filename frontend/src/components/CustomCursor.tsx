import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorFollowImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't render custom cursor on mobile/tablet devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;

    if (isTouchDevice || isMobile) {
      return;
    }

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    const cursorFollowImg = cursorFollowImgRef.current;

    if (!cursorDot || !cursorRing) return;

    // GSAP quickTo for near-zero-lag tracking
    const xDot = gsap.quickTo(cursorDot, 'x', { duration: 0.05, ease: 'power3' });
    const yDot = gsap.quickTo(cursorDot, 'y', { duration: 0.05, ease: 'power3' });
    const xRing = gsap.quickTo(cursorRing, 'x', { duration: 0.25, ease: 'power3' });
    const yRing = gsap.quickTo(cursorRing, 'y', { duration: 0.25, ease: 'power3' });

    let xImg: ((value: number) => void) | undefined;
    let yImg: ((value: number) => void) | undefined;

    if (cursorFollowImg) {
      xImg = gsap.quickTo(cursorFollowImg, 'x', { duration: 0.1, ease: 'power2' });
      yImg = gsap.quickTo(cursorFollowImg, 'y', { duration: 0.1, ease: 'power2' });
    }

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      if (xImg) xImg(e.clientX);
      if (yImg) yImg(e.clientY);
    };

    const handleMouseDown = () => cursorDot.classList.add('clicking');
    const handleMouseUp = () => cursorDot.classList.remove('clicking');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hover targets
    const hoverTargets =
      'a, button, .btn-primary, .magnetic, .craft-card, .work-item, .footer-email, .menu-link, [data-cursor-text]';
    const cTextEl = document.getElementById('cursor-text');

    const handleMouseEnter = (el: Element) => () => {
      cursorDot.classList.add('hovered');
      cursorRing.classList.add('hovered');

      const text = el.getAttribute('data-cursor-text');
      if (text && cTextEl) {
        cTextEl.textContent = text;
        cursorRing.classList.add('has-text');
        cursorDot.style.opacity = '0';
      }
    };

    const handleMouseLeave = () => {
      cursorDot.classList.remove('hovered');
      cursorRing.classList.remove('hovered');
      cursorRing.classList.remove('has-text');
      cursorDot.style.opacity = '';
    };

    const elements = document.querySelectorAll(hoverTargets);
    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter(el));
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter(el));
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="custom-cursor-dot" id="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-ring" id="cursor-ring" ref={cursorRingRef}>
        <span className="cursor-text" id="cursor-text"></span>
      </div>
      <div className="cursor-follow-image" id="cursor-follow-img" ref={cursorFollowImgRef}>
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" />
      </div>
    </>
  );
};
