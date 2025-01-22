import React from "react";
import Footer from "../../../components/footer.jsx";
import Hero from "../../../components/hero.jsx";
import Navbar from "../../../components/navbar.jsx";

const HomePage = () => {
    const services = [
        {
            title: "Automated Laundry",
            image: "src/assets/images/automated_laundry.avif",
            isNew: false,
        },
        {
            title: "Dry Cleaning",
            image: "src/assets/images/dry_cleaning.png",
            isNew: false,
        },
        {
            title: "Only Press",
            image: "src/assets/images/iron.jpeg",
            isNew: false,
        },
        {
            title: "Shoe Cleaning",
            image: "src/assets/images/shoe_cleaning.webp",
            isNew: true,
        },

    ];

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            <main className="bg-gray-100">
                {/* Hero Section */}
                <Hero />

                {/* Services Section */}
                <div className="container mx-auto py-12 px-6">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        Our Services
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-all duration-300"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    {service.title}
                                    {service.isNew && (
                                        <div className="badge badge-secondary px-2 py-1 text-xs rounded-full text-white bg-teal-500">
                                            NEW!
                                        </div>
                                    )}
                                </h3>
                                <p className="text-gray-500 text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enjoy our high-quality service.
                                </p>
                                <div className="mt-4 text-teal-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
