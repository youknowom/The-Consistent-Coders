import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Curtain Transition (Default)
export const curtainTransition = {
  name: 'curtain-transition',
  async leave(data: any) {
    const done = this.async();
    const panels = document.querySelectorAll('.curtain-panel');
    
    await gsap.timeline()
      .set('.transition-curtain', { display: 'flex' })
      .to(panels, {
        scaleY: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.inOut',
      })
      .to(data.current.container, {
        opacity: 0,
        duration: 0.2,
      }, '-=0.3');
    
    done();
  },
  async enter(data: any) {
    const done = this.async();
    
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    const panels = document.querySelectorAll('.curtain-panel');
    
    await gsap.timeline()
      .set(data.next.container, { opacity: 0 })
      .to(data.next.container, {
        opacity: 1,
        duration: 0.3,
      })
      .to(panels, {
        scaleY: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.inOut',
      }, '-=0.1')
      .set('.transition-curtain', { display: 'none' });
    
    done();
  },
};

// Liquid Transition
export const liquidTransition = {
  name: 'liquid-transition',
  async leave(data: any) {
    const done = this.async();
    
    await gsap.timeline()
      .to(data.current.container, {
        opacity: 0,
        scale: 0.95,
        filter: 'url(#liquid)',
        duration: 0.6,
        ease: 'power2.inOut',
      });
    
    done();
  },
  async enter(data: any) {
    const done = this.async();
    
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    await gsap.timeline()
      .set(data.next.container, { 
        opacity: 0, 
        scale: 1.05,
        filter: 'url(#liquid)',
      })
      .to(data.next.container, {
        opacity: 1,
        scale: 1,
        filter: 'none',
        duration: 0.6,
        ease: 'power2.out',
      });
    
    done();
  },
};

// Slide Transition
export const slideTransition = {
  name: 'slide-transition',
  async leave(data: any) {
    const done = this.async();
    
    await gsap.to(data.current.container, {
      x: '-100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
    
    done();
  },
  async enter(data: any) {
    const done = this.async();
    
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    await gsap.timeline()
      .set(data.next.container, { x: '100%', opacity: 0 })
      .to(data.next.container, {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    
    done();
  },
};

// Fade Transition
export const fadeTransition = {
  name: 'fade-transition',
  async leave(data: any) {
    const done = this.async();
    
    await gsap.to(data.current.container, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
    
    done();
  },
  async enter(data: any) {
    const done = this.async();
    
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    await gsap.timeline()
      .set(data.next.container, { opacity: 0 })
      .to(data.next.container, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    
    done();
  },
};

// Zoom Transition
export const zoomTransition = {
  name: 'zoom-transition',
  async leave(data: any) {
    const done = this.async();
    
    await gsap.to(data.current.container, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
    
    done();
  },
  async enter(data: any) {
    const done = this.async();
    
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    await gsap.timeline()
      .set(data.next.container, { scale: 1.2, opacity: 0 })
      .to(data.next.container, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    
    done();
  },
};
