import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Comparator: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const afterWrapperRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const compTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      compTl
        .fromTo(afterWrapperRef.current, { width: '0%' }, { width: '100%', ease: 'none', duration: 1 }, 0)
        .fromTo(handleRef.current, { left: '0%' }, { left: '100%', ease: 'none', duration: 1 }, 0);

      // Text swap at midpoint
      if (textRef.current) {
        gsap.set(textRef.current, { innerText: 'BEFORE TCC' });
        compTl.set(textRef.current, { innerText: 'AFTER TCC' }, 0.5);
        compTl.set(textRef.current, { innerText: 'BEFORE TCC' }, 0.49);
      }

      // Reveal fade
      gsap.utils.toArray<HTMLElement>('.comparator-inner.reveal-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-comparator theme-dark" ref={sectionRef}>
      <div className="comparator-inner reveal-fade">
        <img
          src="./src/assets/images/before/after%20tcc/beforetcc.png"
          className="comp-img comp-before"
          crossOrigin="anonymous"
          alt="Before TCC"
        />
        <div className="comp-after-wrapper" ref={afterWrapperRef}>
          <img
            src="./src/assets/images/before/after%20tcc/after%20tcc.png"
            className="comp-img comp-after"
            crossOrigin="anonymous"
            alt="After TCC"
          />
        </div>
        <div className="comp-handle" ref={handleRef}></div>
        <div className="comp-dynamic-text" id="compDynamicText" ref={textRef}>
          BEFORE TCC
        </div>
      </div>
      <p className="mono-text mt-2 text-center" style={{ opacity: 0.5 }}>
        // THE TRANSFORMATION
      </p>
    </section>
  );
};
