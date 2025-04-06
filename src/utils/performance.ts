// Performance utilities for optimizing animations and rendering

interface DeviceCapabilities {
  isLowEnd: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  supportsWebGL: boolean;
}

interface DeviceCapabilitiesOptions {
  forceSSR?: boolean;
}

// Default options for device capabilities
const defaultDeviceOptions: DeviceCapabilitiesOptions = {
  forceSSR: false
};

// Detect WebGL support
const detectWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// Device capabilities detection
export const getDeviceCapabilities = (options = { forceSSR: false }) => {
  if (typeof window === 'undefined' || options.forceSSR) {
    return {
      isMobile: false,
      isLowEnd: false,
      supportsWebGL: true,
      prefersReducedMotion: false
    };
  }

  const isMobile = window.innerWidth < 768;
  const isLowEnd = !window.matchMedia('(min-resolution: 2dppx)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    isMobile,
    isLowEnd,
    supportsWebGL: detectWebGLSupport(),
    prefersReducedMotion
  };
};

// Animation configuration based on device capabilities
export const getAnimationConfig = (options = { forceSSR: false }) => {
  const caps = getDeviceCapabilities(options);
  return {
    reducedMotion: caps.prefersReducedMotion,
    duration: caps.isLowEnd ? 0.3 : 0.5,
    ease: caps.isLowEnd ? [0.25, 0.1, 0.25, 1] : [0.43, 0.13, 0.23, 0.96]
  };
};

// Memoization cache interface
interface MemoCache<T> {
  deps: any[];
  result: T;
}

// Default cache key for memoization
const DEFAULT_CACHE_KEY = {};

// Optimize heavy computations with proper TypeScript support
export function memoizedComputation<T>(
  computation: () => T,
  dependencies: any[],
  cacheKey: object = DEFAULT_CACHE_KEY
): T {
  const cache = new WeakMap<object, MemoCache<T>>();

  const cached = cache.get(cacheKey);
  if (cached && dependencies.every((dep, i) => dep === cached.deps[i])) {
    return cached.result;
  }

  const result = computation();
  cache.set(cacheKey, { deps: [...dependencies], result });
  return result;
}

// Throttle function for performance-critical event handlers
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastResult: ReturnType<T>;
  
  return function(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
    return lastResult;
  };
}

// Debounce function for handling resize events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function(this: any, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// RAF callback type
type RAFCallback = (timestamp: number) => void;

// RequestAnimationFrame with FPS limiting
export const limitedRAF = (callback: RAFCallback, targetFPS: number = 60): number => {
  const frameInterval = 1000 / targetFPS;
  let lastFrameTime = 0;

  const animate = (timestamp: number) => {
    if (timestamp - lastFrameTime >= frameInterval) {
      callback(timestamp);
      lastFrameTime = timestamp;
    }
    return requestAnimationFrame(animate);
  };

  return requestAnimationFrame(animate);
};