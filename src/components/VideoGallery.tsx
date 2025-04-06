'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: 'success-stories' | 'campus-life' | 'workshops' | 'events';
}

const videos: Video[] = [
  {
    id: 'video1',
    title: 'Campus Tour 2024',
    thumbnail: '/images/campus-tour.jpg',
    category: 'campus-life'
  },
  {
    id: 'video2',
    title: 'Success Story: From Student to Google Engineer',
    thumbnail: '/images/success-story.jpg',
    category: 'success-stories'
  },
  // Add more videos...
];

const VideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<Video['category'] | 'all'>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = [
    { id: 'all', label: 'All Videos' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'campus-life', label: 'Campus Life' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'events', label: 'Events' }
  ];

  const filteredVideos = videos.filter(
    video => selectedCategory === 'all' || video.category === selectedCategory
  );

  return (
    <section className="py-20 px-4" aria-label="Video Gallery">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
          Experience Our Institute
        </h2>
      </ScrollReveal>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as Video['category'] | 'all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all
              ${selectedCategory === category.id 
                ? 'bg-accent text-white' 
                : 'bg-white/5 text-secondary hover:bg-white/10'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredVideos.map((video) => (
          <ScrollReveal key={video.id}>
            <motion.div
              className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-medium">{video.title}</h3>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}`}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              aria-label="Close video"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default VideoGallery; 