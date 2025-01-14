import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer.jsx";
import Hero from "../../../components/hero.jsx"; // Ensure this path points to your Hero component
import Navbar from "../../../components/navbar.jsx";

const HomePage = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <main className="bg-gray-100">
                {/* Hero */}
                <Hero />

                {/* Welcome Section */}
                <section className="text-center py-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to CleanEase
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Your ultimate solution for laundry and dry cleaning services.
                    </p>

                    {/* Navigation Button */}
                    <Link
                        to="/login"
                        aria-label="Navigate to Login Page"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg transition duration-300"
                    >
                        Go to Login Page
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
