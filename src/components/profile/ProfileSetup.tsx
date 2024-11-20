import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus } from 'lucide-react';

const ProfileSetup = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos([...photos, event.target.result as string].slice(0, 5));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const interestOptions = [
    'Sports', 'Music', 'Art', 'Gaming', 'Reading',
    'Travel', 'Food', 'Movies', 'Technology', 'Fitness'
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="mt-1 text-sm text-gray-600">
            Let others know more about you
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Photos (Max 5)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden bg-gray-100"
              >
                {photos[index] ? (
                  <img
                    src={photos[index]}
                    alt={`Profile photo ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <label className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-gray-200 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={photos.length >= 5}
                    />
                    <Plus className="w-8 h-8 text-gray-400" />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-coral focus:ring-coral"
            placeholder="Tell others about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  if (interests.includes(interest)) {
                    setInterests(interests.filter(i => i !== interest));
                  } else {
                    setInterests([...interests, interest]);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  interests.includes(interest)
                    ? 'bg-coral text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="w-full py-3 px-4 rounded-full text-white bg-coral hover:bg-opacity-90 transition-colors font-medium"
        >
          Complete Profile
        </button>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;