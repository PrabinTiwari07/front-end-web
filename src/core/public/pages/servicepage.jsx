import React from "react";

const ServicePage = () => {
    const services = [
        {
            title: "Automated Laundry",
            icon: "🌀",
        },
        {
            title: "Dry Cleaning",
            icon: "🧺",
        },
        {
            title: "Only Press",
            icon: "🧼",
        },
        {
            title: "Shoe Cleaning",
            icon: "👟",
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center transform hover:scale-105 transition-all duration-300 relative"
                    >
                        <div className="flex flex-col items-start">
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h2 className="text-xl font-semibold text-gray-700">
                                {service.title}
                            </h2>
                        </div>
                        <div className="absolute bottom-4 right-4 text-purple-400">
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
    );
};

export default ServicePage;
