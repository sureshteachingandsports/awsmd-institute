'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';

// Detect if device is mobile/low-end
const isMobileOrLowEnd = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || !window.matchMedia('(min-resolution: 2dppx)').matches;
};

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    company: "Google",
    image: "👩‍💻",
    quote: "The practical approach to learning and industry-focused curriculum helped me land my dream job at Google."
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    company: "Amazon",
    image: "👨‍💻",
    quote: "The advanced AI and machine learning courses were exactly what I needed to transition into data science."
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Apple",
    image: "👩‍🎨",
    quote: "The design thinking workshops and hands-on projects gave me the portfolio I needed to break into tech."
  },
  {
    name: "James Wilson",
    role: "Cloud Architect",
    company: "Microsoft",
    image: "👨‍💼",
    quote: "The cloud computing program provided deep insights into modern infrastructure solutions."
  }
];

// Fixed positions for decorative elements
const decorativePositions = [
  { left: '15%', top: '20%' },
  { left: '75%', top: '30%' },
  { left: '45%', top: '80%' },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileOrLowEnd());
    
    const handleResize = () => setIsMobile(isMobileOrLowEnd());
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, isMobile ? 4000 : 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  if (!mounted) return null;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-30" />
      
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Student Success Stories
        </h2>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto px-4">
        <div className="relative h-[400px] md:h-[300px]">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={`absolute inset-0 ${
                index === activeIndex ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                x: index === activeIndex ? 0 : -100,
                scale: index === activeIndex ? 1 : 0.9
              }}
              transition={{ duration: isMobile ? 0.3 : 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-6xl">{testimonial.image}</div>
                  <div className="flex-1">
                    <p className="text-lg md:text-xl mb-6 text-secondary italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold text-gradient">
                        {testimonial.name}
                      </h3>
                      <p className="text-secondary">
                        {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-accent scale-125'
                  : 'bg-accent/30 hover:bg-accent/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements - Fixed positions */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {decorativePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-accent/5"
              style={position}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;