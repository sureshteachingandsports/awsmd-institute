'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseFilters from './CourseFilters';
import CourseCard from './CourseCard';

// Extended course data with more detailed properties
const courses = [
  // Web Development Courses
  {
    id: 'fullstack-2024',
    title: 'Full Stack Web Development Bootcamp',
    description: 'Master modern web development with React, Node.js, and cloud technologies',
    duration: '6 months',
    level: 'Intermediate',
  
    icon: '💻',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    category: 'web-development',
    subCategory: 'full-stack',
    enrollmentStatus: 'open' as const,
    startDate: '2024-03-01',
    rating: 4.8,
    studentsEnrolled: 1250,
    featured: true,
    highlights: ['Live Project Sessions', '24/7 Support', 'Job Guarantee'],
    certification: 'Full Stack Developer Certification',
    schedule: 'weekday-evening',
    language: 'english',
    prerequisites: ['Basic JavaScript', 'HTML & CSS'],
    career: ['Web Developer', 'Full Stack Developer', 'Software Engineer']
  },
  {
    id: 'frontend-react-2024',
    title: 'Frontend Development with React',
    description: 'Become a professional frontend developer with React and modern tools',
    duration: '4 months',
    level: 'Beginner',

    icon: '⚛️',
    technologies: ['React', 'TypeScript', 'Redux', 'Next.js'],
    category: 'web-development',
    subCategory: 'frontend',
    enrollmentStatus: 'open' as const,
    startDate: '2024-02-15',
    rating: 4.7,
    studentsEnrolled: 980,
    featured: false,
    highlights: ['Component-Based Architecture', 'State Management', 'Modern UI/UX'],
    certification: 'React Developer Certification',
    schedule: 'weekend',
    language: 'english',
    prerequisites: ['Basic JavaScript'],
    career: ['Frontend Developer', 'UI Developer', 'React Developer']
  },

  // Data Science & AI Courses
  {
    id: 'data-science-python-2024',
    title: 'Data Science with Python',
    description: 'Master data analysis, visualization, and machine learning with Python',
    duration: '5 months',
    level: 'Intermediate',

    icon: '📊',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    category: 'data-science',
    subCategory: 'analytics',
    enrollmentStatus: 'closing-soon' as const,
    startDate: '2024-03-10',
    rating: 4.9,
    studentsEnrolled: 750,
    featured: true,
    highlights: ['Real-world Projects', 'Industry Datasets', 'Career Support'],
    certification: 'Data Science Professional Certificate',
    schedule: 'weekday-evening',
    language: 'english',
    prerequisites: ['Basic Python', 'Statistics'],
    career: ['Data Scientist', 'Data Analyst', 'Business Analyst']
  },

  // Cloud & DevOps Courses
  {
    id: 'aws-devops-2024',
    title: 'AWS DevOps Engineering',
    description: 'Master cloud infrastructure and DevOps practices on AWS',
    duration: '6 months',
    level: 'Advanced',
    
    icon: '☁️',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    category: 'cloud-computing',
    subCategory: 'devops',
    enrollmentStatus: 'open' as const,
    startDate: '2024-04-01',
    rating: 4.8,
    studentsEnrolled: 420,
    featured: true,
    highlights: ['AWS Certification Prep', 'Hands-on Labs', 'Industry Projects'],
    certification: 'AWS DevOps Engineer Professional',
    schedule: 'weekday',
    language: 'english',
    prerequisites: ['Basic Linux', 'Basic Programming'],
    career: ['DevOps Engineer', 'Cloud Engineer', 'SRE']
  },

  // Add more courses...
];

// Extended filter interface
interface FilterState {
  technology: string[];
  duration: string[];
  level: string[];
  category: string[];
  schedule: string[];
  priceRange: string[];
  language: string[];
  certification: boolean;
  sort: string;
}

const CourseGrid = () => {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    technology: [],
    duration: [],
    level: [],
    category: [],
    schedule: [],
    priceRange: [],
    language: [],
    certification: false,
    sort: 'popularity'
  });

  const applyFilters = () => {
    setIsLoading(true);
    let result = [...courses];

    // Category filter
    if (filters.category.length > 0) {
      result = result.filter(course => 
        filters.category.includes(course.category)
      );
    }

    // Technology filter
    if (filters.technology.length > 0) {
      result = result.filter(course =>
        course.technologies.some(tech =>
          filters.technology.includes(tech.toLowerCase())
        )
      );
    }

    // Duration filter
    if (filters.duration.length > 0) {
      result = result.filter(course => {
        const months = parseInt(course.duration);
        return filters.duration.some(range => {
          const [min, max] = range.split('-').map(Number);
          return months >= min && months <= max;
        });
      });
    }

    // Level filter
    if (filters.level.length > 0) {
      result = result.filter(course =>
        filters.level.includes(course.level.toLowerCase())
      );
    }

    // Schedule filter
    if (filters.schedule.length > 0) {
      result = result.filter(course =>
        filters.schedule.includes(course.schedule)
      );
    }

    // Price range filter
    if (filters.priceRange.length > 0) {
      result = result.filter(course => {
        return filters.priceRange.some(range => {
          const [min, max] = range.split('-').map(Number);
     
        });
      });
    }

    // Language filter
    if (filters.language.length > 0) {
      result = result.filter(course =>
        filters.language.includes(course.language)
      );
    }

    // Certification filter
    if (filters.certification) {
      result = result.filter(course => course.certification);
    }

    // Apply sorting
    switch (filters.sort) {
    
       
     
    
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        result.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled);
        break;
      case 'duration':
        result.sort((a, b) => 
          parseInt(a.duration) - parseInt(b.duration)
        );
        break;
    }

    setTimeout(() => {
      setFilteredCourses(result);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Add categories for quick filtering
  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'featured', label: 'Featured' },
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'New Courses' }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Categories and View Toggle */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex gap-4 mb-4 md:mb-0">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setFilters(prev => ({ ...prev, category: [category.id] }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${filters.category.includes(category.id) 
                    ? 'bg-accent text-white' 
                    : 'bg-white/5 text-secondary hover:bg-white/10'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-accent' : 'bg-white/5'}`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-accent' : 'bg-white/5'}`}
            >
              <ListIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <CourseFilters onFilterChange={(newFilters) => setFilters(newFilters)} />
          </aside>

          {/* Course Grid/List */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingGrid viewMode={viewMode} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                    : "space-y-6"
                  }
                >
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const LoadingGrid = ({ viewMode }: { viewMode: 'grid' | 'list' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={viewMode === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
      : "space-y-6"
    }
  >
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white/5 rounded-xl h-[400px] animate-pulse"
      />
    ))}
  </motion.div>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
  </svg>
);

export default CourseGrid; 