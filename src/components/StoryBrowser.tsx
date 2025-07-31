import React, { useState, useMemo } from 'react';
import { Search, Clock, Heart, Eye, Edit, Trash2, Filter } from 'lucide-react';
import { Story } from '../types/Story';

interface StoryBrowserProps {
  stories: Story[];
  onReadStory: (story: Story) => void;
  onEditStory: (story: Story) => void;
  onDeleteStory: (storyId: string) => void;
}

const StoryBrowser: React.FC<StoryBrowserProps> = ({
  stories,
  onReadStory,
  onEditStory,
  onDeleteStory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(stories.map(story => story.category))];
    return cats;
  }, [stories]);

  const filteredAndSortedStories = useMemo(() => {
    let filtered = stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case 'trending':
        return filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
      default:
        return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  }, [stories, searchTerm, selectedCategory, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Browse Stories
          </h1>
          <p className="text-xl text-gray-600">
            Discover authentic stories from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Liked</option>
              <option value="trending">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Stories Grid */}
        {filteredAndSortedStories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Stories Found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
               

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="font-medium">{story.author}</span>
                    <span>{formatDate(story.publishedAt)}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{story.readTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{story.views || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Button */}
                  <button
                    onClick={() => onReadStory(story)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-200 transform group-hover:scale-105"
                  >
                    Read Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryBrowser;