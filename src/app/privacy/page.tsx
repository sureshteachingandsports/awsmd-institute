'use client';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-secondary">
            We collect information that you provide directly to us, including when you:
          </p>
          <ul className="list-disc pl-6 text-secondary">
            <li>Create an account</li>
            <li>Enroll in courses</li>
            <li>Participate in forums or discussions</li>
            <li>Contact us for support</li>
            <li>Subscribe to our newsletter</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-secondary">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-secondary">
            <li>Provide and improve our services</li>
            <li>Communicate with you about courses and updates</li>
            <li>Personalize your learning experience</li>
            <li>Analyze and improve our platform</li>
          </ul>
        </section>

        {/* Add more sections as needed */}
      </div>
    </motion.div>
  );
} 