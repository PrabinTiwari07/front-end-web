import Footer from "@/components/footer.jsx";
import Navbar from "@/components/navbar.jsx";
import React from "react";
import { Link } from "react-router-dom";

export const colors = {
  primary: "#0D9488", // teal-600
  primaryHover: "#0F766E", // teal-700
  secondary: "#4F46E5", // indigo-600
  secondaryHover: "#4338CA", // indigo-700
  accent: "#9333EA", // purple-600
  background: "#F1F5F9", // slate-100
  cardBg: "#FFFFFF", // white
  text: "#1E293B", // slate-800
  textLight: "#64748B", // slate-500
  success: "#059669", // emerald-600
  error: "#DC2626", // red-600
};

export const SectionHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-10 ${className}`}>
      <h2 className="text-4xl font-extrabold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light mt-2">
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
      className={`bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-teal-700 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all duration-300 ${className}`}
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
      className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-500 border border-gray-200 hover:shadow-lg ${className}`}
    >
      {image && (
        <div className="w-full h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
        {price && <p className="text-teal-600 font-bold text-lg mt-2">${price}</p>}
        {buttonText && buttonLink && (
          <Link to={buttonLink}>
            <PrimaryButton className="mt-3">{buttonText}</PrimaryButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export const PageContainer = ({ children, bgColor = "bg-gray-100", className = "" }) => {
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
