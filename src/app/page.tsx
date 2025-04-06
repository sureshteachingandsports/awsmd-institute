'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Immediately loaded components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { LoadingFallback } from '../components/LoadingFallback';
import FacultySection from '../components/faculty/FacultySection';
import SuccessStories from '../components/testimonials/SuccessStories';
import EventsSection from '../components/events/EventsSection';
import BlogSection from '../components/blog/BlogSection';
import ContactForm from '../components/contact/ContactForm';
import FAQSection from '../components/faq/FAQSection';
import ChatBot from '../components/chat/ChatBot';


// Dynamically imported components
const InfiniteText = dynamic(() => import('../components/InfiniteText'), {
  loading: () => <div className="animate-pulse h-20 bg-accent/5" />
});

const TechFeatures = dynamic(() => import('../components/TechFeatures'), {
  loading: () => <LoadingFallback />
});

const CourseGrid = dynamic(() => import('../components/courses/CourseGrid'), {
  loading: () => <LoadingFallback />
});

const FacilitiesSection = dynamic(() => import('../components/FacilitiesSection'));
const AchievementsSection = dynamic(() => import('../components/AchievementsSection'));
const VideoGallery = dynamic(() => import('../components/VideoGallery'));
const InstagramFeed = dynamic(() => import('../components/InstagramFeed'));
const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection'));
const CallToAction = dynamic(() => import('../components/CallToAction'));

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background"
      >
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Technology Showcase */}
          <Suspense fallback={<div className="animate-pulse h-20 bg-accent/5" />}>
            <InfiniteText />
          </Suspense>

          {/* Main Content Sections */}
          <Suspense fallback={<LoadingFallback />}>
            <div className="space-y-20">
              {/* Features Section */}
              <TechFeatures />

              {/* Course Section */}
              <section id="courses" className="py-20">
                <div className="text-center mb-12">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Explore Our Courses
                  </motion.h2>
                  <motion.p 
                    className="text-secondary text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Choose from our wide range of professional courses designed to launch your tech career
                  </motion.p>
                </div>
                <CourseGrid />
              </section>

              {/* Facilities Section */}
              <FacilitiesSection />

              {/* Achievements Section */}
              <AchievementsSection />

              {/* Video Gallery */}
              <VideoGallery />

              {/* Instagram Feed */}
              <InstagramFeed />

              {/* Testimonials */}
              <TestimonialsSection />

              {/* Call to Action */}
              <CallToAction />

              {/* Faculty Section */}
              <FacultySection />

              {/* Success Stories */}
              <SuccessStories />

              {/* Events Section */}
              <EventsSection />

              {/* Blog Section */}
              <BlogSection />

              {/* FAQ Section */}
              <FAQSection />

              {/* Contact Form */}
              <ContactForm />

              {/* Legal Links Section */}
              <section className="py-16 bg-gradient-to-b from-background/50 to-background">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-8">Important Information</h2>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link 
                      href="/faq"
                      className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Full FAQ
                    </Link>
                    <Link 
                      href="/cookies"
                      className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Cookie Policy
                    </Link>
                    <Link 
                      href="/privacy"
                      className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link 
                      href="/terms"
                      className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </Suspense>
        </main>

       
        <ChatBot />
      </motion.div>
    </AnimatePresence>
  );
}
