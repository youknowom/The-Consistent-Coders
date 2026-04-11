import gsap from 'gsap';

/**
 * Safely animate elements only if they exist
 * Prevents GSAP "target not found" warnings
 */
export const safeGsapTo = (
  target: gsap.TweenTarget,
  vars: gsap.TweenVars
): gsap.core.Tween | null => {
  const elements = gsap.utils.toArray(target);
  if (elements.length === 0) {
    console.warn(`GSAP target not found: ${target}`);
    return null;
  }
  return gsap.to(target, vars);
};

export const safeGsapFrom = (
  target: gsap.TweenTarget,
  vars: gsap.TweenVars
): gsap.core.Tween | null => {
  const elements = gsap.utils.toArray(target);
  if (elements.length === 0) {
    console.warn(`GSAP target not found: ${target}`);
    return null;
  }
  return gsap.from(target, vars);
};

export const safeGsapFromTo = (
  target: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars
): gsap.core.Tween | null => {
  const elements = gsap.utils.toArray(target);
  if (elements.length === 0) {
    console.warn(`GSAP target not found: ${target}`);
    return null;
  }
  return gsap.fromTo(target, fromVars, toVars);
};

/**
 * Check if element exists before animating
 */
export const elementExists = (selector: string): boolean => {
  return document.querySelector(selector) !== null;
};
