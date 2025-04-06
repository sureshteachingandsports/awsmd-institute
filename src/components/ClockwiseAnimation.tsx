'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  getDeviceCapabilities, 
  getAnimationConfig,
  memoizedComputation
} from '../utils/performance';

interface ClockwiseAnimationProps {
  className?: string;
  children?: React.ReactNode;
}

const ClockwiseAnimation: React.FC<ClockwiseAnimationProps> = ({ className = '', children }) => {
  const [mounted, setMounted] = useState(false);
  const cacheKey = useRef({}).current;

  // Get device capabilities and animation config
  const deviceCaps = useMemo(() => getDeviceCapabilities({ forceSSR: !mounted }), [mounted]);
  const animConfig = useMemo(() => getAnimationConfig({ forceSSR: !mounted }), [mounted]);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate animation parameters
  const animationParams = useMemo(() => {
    const computeParams = () => ({
      duration: deviceCaps.isLowEnd ? 20 : 15,
      size: deviceCaps.isMobile ? 'w-32 h-32' : 'w-40 h-40',
      delay: deviceCaps.isLowEnd ? 0.2 : 0.1
    });

    return memoizedComputation(
      computeParams,
      [deviceCaps.isLowEnd, deviceCaps.isMobile]
    );
  }, [deviceCaps.isLowEnd, deviceCaps.isMobile]);

  if (!mounted) return null;

  return (
    <motion.div
      className={`relative ${animationParams.size} ${className}`}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ 
        opacity: 1,
        rotate: animConfig.reducedMotion ? 0 : 360
      }}
      transition={{
        duration: animationParams.duration,
        repeat: Infinity,
        ease: animConfig.ease,
        delay: animationParams.delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default ClockwiseAnimation;