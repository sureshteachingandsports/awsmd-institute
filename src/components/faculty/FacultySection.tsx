'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FacultyMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  expertise: string[];
  experience: string;
  achievements: string[];
  courses: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const facultyMembers: FacultyMember[] = [
  {
    id: 'john-doe',
    name: 'Dr. John Doe',
    title: 'Senior AI & Machine Learning Expert',
    image: '/images/faculty/john-doe.jpg',
    bio: '15+ years of experience in AI and Machine Learning. Former Lead at Google AI.',
    expertise: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
    experience: 'Ex-Google, Ex-Microsoft',
    achievements: [
      'Published 20+ research papers',
      'Developed AI solutions for Fortune 500 companies',
      'PhD in Machine Learning from Stanford'
    ],
    courses: ['AI & Machine Learning Bootcamp', 'Deep Learning Specialization'],
    socialLinks: {
      linkedin: 'https://linkedin.com/john-doe',
      twitter: 'https://twitter.com/john-doe',
      github: 'https://github.com/john-doe'
    }
  },
  // Add more faculty members...
];

const FacultySection = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">Learn from Industry Experts</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Our faculty members bring years of industry experience and expertise to help you succeed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all"
            >
              <div className="relative group">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{faculty.name}</h3>
                <p className="text-accent mb-4">{faculty.title}</p>
                <p className="text-secondary mb-4 line-clamp-2">{faculty.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {faculty.expertise.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-white/5 text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedFaculty(faculty.id)}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    View Profile
                  </button>
                  <div className="flex gap-3">
                    {Object.entries(faculty.socialLinks).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-accent transition-colors"
                      >
                        <SocialIcon platform={platform} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Faculty Profile Modal */}
        {selectedFaculty && (
          <FacultyProfileModal
            faculty={facultyMembers.find(f => f.id === selectedFaculty)!}
            onClose={() => setSelectedFaculty(null)}
          />
        )}
      </div>
    </section>
  );
};

// Helper Components
const SocialIcon = ({ platform }: { platform: string }) => {
  // Add your social media icons here
  return <div>{/* Icon Component */}</div>;
};

const FacultyProfileModal = ({ faculty, onClose }: { faculty: FacultyMember; onClose: () => void }) => {
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

export default FacultySection; 