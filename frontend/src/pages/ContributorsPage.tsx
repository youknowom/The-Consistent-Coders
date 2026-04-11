import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

import yashImg from '../assets/images/yash.webp';
import hassanImg from '../assets/images/hassan.png';

interface Contributor {
  id: string;
  name: string;
  role: 'Architect' | 'Builder' | 'Fresher';
  specialty: string;
  points: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
}

const TOP_CONTRIBUTORS: Contributor[] = [
  { 
    id: 'C-002', 
    name: 'Hassan Kazi', 
    role: 'Builder', 
    specialty: 'Founder & Lead Builder', 
    points: '9999 EXP', 
    avatar: hassanImg,
    linkedin: 'https://www.linkedin.com/in/erhassankazi/',
    github: 'https://github.com/ANDROIDHASSAN'
  },
  { 
    id: 'C-001', 
    name: 'Yash Mahajan', 
    role: 'Architect', 
    specialty: 'Full Stack Development', 
    points: '8500 EXP', 
    avatar: yashImg,
    linkedin: 'https://www.linkedin.com/in/yash-mahajan-045380289/',
    github: 'https://github.com/yaassshhhhh'
  }
];

const WALL_OF_FAME: Contributor[] = [
  { id: 'C-004', name: 'Join The Mission', role: 'Fresher', specialty: 'Frontend', points: '50 EXP', avatar: '+' },
  { id: 'C-005', name: 'Join The Mission', role: 'Fresher', specialty: 'Backend', points: '80 EXP', avatar: '+' }
];

export const ContributorsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.from('.honor-title span', { y: 100, opacity: 0, duration: 1.5, stagger: 0.1, ease: 'power4.out' });
       gsap.from('.honor-tag', { y: -20, opacity: 0, duration: 1, delay: 0.8 });
       
       gsap.fromTo('.contributor-main-card', 
          { opacity: 0, scale: 0.95, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'expo.out' }
       );

       // 3D Card Tilt Interaction
       const card = cardRef.current;
       if (card) {
          card.addEventListener('mousemove', (e) => {
             const rect = card.getBoundingClientRect();
             const x = e.clientX - rect.left;
             const y = e.clientY - rect.top;
             const centerX = rect.width / 2;
             const centerY = rect.height / 2;
             const rotateX = (y - centerY) / 25;
             const rotateY = (centerX - x) / 25;

             gsap.to(card, {
                rotateX,
                rotateY,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
             });
          });

          card.addEventListener('mouseleave', () => {
             gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 });
          });
       }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="contributors-page theme-black" style={{ minHeight: '100vh', paddingTop: '160px', overflow: 'hidden' }}>
      {/* BACKGROUND DECOR */}
      <div style={{ position: 'fixed', top: '20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(204,255,0,0.03) 0%, transparent 70%)', zIndex: 0 }}></div>

      {/* HERO */}
      <section style={{ padding: '0 2rem 8rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
         <h1 className="honor-title serif-text" style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', lineHeight: '0.8', marginBottom: '2rem' }}>
            <span style={{ display: 'inline-block' }}>Hall of </span> <br />
            <span className="accent-text italic-serif" style={{ display: 'inline-block' }}>Honor</span>
         </h1>
         <p className="mono-text" style={{ fontSize: '0.9rem', opacity: 0.4, letterSpacing: '0.1em' }}>RECOGNIZING THE ARCHITECTS OF THE ECOSYSTEM</p>
      </section>

      {/* FEATURED ARCHITECTS */}
      <section style={{ padding: '0 2rem 12rem', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
         <div style={{ maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '3rem' }}>
            {TOP_CONTRIBUTORS.map((c) => (
               <div key={c.id} className="contributor-main-card" style={{ 
                  background: 'rgba(255,255,255,0.015)', 
                  backdropFilter: 'blur(40px)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  borderRadius: '40px', 
                  padding: '5rem 3.5rem',
                  position: 'relative'
               }}>
                  {/* Tag */}
                  <div className="honor-tag" style={{ position: 'absolute', top: '-1.5rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-accent)', color: 'var(--color-black)', padding: '0.8rem 2.5rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 950, letterSpacing: '0.2em', boxShadow: '0 20px 40px rgba(204,255,0,0.2)' }}>
                     PLATFORM ARCHITECT
                  </div>

                  <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                     {/* Image Side */}
                     <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(204,255,0,0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: -1 }}></div>
                        <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '4px solid var(--color-accent)', overflow: 'hidden', boxShadow: '0 0 60px rgba(204,255,0,0.1)' }}>
                           <img src={c.avatar} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                     </div>

                     {/* Bio Side */}
                     <div style={{ textAlign: 'left', flex: 1, minWidth: '250px' }}>
                        <h2 className="serif-text" style={{ fontSize: '2.5rem', lineHeight: '1', color: '#fff', marginBottom: '0.5rem' }}>{c.name}</h2>
                        <p className="mono-text accent-text" style={{ fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{c.specialty.toUpperCase()}</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                           <div>
                              <p className="mono-text" style={{ fontSize: '0.65rem', opacity: 0.4 }}>RANK</p>
                              <p className="serif-text" style={{ fontSize: '1.5rem', color: '#fff' }}>{c.role}</p>
                           </div>
                           <div>
                              <p className="mono-text" style={{ fontSize: '0.65rem', opacity: 0.4 }}>REPUTATION</p>
                              <p className="serif-text accent-text" style={{ fontSize: '1.5rem' }}>{c.points}</p>
                           </div>
                        </div>

                        {/* Social Links */}
                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem' }}>
                           {c.github && <a href={c.github} target="_blank" className="mono-text social-link" style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.6, textDecoration: 'none', position: 'relative' }}>GITHUB ↝</a>}
                           {c.linkedin && <a href={c.linkedin} target="_blank" className="mono-text social-link" style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.6, textDecoration: 'none', position: 'relative' }}>LINKEDIN ↝</a>}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* WALL OF FAME */}
      <section style={{ padding: '0 2rem 12rem', position: 'relative', zIndex: 1 }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h3 className="serif-text" style={{ fontSize: '3rem', marginBottom: '4rem', opacity: 0.8 }}>The Wall of Fame</h3>
            <div className="wall-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
               {WALL_OF_FAME.map(c => (
                  <div key={c.id} className="wall-item" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'all 0.4s ease' }}>
                     <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{c.name.charAt(0)}</div>
                     <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{c.name}</h4>
                        <p style={{ fontSize: '0.8rem', opacity: 0.4 }}>{c.specialty}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div style={{ marginTop: '10rem', textAlign: 'center' }}>
               <h4 className="serif-text" style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>Ready to be <span className="accent-text italic-serif">Honored?</span></h4>
               <Link to="/join" className="btn-primary btn-large">
                  <span className="btn-text">JOIN THE MISSION →</span>
                  <div className="btn-bg"></div>
               </Link>
            </div>
         </div>
      </section>

      <Footer />

      <style>{`
         .contributor-main-card { transition: box-shadow 0.5s ease; }
         .contributor-main-card:hover { 
            box-shadow: 0 60px 120px rgba(0,0,0,0.8), 0 0 100px rgba(204,255,0,0.05); 
            border-color: rgba(204,255,0,0.2);
         }
         .wall-item:hover { transform: translateY(-5px); border-color: rgba(204,255,0,0.2) !important; background: rgba(204,255,0,0.02) !important; }
         .italic-serif { font-family: var(--font-serif); font-style: italic; text-transform: none; }
         
         .social-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 1px;
            background: var(--color-accent);
            transition: width 0.4s var(--ease-out-expo);
         }
         .social-link:hover::after {
            width: 100%;
         }
         .social-link:hover {
            opacity: 1 !important;
            color: var(--color-accent) !important;
         }
      `}</style>
    </div>
  );
};
