import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { School, MapPin, Heart } from 'lucide-react';

interface Profile {
  name: string;
  age: number;
  college: string;
  photos: string[];
  bio: string;
  interests: string[];
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  return (
    <div className="bg-white rounded-3xl overflow-hidden h-full card-shadow">
      <div className="relative h-[70%]">
        <img
          src={profile.photos[currentPhotoIndex]}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">
              {profile.name}, {profile.age}
            </h2>
            <div className="flex items-center gap-2">
              <School className="w-5 h-5" />
              <span className="text-sm">{profile.college}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-700">{profile.bio}</p>

        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-coral/10 text-coral rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {profile.photos.length > 1 && (
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
          {profile.photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;