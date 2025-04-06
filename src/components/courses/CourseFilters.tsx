'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

// Extended filter options
const technologies: FilterOption[] = [
  { id: 'react', label: 'React', count: 12 },
  { id: 'node.js', label: 'Node.js', count: 8 },
  { id: 'python', label: 'Python', count: 10 },
  { id: 'aws', label: 'AWS', count: 6 },
  { id: 'docker', label: 'Docker', count: 5 },
  { id: 'kubernetes', label: 'Kubernetes', count: 4 },
  { id: 'typescript', label: 'TypeScript', count: 7 },
  { id: 'mongodb', label: 'MongoDB', count: 6 },
  { id: 'tensorflow', label: 'TensorFlow', count: 3 },
  { id: 'pytorch', label: 'PyTorch', count: 2 }
];

const categories: FilterOption[] = [
  { id: 'web-development', label: 'Web Development', count: 15 },
  { id: 'data-science', label: 'Data Science', count: 8 },
  { id: 'cloud-computing', label: 'Cloud Computing', count: 6 },
  { id: 'cybersecurity', label: 'Cybersecurity', count: 4 },
  { id: 'mobile-dev', label: 'Mobile Development', count: 5 },
  { id: 'devops', label: 'DevOps', count: 7 }
];

const durations: FilterOption[] = [
  { id: '0-3', label: '0-3 Months', count: 10 },
  { id: '3-6', label: '3-6 Months', count: 15 },
  { id: '6-12', label: '6-12 Months', count: 8 }
];

const levels: FilterOption[] = [
  { id: 'beginner', label: 'Beginner', count: 20 },
  { id: 'intermediate', label: 'Intermediate', count: 15 },
  { id: 'advanced', label: 'Advanced', count: 8 }
];

const schedules: FilterOption[] = [
  { id: 'weekday', label: 'Weekday', count: 25 },
  { id: 'weekend', label: 'Weekend', count: 15 },
  { id: 'weekday-evening', label: 'Weekday Evening', count: 20 }
];



const languages: FilterOption[] = [
  { id: 'english', label: 'English', count: 30 },
  { id: 'spanish', label: 'Spanish', count: 5 },
  { id: 'hindi', label: 'Hindi', count: 3 }
];

interface CourseFiltersProps {
  onFilterChange: (filters: {
    technology: string[];
    category: string[];
    duration: string[];
    level: string[];
    schedule: string[];
    priceRange: string[];
    language: string[];
    certification: boolean;
    sort: string;
  }) => void;
}

const CourseFilters = ({ onFilterChange }: CourseFiltersProps) => {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [certification, setCertification] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  const updateFilters = () => {
    onFilterChange({
      technology: selectedTech,
      category: selectedCategories,
      duration: selectedDuration,
      level: selectedLevel,
      schedule: selectedSchedule,
      priceRange: selectedPriceRange,
      language: selectedLanguage,
      certification,
      sort: sortBy
    });
  };

  const handleFilterChange = (
    type: 'technology' | 'category' | 'duration' | 'level' | 'schedule' | 'priceRange' | 'language',
    value: string
  ) => {
    const updateState = (prev: string[]) => {
      const newState = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
      return newState;
    };

    switch (type) {
      case 'technology':
        setSelectedTech(updateState);
        break;
      case 'category':
        setSelectedCategories(updateState);
        break;
      case 'duration':
        setSelectedDuration(updateState);
        break;
      case 'level':
        setSelectedLevel(updateState);
        break;
      case 'schedule':
        setSelectedSchedule(updateState);
        break;
      case 'priceRange':
        setSelectedPriceRange(updateState);
        break;
      case 'language':
        setSelectedLanguage(updateState);
        break;
    }
  };

  useEffect(() => {
    updateFilters();
  }, [
    selectedTech,
    selectedCategories,
    selectedDuration,
    selectedLevel,
    selectedSchedule,
    selectedPriceRange,
    selectedLanguage,
    certification,
    sortBy
  ]);

  return (
    <div className="w-full max-w-xs bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-6">
      {/* Sort Options */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-white/10 rounded-lg px-4 py-2 text-primary outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      {/* Categories Filter */}
      <FilterSection
        title="Categories"
        options={categories}
        selected={selectedCategories}
        onChange={(value) => handleFilterChange('category', value)}
      />

      {/* Technologies Filter */}
      <FilterSection
        title="Technologies"
        options={technologies}
        selected={selectedTech}
        onChange={(value) => handleFilterChange('technology', value)}
      />

      {/* Duration Filter */}
      <FilterSection
        title="Duration"
        options={durations}
        selected={selectedDuration}
        onChange={(value) => handleFilterChange('duration', value)}
      />

      {/* Level Filter */}
      <FilterSection
        title="Level"
        options={levels}
        selected={selectedLevel}
        onChange={(value) => handleFilterChange('level', value)}
      />

      {/* Schedule Filter */}
      <FilterSection
        title="Schedule"
        options={schedules}
        selected={selectedSchedule}
        onChange={(value) => handleFilterChange('schedule', value)}
      />

     
      {/* Language Filter */}
      <FilterSection
        title="Language"
        options={languages}
        selected={selectedLanguage}
        onChange={(value) => handleFilterChange('language', value)}
      />

      {/* Certification Filter */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={certification}
            onChange={(e) => setCertification(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent"
          />
          <span className="text-secondary">With Certification</span>
        </label>
      </div>

      {/* Clear Filters Button */}
      {(selectedTech.length > 0 || selectedCategories.length > 0 || selectedDuration.length > 0 ||
        selectedLevel.length > 0 || selectedSchedule.length > 0 || selectedPriceRange.length > 0 ||
        selectedLanguage.length > 0 || certification) && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
          onClick={() => {
            setSelectedTech([]);
            setSelectedCategories([]);
            setSelectedDuration([]);
            setSelectedLevel([]);
            setSelectedSchedule([]);
            setSelectedPriceRange([]);
            setSelectedLanguage([]);
            setCertification(false);
            setSortBy('popularity');
          }}
        >
          Clear All Filters
        </motion.button>
      )}
    </div>
  );
};

// Helper component for filter sections
const FilterSection = ({
  title,
  options,
  selected,
  onChange
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (value: string) => void;
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <motion.label
          key={option.id}
          className="flex items-center gap-2 cursor-pointer group"
          whileHover={{ x: 4 }}
        >
          <input
            type="checkbox"
            checked={selected.includes(option.id)}
            onChange={() => onChange(option.id)}
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-accent focus:ring-accent"
          />
          <span className="text-secondary group-hover:text-primary transition-colors">
            {option.label}
          </span>
          {option.count && (
            <span className="text-secondary text-sm ml-auto">({option.count})</span>
          )}
        </motion.label>
      ))}
    </div>
  </div>
);

export default CourseFilters; 