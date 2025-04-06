'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// Detect if device is mobile/low-end
const isMobileOrLowEnd = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || !window.matchMedia('(min-resolution: 2dppx)').matches;
};

interface LightningTextProps {
  text: string;
  className?: string;
}

const LightningText = ({ text, className = '' }: LightningTextProps) => {
  const [isHovered, setIsHovered] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const letters = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    setIsMobile(isMobileOrLowEnd());
    const handleResize = () => setIsMobile(isMobileOrLowEnd());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const letterVariants = useMemo(() => ({
    initial: {
      opacity: 0.7,
      textShadow: '0 0 0px rgba(59, 130, 246, 0)',
      scale: 1
    },
    hover: {
      opacity: 1,
      textShadow: isMobile ? [
        '0 0 10px rgba(59, 130, 246, 0.6)',
        '0 0 20px rgba(59, 130, 246, 0.6)',
        '0 0 10px rgba(59, 130, 246, 0.6)'
      ] : [
        '0 0 20px rgba(59, 130, 246, 0.8)',
        '0 0 40px rgba(59, 130, 246, 0.8)',
        '0 0 60px rgba(59, 130, 246, 0.8)',
        '0 0 40px rgba(59, 130, 246, 0.8)',
        '0 0 20px rgba(59, 130, 246, 0.8)'
      ],
      scale: isMobile ? [1, 1.1, 1] : [1, 1.2, 1],
      transition: {
        duration: isMobile ? 0.2 : 0.3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }), [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHovered(prev => {
        const next = Math.floor(Math.random() * letters.length);
        return next === prev ? (next + 1) % letters.length : next;
      });
    }, isMobile ? 300 : 200);

    return () => clearInterval(interval);
  }, [letters.length, isMobile]);

  return (
    <div className={`flex justify-center items-center space-x-1 ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="initial"
          animate={isHovered === index ? "hover" : "initial"}
          className="inline-block text-gradient"
          style={{ 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default LightningText;