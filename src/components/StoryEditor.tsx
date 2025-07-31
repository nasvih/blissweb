import React, { useState, useEffect } from 'react';
import { Save, X, Image, Tag, User, BookOpen, Eye, Lightbulb, Heart, Trophy, Users, HelpCircle, RotateCcw } from 'lucide-react';
import { Story, StoryFormData } from '../types/Story';

interface StoryEditorProps {
  story?: Story | null;
  onPublish: (story: StoryFormData) => void;
  onCancel: () => void;
}

const StoryEditor: React.FC<StoryEditorProps> = ({ story, onPublish, onCancel }) => {
  const [formData, setFormData] = useState<StoryFormData>({
    title: '',
    content: '',
    excerpt: '',
    author: 'Anonymous',
    category: '',
    tags: [],
    coverImage: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [errors, setErrors] = useState<Partial<StoryFormData>>({});

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title,
        content: story.content,
        excerpt: story.excerpt,
        author: story.author,
        category: story.category,
        tags: story.tags,
        coverImage: story.coverImage
      });
    }
  }, [story]);

  const categories = [
    { name: 'Inspiration', icon: Lightbulb, color: 'bg-indigo-500' },
    { name: 'Love', icon: Heart, color: 'bg-rose-500' },
    { name: 'Failure', icon: X, color: 'bg-orange-500' },
    { name: 'Success', icon: Trophy, color: 'bg-emerald-600' },
    { name: 'Confessions', icon: Users, color: 'bg-violet-600' },
    { name: 'Help Me', icon: HelpCircle, color: 'bg-sky-500' },
    { name: 'Random Reflections', icon: RotateCcw, color: 'bg-slate-500' }
  ];

  const sampleImages = [
    'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  const handleInputChange = (field: keyof StoryFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleInputChange('tags', [...formData.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StoryFormData> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onPublish(formData);
    }
  };

  const generateExcerpt = () => {
    if (formData.content) {
      const words = formData.content.split(' ').slice(0, 30);
      const excerpt = words.join(' ') + (formData.content.split(' ').length > 30 ? '...' : '');
      handleInputChange('excerpt', excerpt);
    }
  };

  if (isPreview) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Preview Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Story Preview</h1>
                <button
                  onClick={() => setIsPreview(false)}
                  className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-8">
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-xl mb-8"
                />
              )}
              
              <div className="mb-6">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {formData.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{formData.title}</h1>
              
              <div className="flex items-center space-x-4 text-gray-600 mb-8">
                <span>By {formData.author}</span>
                <span>•</span>
                <span>{Math.ceil(formData.content.split(' ').length / 200)} min read</span>
              </div>

              <div className="prose prose-lg max-w-none">
                {formData.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {formData.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {story ? 'Edit Your Story' : 'Share Your Story'}
              </h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsPreview(true)}
                  className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={onCancel}
                  className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="h-4 w-4" />
                <span>Story Title</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="What's your story about?"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Category Selection */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-4">
                <Tag className="h-4 w-4" />
                <span>Choose Your Theme</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = formData.category === category.name;
                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => handleInputChange('category', category.name)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </button>
                  );
                })}
              </div>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

           
              
             

            {/* Excerpt */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Story Summary</label>
                <button
                  type="button"
                  onClick={generateExcerpt}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Auto-generate
                </button>
              </div>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="A brief summary of your story..."
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.excerpt ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
            </div>

            {/* Content */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Your Story</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Share your authentic experience. This is a safe space for your truth..."
                rows={20}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              <div className="text-sm text-gray-500 mt-2">
                Word count: {formData.content.split(' ').filter(word => word.length > 0).length} |
                Estimated read time: {Math.ceil(formData.content.split(' ').length / 200)} minutes
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Tags (Optional)</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tags..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{story ? 'Update Story' : 'Share Story'}</span>
              </button>
            </div>
          </div>
        </div>
      </div> </div>
    
  );
};

export default StoryEditor;