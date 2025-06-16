import React, { use } from 'react';
import { FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext/AuthContext';

const Footer = () => {
    const {user } = use(AuthContext)
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h4 className="text-xl font-bold">Petuk</h4>
          <p className="text-sm mt-2">Your ultimate solution for efficient restaurant management.</p>
          <p className="text-sm mt-2">&copy; 2025 Petuk. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a 
            href="https://github.com/hd31520" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-lg hover:text-gray-400 space-x-2"
          >
            <FaGithub className="text-2xl" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://www.facebook.com/Hridoy3240/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-lg hover:text-gray-400 space-x-2"
          >
            <FaFacebook className="text-2xl" />
            <span>Facebook</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/md-hridoy-sheikh-b16b01298/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-lg hover:text-gray-400 space-x-2"
          >
            <FaLinkedin className="text-2xl" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="mt-6 text-center">
        <ul className="text-sm">
          <li><NavLink to="/" className="hover:text-gray-400">Home</NavLink></li>
          <li><NavLink to="/allfood" className="hover:text-gray-400">All Foods</NavLink></li>
          <li><NavLink to="/gallery" className="hover:text-gray-400">Gallery</NavLink></li>
          {user ? "" : <li><NavLink to="/login" className="hover:text-gray-400">Login</NavLink></li>}
        </ul>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm">Contact Us: support@petuk.com</p>
        <p className="text-sm">Phone: +880-XXXXXXXX</p>
      </div>
    </footer>
  );
};

export default Footer;
