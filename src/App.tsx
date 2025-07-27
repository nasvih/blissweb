import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import FeaturedStories from './components/FeaturedStories';
import StoryThemes from './components/StoryThemes';
import StoryBrowser from './components/StoryBrowser';
import StoryEditor from './components/StoryEditor';
import StoryReader from './components/StoryReader';
import Footer from './components/Footer';
import { Story } from './types/Story';
import { demoStories } from './data/demoStories';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'browse' | 'share' | 'about' | 'guidelines' | 'faq' | 'admin' | 'read'>('home');
  const [stories, setStories] = useState<Story[]>(demoStories);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  const handlePublishStory = (story: Omit<Story, 'id' | 'publishedAt' | 'readTime'>) => {
    const newStory: Story = {
      ...story,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      readTime: Math.ceil(story.content.split(' ').length / 200)
    };
    
    setStories(prev => [newStory, ...prev]);
    setCurrentPage('browse');
  };

  const handleEditStory = (story: Story) => {
    setEditingStory(story);
    setCurrentPage('share');
  };

  const handleUpdateStory = (updatedStory: Omit<Story, 'id' | 'publishedAt' | 'readTime'>) => {
    if (editingStory) {
      const updated: Story = {
        ...editingStory,
        ...updatedStory,
        readTime: Math.ceil(updatedStory.content.split(' ').length / 200)
      };
      
      setStories(prev => prev.map(s => s.id === editingStory.id ? updated : s));
      setEditingStory(null);
      setCurrentPage('browse');
    }
  };

  const handleReadStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage('read');
  };

  const handleDeleteStory = (storyId: string) => {
    setStories(prev => prev.filter(s => s.id !== storyId));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'browse':
        return (
          <StoryBrowser
            stories={stories}
            onReadStory={handleReadStory}
            onEditStory={handleEditStory}
            onDeleteStory={handleDeleteStory}
          />
        );
      case 'share':
        return (
          <StoryEditor
            story={editingStory}
            onPublish={editingStory ? handleUpdateStory : handlePublishStory}
            onCancel={() => {
              setEditingStory(null);
              setCurrentPage('home');
            }}
          />
        );
      case 'about':
        return <About />;
      case 'read':
        return selectedStory ? (
          <StoryReader
            story={selectedStory}
            onBack={() => setCurrentPage('browse')}
          />
        ) : null;
      default:
        return (
          <>
            <Hero onShareStory={() => setCurrentPage('share')} onBrowseStories={() => setCurrentPage('browse')} />
            <HowItWorks />
            <FeaturedStories stories={stories.slice(0, 3)} onReadStory={handleReadStory} />
            <StoryThemes />
            <About />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
      />
      
      <main className="transition-all duration-500 ease-in-out">
        {renderCurrentPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;