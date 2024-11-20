import React, { useState } from 'react';
import Hero from './components/Hero';
import SignUpForm from './components/auth/SignUpForm';
import ProfileSetup from './components/profile/ProfileSetup';
import MatchingInterface from './components/matching/MatchingInterface';
import { Heart } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'signup' | 'profile' | 'matching'>('home');

  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return <SignUpForm />;
      case 'profile':
        return <ProfileSetup />;
      case 'matching':
        return <MatchingInterface />;
      default:
        return (
          <>
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 py-4 card-shadow">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-8 h-8 text-coral" />
                    <span className="text-xl font-bold">CampusConnect</span>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-gray-600 hover:text-coral">How it Works</a>
                    <a href="#" className="text-gray-600 hover:text-coral">Safety</a>
                    <a href="#" className="text-gray-600 hover:text-coral">About</a>
                    <button 
                      onClick={() => setCurrentView('signup')}
                      className="bg-coral text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </nav>
            <Hero />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderView()}
    </div>
  );
}

export default App;