import { PrimaryButton, SecondaryButton, SectionHeader } from "@/theme/theme.jsx";
import React from "react";
import heroImage from "../assets/images/hero_section.avif";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-teal-50 via-gray-50 to-indigo-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 opacity-10 rounded-full filter blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 opacity-10 rounded-full filter blur-3xl -z-10 animate-pulse delay-700" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-8 py-16">
        <div className="lg:w-1/2 text-center lg:text-left animate-fadeIn space-y-8">
          <SectionHeader
            title="Laundry Simplified"
            subtitle="Laundry is the real never-ending story. Let us handle it for you, so you can focus on what truly matters."
            className="mb-0"
          />
          <div className="flex justify-center lg:justify-start gap-4">
            <PrimaryButton className="px-8 py-3 text-lg rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
              Get Started
            </PrimaryButton>
            <SecondaryButton className="px-8 py-3 text-lg rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
              Learn More
            </SecondaryButton>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center animate-fadeIn delay-300">
          <div className="relative w-full max-w-md lg:max-w-lg group">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 to-indigo-100 opacity-30 blur-2xl rounded-2xl -z-10 group-hover:opacity-50 transition-opacity duration-500" />
            <img
              src={heroImage}
              alt="Laundry Management"
              className="rounded-xl shadow-xl w-full object-cover transform group-hover:scale-105 transition-transform duration-500 border border-gray-100"
            />
            <div className="absolute -top-4 -right-4 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold animate-bounce">
              Easy & Fast
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;