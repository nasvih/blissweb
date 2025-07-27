import React from 'react';
import { Edit3, BookOpen, Heart } from 'lucide-react';

interface HeroProps {
  onShareStory: () => void;
  onBrowseStories: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShareStory, onBrowseStories }) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Your{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Stories
                </span>
                <br />
                Matter
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                A judgment-free space to share your authentic stories anonymously.
                Connect through vulnerability, inspire through truth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onShareStory}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Edit3 className="h-5 w-5" />
                <span>Share Your Story</span>
              </button>
              <button
                onClick={onBrowseStories}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-purple-500 hover:text-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Browse Stories</span>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="People connecting and sharing stories"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>
            
            {/* Floating heart */}
            <div className="absolute -top-4 -left-4 bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-full shadow-lg animate-bounce">
              <Heart className="h-8 w-8 text-white fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;