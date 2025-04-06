'use client';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    title: 'Full Stack Development',
    description: 'Master both frontend and backend technologies including React, Node.js, and modern databases',
    icon: '🌐',
    technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'GraphQL']
  },
  {
    title: 'Mobile Development',
    description: 'Build native and cross-platform mobile apps using React Native and Flutter',
    icon: '📱',
    technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase']
  },
  {
    title: 'Cloud & DevOps',
    description: 'Learn cloud platforms, containerization, and CI/CD pipelines',
    icon: '☁️',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform']
  },
  {
    title: 'AI & Machine Learning',
    description: 'Explore artificial intelligence, deep learning, and data science',
    icon: '🤖',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI']
  },
  {
    title: 'Cybersecurity',
    description: 'Master network security, penetration testing, and security best practices',
    icon: '🔒',
    technologies: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Security+', 'CISSP']
  },
  {
    title: 'Blockchain & Web3',
    description: 'Develop decentralized applications and smart contracts',
    icon: '⛓️',
    technologies: ['Ethereum', 'Solidity', 'Web3.js', 'Smart Contracts', 'DeFi']
  }
];

const TechFeatures = () => {
  return (
    <section className="py-20 px-4">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
          Cutting-Edge Technology Courses
        </h2>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <ScrollReveal key={feature.title} delay={index * 0.1}>
            <motion.div
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gradient">{feature.title}</h3>
              <p className="text-secondary mb-6">{feature.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {feature.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-primary border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <motion.button
                className="w-full px-6 py-3 rounded-lg bg-accent/20 text-primary text-lg font-medium
                         hover:bg-accent/30 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
                <span className="text-xl">→</span>
              </motion.button>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default TechFeatures;