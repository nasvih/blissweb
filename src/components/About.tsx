import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Bliss
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A safe digital haven where individuals share personal stories anonymously,
            creating connections through vulnerability and authentic storytelling.
          </p>
        </div>

        {/* Mission */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            In today's noisy and often judgmental digital world, Bliss serves as a quiet, judgment-free
            platform that puts empathy and storytelling at the center.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Authentic Connection */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Authentic Connection
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We believe that vulnerability creates the strongest connections between people. By sharing our
              authentic experiences, we discover we're not alone in our struggles and triumphs.
            </p>
          </div>

          {/* Safe Space */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Safe Space
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your privacy and safety are our top priorities. Every story is shared anonymously, and our community
              guidelines ensure a respectful, supportive environment for everyone.
            </p>
          </div>
        </div>

        {/* Community Impact */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Building Bridges Through Stories
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every story shared on Bliss creates ripples of understanding and connection. 
              Together, we're building a more empathetic world, one authentic story at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;