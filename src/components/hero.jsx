import React, { useEffect, useState } from "react";

const Hero = () => {
    // Array of carousel items
    const slides = [
        {
            id: 1,
            image: "src/assets/images/washing-machine-1.jpg", // Use public folder path
            title: "Laundry and Dry Cleaning",
            subtitle: "Best for Laundry Services",
        },
        {
            id: 2,
            image: "src/assets/images/washing-machine.png", // Use public folder path
            title: "Laundry and Dry Cleaning",
            subtitle: "Highly Professional Staff",
        },
    ];

    // State for active slide
    const [currentSlide, setCurrentSlide] = useState(0);

    // Automatically switch slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [slides.length]);

    return (
        <div className="relative w-full h-96 overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.subtitle}
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                        <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
                        <button className="bg-white text-black px-6 py-2 text-lg rounded-lg font-semibold hover:bg-gray-200">
                            Learn More
                        </button>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow hover:bg-opacity-100"
                onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                }
            >
                &#8249;
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow hover:bg-opacity-100"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            >
                &#8250;
            </button>
        </div>
    );
};

export default Hero;
