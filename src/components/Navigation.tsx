import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'browse' | 'share' | 'about' | 'guidelines' | 'faq' | 'admin' | 'read';
  onNavigate: (page: 'home' | 'browse' | 'share' | 'about' | 'guidelines' | 'faq' | 'admin' | 'read') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse Stories' },
    { id: 'share', label: 'Share Story' },
    { id: 'about', label: 'About' },
    { id: 'guidelines', label: 'Guidelines' },
    { id: 'faq', label: 'Contact' },
   
  ];

  const handleNavClick = (page: any) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Bliss
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Share Your Story Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('share')}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-700 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
            >
              Share Your Story
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-purple-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="space-y-2 pt-4 border-t border-gray-200">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('share')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-3 rounded-lg font-medium mt-4"
            >
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;