'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  type: 'image' | 'video' | 'carousel';
  date: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: 'post1',
    image: '/images/instagram/campus-life.jpg',
    caption: 'Exciting workshop on AI & Machine Learning! 🤖 #TechEducation #AI #ML',
    likes: 245,
    comments: 18,
    type: 'image',
    date: '2024-01-15'
  },
  {
    id: 'post2',
    image: '/images/instagram/coding-session.jpg',
    caption: 'Our students crushing it at the coding hackathon! 💻 #Coding #StudentLife',
    likes: 189,
    comments: 23,
    type: 'carousel',
    date: '2024-01-14'
  },
  // Add more posts...
];

const InstagramFeed = () => {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Campus Life on Instagram
          </h2>
          <p className="text-secondary text-lg">
            Follow us <a 
              href="https://instagram.com/your-institute" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              @your-institute
            </a>
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {instagramPosts.map((post) => (
          <ScrollReveal key={post.id}>
            <motion.div
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
              
              {/* Post Type Indicator */}
              {post.type !== 'image' && (
                <div className="absolute top-4 right-4">
                  {post.type === 'video' ? (
                    <motion.div
                      className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16v12H4z"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="text-white font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span className="text-white font-medium">{post.comments}</span>
                  </div>
                </div>
                <p className="text-white text-center text-sm line-clamp-3">
                  {post.caption}
                </p>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-12">
        <motion.a
          href="https://instagram.com/your-institute"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent/20 hover:bg-accent/30 text-white transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View More on Instagram
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </motion.a>
      </div>
    </section>
  );
};

export default InstagramFeed; 