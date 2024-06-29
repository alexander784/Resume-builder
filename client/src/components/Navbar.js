import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ( { username }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-green-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="/path-to-your-logo.png" alt="Logo" className="h-10 mr-3" /> */}
          <span
            className="text-white text-xl font-bold cursor-pointer"
            onClick={handleHomeClick}
          >
            Ralphy
          </span>
        </div>
        <div>
          {username ? (
            <div>
              <span className="text-white text-sm px-4 py-2">
                {username}
              </span>
            </div>
          ) :  (
            <div>
            <Link to="/login" className="text-white text-sm px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-800 transition duration-300">
            Login
          </Link>
        </div>
          )}
        <div>
          
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
