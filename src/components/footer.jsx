

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Laundry Services</h3>
            <p className="text-gray-400 mb-4">
              Providing top-quality laundry services since 2024. Your clothes deserve the best care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-teal-400 transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-teal-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Our Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Laundry</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Iron</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Shoe Cleaning</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Special Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Contact Us</h4>
            <address className="not-italic text-gray-300">
              <p className="mb-2">Clean Ease</p>
              <p className="mb-2">City, Jorpati</p>
              <p className="mb-2">Phone: 9869028215</p>
              <p>Email: cleanease@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Laundry Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;