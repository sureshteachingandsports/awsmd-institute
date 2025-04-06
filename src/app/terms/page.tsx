'use client';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-secondary">
            By accessing and using AWSMD Institute's services, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <p className="text-secondary">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Course Content</h2>
          <p className="text-secondary">
            All course content is protected by copyright and other intellectual property rights.
          </p>
          <ul className="list-disc pl-6 text-secondary">
            <li>You may not share or distribute course materials</li>
            <li>You may not record or reproduce lectures</li>
            <li>Access is for personal, non-commercial use only</li>
          </ul>
        </section>

        {/* Add more sections as needed */}
      </div>
    </motion.div>
  );
} 