import React from 'react';
import heroImage from '../assets/images/hero_section.avif';

const Hero = () => {
    return (
        <div className="hero min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100 flex flex-col lg:flex-row items-center justify-between px-10 py-12">
            {/* Text Content - Left Side */}
            <div className="flex-1 text-center lg:text-left">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 mb-8">
                    Laundry Simplified
                </h1>
                <p className="mb-8 text-lg text-gray-700 leading-relaxed">
                    "Laundry is the real never-ending story. Let us handle it for you, so you can focus on what truly matters."
                </p>
                <button className="btn bg-indigo-600 hover:bg-indigo-800 text-white py-4 px-8 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105">
                    Get Started
                </button>
            </div>

            {/* Image - Right Side */}
            <div className="flex-1 flex justify-center">
                <img
                    src={heroImage}
                    alt="Laundry Management"
                    className="rounded-lg shadow-2xl w-full max-w-lg lg:max-w-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </div>
        </div>
    );
};

export default Hero;
