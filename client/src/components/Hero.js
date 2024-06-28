import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/resume');
  };

  const handleView = () => {
    navigate('/ResumeDetails');
  };

  return (
    <section className="hero min-h-screen bg-gray-800 text-white flex items-center">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Welcome to Ralphy Resume</h1>
          <p className="text-lg mt-4">Build your classic Resume in seconds.</p>
          <button 
            onClick={handleGetStarted} 
            className="bg-white text-gray-800 px-6 py-3 mt-4 rounded-lg shadow-lg hover:bg-gray-200 hover:text-gray-900 transition duration-300">
            Get Started
          </button>
          <button 
            onClick={handleView} 
            className="bg-white text-gray-800 px-6 py-3 mt-4 rounded-lg shadow-lg hover:bg-gray-200 hover:text-gray-900 transition duration-300">
            View
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
