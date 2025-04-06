import { useEffect, useState } from 'react';

export const getDeviceCapabilities = ({ forceSSR = false } = {}) => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const supportsWebGL = (() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  })();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/mobile|android|iphone|ipad|ipod/.test(userAgent));
    setIsLowEnd(/low-end|android|iphone/.test(userAgent));
  }, []);

  return {
    isLowEnd,
    isMobile,
    supportsWebGL,
  };
};

export const getAnimationConfig = ({ forceSSR = false } = {}) => {
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches || forceSSR,
  };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};