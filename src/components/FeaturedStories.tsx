import React from 'react';
import { Clock, Heart, MessageCircle } from 'lucide-react';
import { Story } from '../types/Story';

interface FeaturedStoriesProps {
  stories: Story[];
  onReadStory: (story: Story) => void;
}

const FeaturedStories: React.FC<FeaturedStoriesProps> = ({ stories, onReadStory }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Featured Stories
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Stories that moved our community
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-200">
            View All Stories
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => onReadStory(story)}
            >
     
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                  {story.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{story.readTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes || 0}</span>
                    </div>
                  </div>
                  <span>{formatDate(story.publishedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedStories;