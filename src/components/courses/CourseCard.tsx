'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  icon: string;
  technologies: string[];
  enrollmentStatus: 'open' | 'closing-soon' | 'full';
  startDate: string;
  rating: number;
  studentsEnrolled: number;
  featured: boolean;
  highlights: string[];
  viewMode?: 'grid' | 'list';
  certification?: string;
  schedule?: string;
  prerequisites?: string[];
  career?: string[];
}

const CourseCard = ({
  id,
  title,
  description,
  duration,
  level,
  price,
  icon,
  technologies,
  enrollmentStatus,
  startDate,
  rating,
  studentsEnrolled,
  featured,
  highlights,
  viewMode = 'grid',
  certification,
  schedule,
  prerequisites,
  career,
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    'open': 'bg-green-500',
    'closing-soon': 'bg-yellow-500',
    'full': 'bg-red-500',
  };

  const statusText = {
    'open': 'Enrollment Open',
    'closing-soon': 'Closing Soon',
    'full': 'Enrollment Full',
  };

  const RatingStars = () => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-400'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-secondary ml-1">{rating.toFixed(1)}</span>
    </div>
  );

  const CardContent = () => (
    <>
      {/* Course Header */}
      <div className={`relative ${viewMode === 'list' ? 'flex items-start gap-6' : ''}`}>
        <div className={`flex items-start justify-between ${viewMode === 'list' ? 'flex-1' : 'mb-4'}`}>
          <div className="flex items-start gap-4">
            <div className="text-4xl p-2 bg-white/5 rounded-lg">{icon}</div>
            <div className="flex-1">
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-medium text-accent mb-2"
                >
                  Featured Course
                </motion.div>
              )}
              <h3 className="text-xl font-semibold mb-2 text-gradient line-clamp-2">{title}</h3>
              <p className="text-secondary line-clamp-2 text-sm">{description}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[enrollmentStatus]}`}>
            {statusText[enrollmentStatus]}
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className={`${viewMode === 'list' ? 'grid grid-cols-2 gap-8' : ''}`}>
        <div className="space-y-4">
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-full text-xs font-medium bg-white/5 text-secondary hover:bg-white/10 transition-colors cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-secondary">Duration</p>
              <p className="font-medium">{duration}</p>
            </div>
            <div>
              <p className="text-secondary">Level</p>
              <p className="font-medium">{level}</p>
            </div>
            <div>
              <p className="text-secondary">Start Date</p>
              <p className="font-medium">{new Date(startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-secondary">Students</p>
              <p className="font-medium">{studentsEnrolled.toLocaleString()}</p>
            </div>
          </div>

          {/* Rating and Price */}
          <div className="flex items-center justify-between">
            <RatingStars />
            <p className="text-2xl font-bold text-gradient">${price.toLocaleString()}</p>
          </div>
        </div>

        {/* Course Highlights */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            <h4 className="font-semibold">Course Highlights</h4>
            <ul className="space-y-2">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-4 ${viewMode === 'list' ? 'mt-6' : ''}`}>
        <Link href={`/courses/${id}`} className="flex-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-2 rounded-lg bg-white/5 text-primary hover:bg-white/10 transition-colors"
          >
            Learn More
          </motion.button>
        </Link>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          Enroll Now
        </motion.button>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300
        ${viewMode === 'list' ? 'p-6' : 'p-6 pb-4'}`}
    >
      <CardContent />

      {/* Hover Effect Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default CourseCard;