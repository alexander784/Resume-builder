import React from 'react';
import { useNavigate } from 'react-router-dom';
import resume from "../assets/resume.png";
import Services from '../Pages/Services';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    // console.log('Token:', token);
    if (token) {
      navigate('/template');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="hero min-h-screen bg--white-400 text-black flex items-center">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Ralphy Resumes</h1>
          <p className="text-lg mt-4">Build your classic Resume in seconds.</p>
          <img 
            src={resume}
            alt="Resume"
            onClick={handleGetStarted}
            className="cursor-pointer mx-auto mt-4 w-32 h-32 object-cover rounded-lg"/>
        </div>
      </div>
    </section>
  );
};


export default Hero;
