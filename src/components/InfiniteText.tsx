'use client';
import { motion } from 'framer-motion';
import { useMemo, memo } from 'react';

const iconPaths = {
  react: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z',
  next: 'M12 2L2 19h20L12 2zm0 4l7.5 13h-15L12 6z',
  typescript: 'M3 3h18v18H3V3zm9 11v-1h2v1c0 1 .5 2 2 2s2-1 2-2-.5-2-2-2c-3 0-4-1.5-4-3s1-3 4-3c2.5 0 4 1.5 4 3v1h-2V9c0-1-.5-2-2-2s-2 1-2 2 .5 2 2 2c3 0 4 1.5 4 3s-1 3-4 3c-2.5 0-4-1.5-4-3z',
  node: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  python: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
  ai: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
  cloud: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z',
  devops: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.83.91 6.6 2.4M21 3v6h-6',
  security: 'M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z',
  data: 'M21 5H3v14h18V5zm-2 12H5V7h14v10z'
} as const;

type TechIconType = keyof typeof iconPaths;

interface Technology {
  name: string;
  color: string;
  icon: TechIconType;
}

const TechIcon = memo(({ type }: { type: TechIconType }) => {
  const size = 24;
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d={iconPaths[type]} />
    </svg>
  );
});

TechIcon.displayName = 'TechIcon';

const InfiniteText = () => {
  const technologies = useMemo<Technology[]>(() => [
    { name: 'React', color: '#00f2fe', icon: 'react' },
    { name: 'Next.js', color: '#4facfe', icon: 'next' },
    { name: 'TypeScript', color: '#7d5fff', icon: 'typescript' },
    { name: 'Node.js', color: '#00f2fe', icon: 'node' },
    { name: 'Python', color: '#4facfe', icon: 'python' },
    { name: 'AI/ML', color: '#7d5fff', icon: 'ai' },
    { name: 'Cloud', color: '#00f2fe', icon: 'cloud' },
    { name: 'DevOps', color: '#4facfe', icon: 'devops' },
    { name: 'Security', color: '#7d5fff', icon: 'security' },
    { name: 'Data', color: '#00f2fe', icon: 'data' },
  ], []);

  const reversedTechnologies = useMemo(() => [...technologies].reverse(), [technologies]);

  return (
    <div className="relative w-full overflow-hidden py-12 bg-gradient-to-r from-background via-accent/5 to-background">
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent z-10" />
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Cosmic background effects */}
      <div className="absolute inset-0 tech-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-30" />

      {/* First row - moving right */}
      <div className="flex space-x-16 mb-12">
        <motion.div
          className="flex space-x-16 whitespace-nowrap"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...technologies, ...technologies].map((tech, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-3 px-6 py-3 rounded-lg bg-background/30 backdrop-blur-sm border border-primary/20"
              whileHover={{
                y: -5,
                scale: 1.05,
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                style={{ color: tech.color }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TechIcon type={tech.icon} />
              </motion.div>
              <motion.span
                className="text-lg font-mono font-medium tracking-wide"
                style={{ color: tech.color }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {tech.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second row - moving left */}
      <div className="flex space-x-16">
        <motion.div
          className="flex space-x-16 whitespace-nowrap"
          animate={{
            x: [-1920, 0],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {[...reversedTechnologies, ...reversedTechnologies].map((tech, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-3 px-6 py-3 rounded-lg bg-background/30 backdrop-blur-sm border border-primary/20"
              whileHover={{
                y: 5,
                scale: 1.05,
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                style={{ color: tech.color }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TechIcon type={tech.icon} />
              </motion.div>
              <motion.span
                className="text-lg font-mono font-medium tracking-wide"
                style={{ color: tech.color }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {tech.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteText;