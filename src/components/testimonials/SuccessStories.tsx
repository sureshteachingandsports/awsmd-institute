'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SuccessStory {
  id: string;
  name: string;
  image: string;
  role: string;
  company: {
    name: string;
    logo: string;
  };
  course: string;
  story: string;
  achievements: string[];
  beforeSalary?: string;
  afterSalary?: string;
  videoTestimonial?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  featured: boolean;
}

const successStories: SuccessStory[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    image: '/images/testimonials/sarah.jpg',
    role: 'Senior Frontend Developer',
    company: {
      name: 'Netflix',
      logo: '/images/companies/netflix.svg'
    },
    course: 'Full Stack Web Development',
    story: 'From a marketing background to a tech career. The bootcamp transformed my life, helping me land my dream job at Netflix.',
    achievements: [
      '3x salary increase',
      'Completed 5 major projects',
      'Promoted within 6 months'
    ],
    beforeSalary: '40,000',
    afterSalary: '120,000',
    videoTestimonial: 'https://youtube.com/watch?v=example',
    featured: true,
    socialLinks: {
      linkedin: 'https://linkedin.com/sarah',
      twitter: 'https://twitter.com/sarah'
    }
  },
  // Add more success stories...
];

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Stories' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'cybersecurity', label: 'Cybersecurity' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">Student Success Stories</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Real stories from our graduates who transformed their careers through our programs
          </p>
        </motion.div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Average Salary Increase', value: '150%' },
            { label: 'Placement Rate', value: '95%' },
            { label: 'Career Transitions', value: '1000+' },
            { label: 'Partner Companies', value: '200+' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold text-gradient mb-2">{metric.value}</h3>
              <p className="text-secondary">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeFilter === filter.id 
                  ? 'bg-accent text-white' 
                  : 'bg-white/5 text-secondary hover:bg-white/10'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all"
            >
              <div className="relative">
                {story.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{story.name}</h3>
                    <p className="text-accent">{story.role}</p>
                  </div>
                  <img
                    src={story.company.logo}
                    alt={story.company.name}
                    className="w-8 h-8 object-contain ml-auto"
                  />
                </div>

                <p className="text-secondary mb-4 line-clamp-3">{story.story}</p>

                {story.achievements && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {story.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-secondary"
                        >
                          <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {story.beforeSalary && story.afterSalary && (
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-secondary">Before</p>
                        <p className="font-semibold">${story.beforeSalary}</p>
                      </div>
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <div className="text-right">
                        <p className="text-sm text-secondary">After</p>
                        <p className="font-semibold text-accent">${story.afterSalary}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedStory(story.id)}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    Read Full Story
                  </button>
                  {story.videoTestimonial && (
                    <button
                      onClick={() => window.open(story.videoTestimonial)}
                      className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4 10.5l-6 3.5V7l6 3.5z" />
                      </svg>
                      Watch Video
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Story Modal */}
      {selectedStory && (
        <SuccessStoryModal
          story={successStories.find(s => s.id === selectedStory)!}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </section>
  );
};

const SuccessStoryModal = ({ story, onClose }: { story: SuccessStory; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal content */}
    </motion.div>
  );
};

export default SuccessStories; 