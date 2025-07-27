import React from 'react';
import { Edit3, Heart, Users } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const primaryColor = 'text-indigo-600';
  const bgCircle = 'bg-indigo-100';

  const steps = [
    {
      number: '1',
      title: 'Write Your Story',
      description:
        'Choose a theme and share your authentic experience. No judgment, no profiles needed - just your truth.',
      icon: Edit3
    },
    {
      number: '2',
      title: 'Connect Safely',
      description:
        'Our community reads, relates, and responds with empathy. Every interaction is moderated for safety.',
      icon: Heart
    },
    {
      number: '3',
      title: 'Find Support',
      description:
        "Discover you're not alone. Give and receive support through shared experiences and understanding.",
      icon: Users
    }
  ];

  const stats = [
    { number: '3', label: 'Stories Shared' },
    { number: '572', label: 'Hearts Given' },
    { number: '99', label: 'Comments Posted' },
    { number: '142', label: 'Lives Touched' }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How Bliss Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, safe, and meaningful storytelling
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full ${bgCircle} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className={`h-10 w-10 ${primaryColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.number}. {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-indigo-50 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className={`text-5xl lg:text-6xl font-bold ${primaryColor}`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
