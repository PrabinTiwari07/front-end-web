import Footer from "@/components/footer.jsx";
import Navbar from "@/components/navbar.jsx";
import React from "react";
import { Link } from "react-router-dom";

export const colors = {
  primary: "#2DD4BF", // teal-400 (brighter teal)
  primaryHover: "#26A69A", // teal-500
  secondary: "#6366F1", // indigo-500
  secondaryHover: "#4F46E5", // indigo-600
  accent: "#A78BFA", // purple-400
  background: "#F8FAFC", // slate-50
  cardBg: "#FFFFFF", // white
  text: "#1E293B", // slate-800
  textLight: "#64748B", // slate-500
  success: "#10B981", // emerald-500
  error: "#F43F5E", // rose-500
};

export const SectionHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-4xl font-extrabold text-slate-800 bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 mb-2 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const PrimaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-teal-600 hover:to-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export const Card = ({
  image,
  title,
  description,
  price,
  buttonText,
  buttonLink,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-500 border border-slate-100 hover:shadow-xl ${className}`}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
        {price && <p className="text-teal-500 font-bold text-lg mt-2">${price}</p>}
        {buttonText && buttonLink && (
          <Link to={buttonLink}>
            <PrimaryButton className="mt-3">{buttonText}</PrimaryButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export const PageContainer = ({ children, bgColor = "bg-transparent", className = "" }) => {
    return (
      <div className={`flex flex-col min-h-screen ${bgColor} ${className}`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  };
  

export const Section = ({ children, bgColor = "bg-white", className = "" }) => {
  return (
    <section className={`py-16 px-6 ${bgColor} ${className}`}>
      <div className="container mx-auto max-w-7xl">{children}</div>
    </section>
  );
};
