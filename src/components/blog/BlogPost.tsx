'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      role: string;
      avatar: string;
      bio: string;
    };
    category: string;
    tags: string[];
    image: string;
    readTime: number;
    publishDate: string;
    likes: number;
    relatedPosts?: {
      id: string;
      title: string;
      image: string;
    }[];
  };
}

const BlogPost = ({ post }: BlogPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              {post.category}
            </span>
            <span className="text-secondary">•</span>
            <span className="text-secondary">{post.readTime} min read</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
          
          <div className="flex items-center justify-center gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="text-left">
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-secondary">{post.author.role}</p>
            </div>
            <span className="text-secondary">•</span>
            <time className="text-secondary">
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {/* Add your markdown or rich text renderer here */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Author Bio */}
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">{post.author.name}</h3>
              <p className="text-secondary">{post.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {post.relatedPosts && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group block"
                >
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold group-hover:text-accent transition-colors">
                    {relatedPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </article>
  );
};

export default BlogPost; 