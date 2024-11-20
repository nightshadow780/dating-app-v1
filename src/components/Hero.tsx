import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, School } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect Match on
              <span className="text-coral"> Campus</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with verified students from colleges across the country. 
              Make meaningful connections in a safe, trusted environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-coral hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
                Join Now
              </button>
              <button className="border-2 border-coral text-coral px-8 py-3 rounded-full font-semibold hover:bg-coral hover:text-white transition-all">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800"
                alt="Students socializing"
                className="rounded-3xl shadow-2xl floating"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl card-shadow">
                <div className="flex items-center gap-3">
                  <div className="bg-coral/10 p-2 rounded-full">
                    <Heart className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">1000+</p>
                    <p className="text-sm text-gray-600">Daily Matches</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Shield className="w-8 h-8 text-coral" />,
              title: "Verified Profiles",
              description: "Every user is verified with their college email"
            },
            {
              icon: <Users className="w-8 h-8 text-teal" />,
              title: "Safe Community",
              description: "Advanced safety features and 24/7 moderation"
            },
            {
              icon: <School className="w-8 h-8 text-yellow" />,
              title: "Cross-Campus",
              description: "Connect with students from different colleges"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl card-shadow hover:transform hover:scale-105 transition-all">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;