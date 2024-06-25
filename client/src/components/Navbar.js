import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-10 mr-3" />
          <span className="text-white text-xl font-bold">Ralphy</span>
        </div>
        <div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
