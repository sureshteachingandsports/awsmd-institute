'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { getDeviceCapabilities } from '../utils/performance';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
}

const ScrollReveal = ({ 
  children, 
  width = "fit-content",
  className = "",
  delay = 0 
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const deviceCaps = getDeviceCapabilities();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: deviceCaps.isLowEnd ? 0.3 : 0.5,
          delay,
          ease: deviceCaps.isLowEnd ? [0.25, 0.1, 0.25, 1] : [0.43, 0.13, 0.23, 0.96]
        }
      });
    }
  }, [controls, inView, delay, deviceCaps.isLowEnd]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ width }}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealLeft = ({ 
  children, 
  width = "fit-content",
  className = "",
  delay = 0 
}: ScrollRevealProps) => {
  return (
    <motion.div
      className={className}
      style={{ width }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealRight = ({ 
  children, 
  width = "fit-content",
  className = "",
  delay = 0 
}: ScrollRevealProps) => {
  return (
    <motion.div
      className={className}
      style={{ width }}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealScale = ({ 
  children, 
  width = "fit-content",
  className = "",
  delay = 0 
}: ScrollRevealProps) => {
  return (
    <motion.div
      className={className}
      style={{ width }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;