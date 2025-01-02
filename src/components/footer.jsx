import React from "react";

const Footer = () => {
    return (
        <footer className="bg-teal-400 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">
                {/* About Us */}
                <div>
                    <h6 className="font-bold text-lg mb-4">About us</h6>
                    <p className="text-sm mb-4">
                        Here, we offer best value to our customer with good and quality services.
                    </p>
                    <div className="flex space-x-3 text-lg">
                        <a href="#" aria-label="Instagram" className="hover:text-gray-700">
                            📷
                        </a>
                        <a href="#" aria-label="Telegram" className="hover:text-gray-700">
                            📨
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-gray-700">
                            📘
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-gray-700">
                            ▶️
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-gray-700">
                            🔗
                        </a>
                    </div>
                </div>

                {/* Get in Touch */}
                <div>
                    <h6 className="font-bold text-lg mb-4">Get in touch</h6>
                    <p className="text-sm mb-2">
                        Thousands of people trusted us using this website. If you have any queries, you can contact us.
                    </p>
                    <p className="text-sm flex items-center">
                        📍 Jorpati, Kathmandu
                    </p>
                    <p className="text-sm flex items-center">
                        📞 +977 01452625
                    </p>
                    <p className="text-sm flex items-center">
                        📧 cleanease@gmail.com
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h6 className="font-bold text-lg mb-4">Quick Links</h6>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Pages
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h6 className="font-bold text-lg mb-4">Newsletter</h6>
                    <form>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="block w-full mb-2 p-2 rounded-md border border-gray-300 text-gray-900"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="block w-full mb-2 p-2 rounded-md border border-gray-300 text-gray-900"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Submit Now
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
