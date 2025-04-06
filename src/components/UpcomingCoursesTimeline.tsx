'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface Course {
  title: string;
  startDate: string;
  duration: string;
  description: string;
  icon: string;
  tags: string[];
}

const upcomingCourses: Course[] = [
  {
    title: "Advanced Web Development",
    startDate: "March 1, 2024",
    duration: "12 weeks",
    description: "Master modern web technologies including React, Node.js, and cloud deployment.",
    icon: "💻",
    tags: ["React", "Node.js", "Cloud"]
  },
  {
    title: "Data Science & AI",
    startDate: "March 15, 2024",
    duration: "16 weeks",
    description: "Learn machine learning, data analysis, and artificial intelligence fundamentals.",
    icon: "🤖",
    tags: ["Python", "ML", "AI"]
  },
  {
    title: "Cybersecurity Fundamentals",
    startDate: "April 1, 2024",
    duration: "10 weeks",
    description: "Understand security principles, ethical hacking, and network protection.",
    icon: "🔒",
    tags: ["Security", "Networks", "Ethics"]
  },
  {
    title: "Mobile App Development",
    startDate: "April 15, 2024",
    duration: "14 weeks",
    description: "Build iOS and Android apps using React Native and Flutter.",
    icon: "📱",
    tags: ["React Native", "Flutter", "Mobile"]
  }
];

const UpcomingCoursesTimeline = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.timeline-item');
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 tech-grid opacity-10" />
      
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Upcoming Courses
        </h2>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30" />

          {upcomingCourses.map((course, index) => (
            <div
              key={course.title}
              className={`timeline-item relative mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 ml-12 md:ml-0"
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-[-2.5rem] md:left-[-1.25rem] ${
                    index % 2 === 1 ? 'md:left-auto md:right-[-1.25rem]' : ''
                  } top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent`}
                  animate={activeIndex === index ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.4)',
                      '0 0 0 10px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0.4)'
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                <div className="flex items-start gap-4">
                  <span className="text-4xl">{course.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gradient">
                      {course.title}
                    </h3>
                    <p className="text-secondary mb-3">{course.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm bg-accent/20 text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-secondary">
                      <span>🗓️ {course.startDate}</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCoursesTimeline;