'use client';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p className="text-secondary">
            Cookies are small text files that are stored on your computer or mobile device when you visit our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p className="text-secondary">We use cookies to:</p>
          <ul className="list-disc pl-6 text-secondary">
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our website</li>
            <li>Keep you signed in</li>
            <li>Improve your experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Essential Cookies</h3>
              <p className="text-secondary">Required for the website to function properly.</p>
            </div>
            <div>
              <h3 className="font-semibold">Analytics Cookies</h3>
              <p className="text-secondary">Help us understand how visitors interact with our website.</p>
            </div>
            <div>
              <h3 className="font-semibold">Preference Cookies</h3>
              <p className="text-secondary">Remember your settings and preferences.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p className="text-secondary">
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
          </p>
        </section>
      </div>
    </motion.div>
  );
} 