import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const Navbar = ({ username, onLogout }) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleHomeClick = () => {
    navigate('/'); 
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    onLogout(); 
  };

  return (
    <nav className="bg-white-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span
            className="text-black text-xl font-bold cursor-pointer"
            onClick={handleHomeClick}
          >
            Ralphy Resumes
          </span>
        </div>
        <div>
          {
          username ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-black text-sm px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-800 transition duration-300 focus:outline-none"
              >
                {username} 
              </button>
              {
              showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-400 border rounded-lg shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800">
                    View profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="text-black text-sm px-4 py-2 border border-black rounded hover:text-gray-800 transition duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
