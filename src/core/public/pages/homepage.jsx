import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer.jsx";
import Navbar from "../../../components/navbar.jsx";

const HomePage = () => {
    return (
        <div>
            <Navbar />

            <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to the Home Page
                </h1>
                <Link
                    to="/authentication"
                    aria-label="Navigate to Login Page"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Go to Login Page
                </Link>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
