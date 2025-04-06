'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 'admission-process',
    question: 'What is the admission process?',
    answer: 'Our admission process involves submitting an application, completing a basic assessment, and an interview with our team. We evaluate candidates based on their passion for technology and learning potential rather than just prior experience.',
    category: 'admissions'
  },
  {
    id: 'payment-options',
    question: 'What payment options are available?',
    answer: 'We offer various payment options including upfront payment, monthly installments, and income share agreements (ISA). We also provide scholarships for eligible candidates.',
    category: 'fees'
  },
  {
    id: 'course-duration',
    question: 'How long are the courses?',
    answer: 'Course duration varies by program. Full-time bootcamps typically run for 12-16 weeks, while part-time courses can extend to 24-30 weeks. We also offer self-paced learning options.',
    category: 'courses'
  },
  {
    id: 'job-assistance',
    question: 'Do you provide job assistance?',
    answer: 'Yes, we offer comprehensive career support including resume building, interview preparation, portfolio development, and direct connections with our hiring partners.',
    category: 'careers'
  },
  // Add more FAQs...
];

const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'courses', label: 'Courses' },
  { id: 'fees', label: 'Fees & Funding' },
  { id: 'careers', label: 'Careers' }
];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">Frequently Asked Questions</h2>
          <p className="text-secondary text-lg">
            Find answers to common questions about our programs and admissions
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category.id 
                  ? 'bg-accent text-white' 
                  : 'bg-white/5 text-secondary hover:bg-white/10'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenItem(openItem === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  <ChevronIcon 
                    className={`w-5 h-5 transform transition-transform ${
                      openItem === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openItem === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white/5 text-secondary">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-secondary mb-4">
            Still have questions? We're here to help!
          </p>
          <button
            onClick={() => window.location.href = '#contact'}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Helper Icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default FAQSection; 