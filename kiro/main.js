import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

gsap.registerPlugin(ScrollTrigger);

// ========== INITIALIZE SPLITTING ==========
Splitting();

// ========== PRELOADER ==========
let loadProgress = 0;
const preloader = document.querySelector('.preloader');
const counterNumber = document.querySelector('.counter-number');
const barFill = document.querySelector('.preloader-bar-fill');

const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 10;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    setTimeout(hidePreloader, 500);
  }
  
  counterNumber.textContent = Math.floor(loadProgress);
  barFill.style.width = loadProgress + '%';
}, 100);

function hidePreloader() {
  gsap.to(preloader, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      preloader.style.display = 'none';
      initAnimations();
    }
  });
}

// ========== CUSTOM CURSOR ==========
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  dotX += (mouseX - dotX) * 0.3;
  dotY += (mouseY - dotY) * 0.3;
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  
  cursorDot.style.left = dotX + 'px';
  cursorDot.style.top = dotY + 'px';
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorRing, { width: 60, height: 60, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorRing, { width: 40, height: 40, duration: 0.3 });
  });
});

// ========== SOUND TOGGLE ==========
const soundToggle = document.querySelector('.sound-toggle');
let soundEnabled = false;

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.classList.toggle('muted');
});

// ========== SCROLL PROGRESS ==========
const progressCircle = document.querySelector('.progress-ring-circle');
const progressText = document.querySelector('.progress-text');
const circumference = 2 * Math.PI * 28;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  const offset = circumference - (scrollPercent / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
  progressText.textContent = Math.round(scrollPercent) + '%';
});

// ========== THREE.JS HERO BACKGROUND ==========
function initHeroCanvas() {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 5;

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x1D9E75,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });
  
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ========== PROJECT CANVASES ==========
function initProjectCanvases() {
  const projectCanvases = document.querySelectorAll('.project-canvas');
  
  projectCanvases.forEach((canvas, index) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.position.z = 3;

    // Create gradient mesh
    const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: index === 0 ? 0x1D9E75 : index === 1 ? 0x7F77DD : 0xD85A30,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();
  });
}

// ========== MEMBER CANVASES ==========
function initMemberCanvases() {
  const memberCanvases = document.querySelectorAll('.member-canvas');
  
  memberCanvases.forEach((canvas, index) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    camera.position.z = 3;

    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: index === 0 ? 0x1D9E75 : index === 1 ? 0x7F77DD : 0xD85A30,
      wireframe: true
    });
    
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });
}

// ========== CONTACT CANVAS ==========
function initContactCanvas() {
  const canvas = document.querySelector('.contact-canvas');
  if (!canvas) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 5;

  const geometry = new THREE.IcosahedronGeometry(2, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x1D9E75,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.003;
    renderer.render(scene, camera);
  }
  animate();
}

// ========== MAGNETIC EFFECT ==========
document.querySelectorAll('[data-magnetic]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  });
});

// ========== SCROLL ANIMATIONS ==========
function initAnimations() {
  // Hero animations
  gsap.from('.hero-chapter', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3
  });
  
  gsap.from('.hero-title .word', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: 0.5,
    ease: 'power4.out'
  });
  
  gsap.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1.2
  });
  
  gsap.from('.hero-cta', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1.5
  });

  // Stat counters
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.dataset.count);
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            stat.textContent = Math.floor(this.targets()[0].val);
          }
        });
      }
    });
  });

  // Project cards
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: 'power3.out'
    });
  });

  // Team members
  gsap.utils.toArray('.team-member').forEach((member, i) => {
    gsap.from(member, {
      scrollTrigger: {
        trigger: member,
        start: 'top 80%'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: 'power3.out'
    });
  });

  // Capabilities
  gsap.utils.toArray('.capability-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });

  // Initialize Three.js scenes
  initHeroCanvas();
  initProjectCanvases();
  initMemberCanvases();
  initContactCanvas();
}

// ========== SMOOTH SCROLL TO ANCHORS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== MOBILE MENU ==========
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}
