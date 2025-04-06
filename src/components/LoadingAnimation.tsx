'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  getDeviceCapabilities, 
  getAnimationConfig,
  memoizedComputation,
  limitedRAF
} from '../utils/performance';
import { useAnimationControls } from '../hooks/useAnimationControls';

interface LoadingAnimationProps {
  onLoadComplete?: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onLoadComplete }) => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const { controls, startAnimation } = useAnimationControls();
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const cacheKey = useRef({}).current;

  // Get device capabilities and animation config
  const deviceCaps = useMemo(() => getDeviceCapabilities({ forceSSR: !mounted }), [mounted]);
  const animConfig = useMemo(() => getAnimationConfig({ forceSSR: !mounted }), [mounted]);

  // Memoized configuration based on device capabilities
  const config = useMemo(() => ({
    size: deviceCaps.isMobile ? {
      container: 'w-32 h-32',
      svg: 'w-32 h-32',
      radius: 48,
      center: 64,
      rings: 3,
      particles: 4
    } : deviceCaps.isLowEnd ? {
      container: 'w-36 h-36',
      svg: 'w-36 h-36',
      radius: 54,
      center: 72,
      rings: 3,
      particles: 6
    } : {
      container: 'w-40 h-40',
      svg: 'w-40 h-40',
      radius: 60,
      center: 80,
      rings: 4,
      particles: 8
    }
  }), [deviceCaps]);

  // Calculate particle positions once and memoize
  const particlePositions = useMemo(() => {
    const computePositions = () => 
      Array.from({ length: config.size.particles }).map((_, i) => {
        const angle = (i * 360) / config.size.particles;
        const radius = deviceCaps.isMobile ? 48 : 60;
        return {
          x: Math.cos((angle * Math.PI) / 180) * radius,
          y: Math.sin((angle * Math.PI) / 180) * radius
        };
      });

    return memoizedComputation(
      computePositions,
      [config.size.particles, deviceCaps.isMobile],
      cacheKey
    );
  }, [config.size.particles, deviceCaps.isMobile, cacheKey]);

  // Handle mounting and cleanup
  useEffect(() => {
    setMounted(true);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, []);

  // Initialize animations after mount
  useEffect(() => {
    if (!mounted) return;

    // Start fade-in animation using RAF limiting
    const startFadeIn = () => {
      void startAnimation({
        opacity: 1,
        scale: 1
      }, { duration: animConfig.duration });
    };

    const rafId = limitedRAF(startFadeIn, animConfig.targetFPS);

    // Start progress animation with optimized interval
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (deviceCaps.isLowEnd ? 4 : 2);
        if (newProgress >= 100) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
          }
          onLoadComplete?.();
          return 100;
        }
        return newProgress;
      });
    }, deviceCaps.isLowEnd ? 20 : 40);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      cancelAnimationFrame(rafId);
    };
  }, [mounted, startAnimation, animConfig, deviceCaps.isLowEnd, onLoadComplete]);

  if (!mounted) return null;

  const { size } = config;

  return (
    <motion.div 
      className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        {/* Progress Ring */}
        <svg className={`${size.svg} transform -rotate-90`}>
          <circle
            className="text-accent/20"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r={size.radius}
            cx={size.center}
            cy={size.center}
          />
          <motion.circle
            className="text-accent"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r={size.radius}
            cx={size.center}
            cy={size.center}
            strokeDasharray={`${2 * Math.PI * size.radius}`}
            strokeDashoffset={2 * Math.PI * size.radius * (1 - progress / 100)}
            strokeLinecap="round"
          />
        </svg>

        {/* Progress Text */}
        <motion.div
          className={`absolute ${
            deviceCaps.isMobile ? '-bottom-12' : '-bottom-16'
          } left-1/2 transform -translate-x-1/2 text-accent font-medium ${
            deviceCaps.isMobile ? 'text-base' : 'text-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className={`text-accent/80 ${deviceCaps.isMobile ? 'text-xs' : 'text-sm'}`}>
              Loading Experience
            </div>
            <div className="font-bold">{progress}%</div>
          </div>
        </motion.div>

        {/* Optimized Particle Effects */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-accent/50"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 0],
            }}
            transition={{
              duration: deviceCaps.isLowEnd ? 3 : 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * (deviceCaps.isLowEnd ? 0.2 : 0.1),
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
