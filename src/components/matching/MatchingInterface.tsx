import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Heart, X, MessageCircle, School } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { useStore } from '../../store/useStore';
import NotificationCenter from '../notifications/NotificationCenter';
import ChatInterface from '../chat/ChatInterface';

const MatchingInterface = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  const { matches, addMatch, addNotification } = useStore();

  const handleSwipe = (direction: 'left' | 'right') => {
    setDirection(direction);
    if (direction === 'right') {
      const profile = profiles[currentIndex];
      addMatch(profile);
      addNotification({
        id: Date.now(),
        type: 'like',
        content: `You liked ${profile.name}!`,
        timestamp: new Date(),
        read: false,
        profileId: profile.id,
      });
    }
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300);
  };

  const bindDrag = useDrag(({ movement: [mx], direction: [dx], velocity, down }) => {
    if (!down && velocity > 0.3) {
      handleSwipe(dx > 0 ? 'right' : 'left');
    }
  });

  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No more profiles</h2>
        <p className="text-gray-600">Check back later for more matches!</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <div className="flex-1 max-w-lg mx-auto pt-20 px-4 relative">
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <NotificationCenter />
          {matches.length > 0 && (
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 text-gray-600 hover:text-coral transition-colors relative"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {matches.length}
              </span>
            </button>
          )}
        </div>

        <div className="relative h-[calc(100vh-120px)]">
          <AnimatePresence>
            <motion.div
              key={currentProfile.id}
              {...bindDrag()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0
              }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ProfileCard profile={currentProfile} />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-8 h-8 text-gray-400" />
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 bg-coral rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Heart className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="w-96 h-screen border-l bg-white"
          >
            {selectedMatch !== null ? (
              <ChatInterface
                match={matches.find((m) => m.id === selectedMatch)!}
              />
            ) : (
              <div className="p-4">
                <h3 className="font-semibold mb-4">Your Matches</h3>
                <div className="space-y-2">
                  {matches.map((match) => (
                    <button
                      key={match.id}
                      onClick={() => setSelectedMatch(match.id)}
                      className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <img
                        src={match.photos[0]}
                        alt={match.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ml-3 text-left">
                        <p className="font-medium">{match.name}</p>
                        <p className="text-sm text-gray-500">{match.college}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchingInterface;