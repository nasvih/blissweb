import React from 'react';
import { Lightbulb, Heart, X, Trophy, Users, HelpCircle, RotateCcw, Plus } from 'lucide-react';

const StoryThemes: React.FC = () => {
  const themes = [
    {
      title: 'Inspiration',
      description: 'Turning points, resilience, breakthroughs',
      stories: '194 stories',
      icon: Lightbulb,
       'from-purple-500 to-blue-500',
      bg 'from-purple-100 to-blue-100'
    },
    {
      title: 'Love',
      description: 'Romance, heartbreak, connections',
      stories: '161 stories',
      icon: Heart,
       'from-pink-500 to-red-500',
      bg 'from-pink-100 to-red-100'
    },
    {
      title: 'Failure',
      description: 'Lessons learned, regrets, growth',
      stories: '59 stories',
      icon: X,
       'from-orange-500 to-red-500',
      bg 'from-orange-100 to-red-100'
    },
    {
      title: 'Success',
      description: 'Personal wins, achievements, milestones',
      stories: '176 stories',
      icon: Trophy,
       'from-green-500 to-emerald-500',
      bg 'from-green-100 to-emerald-100'
    },
    {
      title: 'Confessions',
      description: 'Secrets, hidden truths, revelations',
      stories: '143 stories',
      icon: Users,
       'from-purple-500 to-indigo-500',
      bg 'from-purple-100 to-indigo-100'
    },
    {
      title: 'Help Me',
      description: 'Support requests, advice needed',
      stories: '86 stories',
      icon: HelpCircle,
       'from-cyan-500 to-blue-500',
      bg 'from-cyan-100 to-blue-100'
    },
    {
      title: 'Random Reflections',
      description: 'Life thoughts, philosophy, musings',
      stories: '325 stories',
      icon: RotateCcw,
       'from-gray-500 to-slate-500',
      bg 'from-gray-100 to-slate-100'
    },
    {
      title: 'More Themes',
      description: 'Explore all categories',
      stories: 'Browse all',
      icon: Plus,
       'from-purple-500 to-pink-500',
      bg 'from-purple-100 to-pink-100'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Theme
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every story has a theme. Find the right space for yours.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => {
            const Icon = theme.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${theme.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 bg-gradient-to-r ${theme.color} bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {theme.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-4 text-sm">
                  {theme.description}
                </p>
                
                <div className="text-center">
                  <span className="text-sm text-gray-500 font-medium">
                    {theme.stories}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoryThemes;