import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, School } from 'lucide-react';
import AuthLayout from './AuthLayout';

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    college: '',
    studentId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle final submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join the community of verified college students"
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
      >
        {step === 1 ? (
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="sr-only">College Email</label>
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-coral focus:border-coral"
                placeholder="Your college email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-coral focus:border-coral"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="college" className="sr-only">College Name</label>
              <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="college"
                name="college"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-coral focus:border-coral"
                placeholder="Your college name"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="studentId" className="sr-only">Student ID</label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-coral focus:border-coral"
                placeholder="Student ID number"
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-coral hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral"
          >
            {step === 1 ? 'Continue' : 'Create Account'}
          </button>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <a href="#" className="font-medium text-coral hover:text-opacity-90">
            Sign in
          </a>
        </div>
      </motion.form>
    </AuthLayout>
  );
};

export default SignUpForm;