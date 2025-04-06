'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  publishDate: string;
  likes: number;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 'future-of-ai',
    title: 'The Future of AI in Software Development',
    excerpt: 'Explore how artificial intelligence is transforming the way we build software.',
    content: '...',
    author: {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Lead',
      avatar: '/images/blog/authors/sarah.jpg'
    },
    category: 'Artificial Intelligence',
    tags: ['AI', 'Machine Learning', 'Future Tech'],
    image: '/images/blog/ai-future.jpg',
    readTime: 5,
    publishDate: '2024-01-15',
    likes: 234,
    featured: true
  },
  // Add more blog posts...
];

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'web-dev', label: 'Web Development' },
    { id: 'cloud', label: 'Cloud Computing' },
    { id: 'career', label: 'Career Tips' }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">Latest from Our Blog</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Insights, tutorials, and tech trends from our experts
          </p>
        </motion.div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured)[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
                <div className="absolute bottom-0 p-8">
                  <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-medium mb-4 inline-block">
                    Featured
                  </span>
                  <h3 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h3>
                  <p className="text-lg text-white/80 mb-6 max-w-2xl">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={blogPosts[0].author.avatar}
                      alt={blogPosts[0].author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{blogPosts[0].author.name}</p>
                      <p className="text-sm text-white/60">{blogPosts[0].author.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-secondary mb-4">
                  <CalendarIcon />
                  {new Date(post.publishDate).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <ClockIcon />
                  {post.readTime} min read
                </div>

                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-secondary mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-secondary">{post.author.name}</span>
                  </div>
                  <button className="text-accent hover:text-accent/80 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper Icons (reusing from EventsSection)
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default BlogSection; 