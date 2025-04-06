'use client';
import { motion } from 'framer-motion';
import FAQSection from '@/components/faq/FAQSection';

export default function FAQPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="pt-20 pb-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-secondary text-lg max-w-2xl mx-auto px-4">
          Find answers to common questions about our programs, admissions, and more.
        </p>
      </div>

      <FAQSection />

      {/* Additional Support Section */}
      <section className="py-20 bg-gradient-to-b from-background/50 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-secondary mb-8">
            Our support team is here to assist you with any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@awsmd.edu"
              className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
} 