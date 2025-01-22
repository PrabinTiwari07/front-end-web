import React, { useState } from "react";
import { FaCog, FaShoppingCart, FaSignOutAlt, FaThLarge, FaUser } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`${isOpen ? "w-64" : "w-16"
                    } bg-teal-500 text-white flex flex-col transition-all duration-300 items-center rounded-tr-2xl rounded-br-2xl`}
            >
                {/* Logo */}
                <div className="flex items-center justify-center mt-4">
                    <img
                        src="src/assets/images/cleanEase_1.png"
                        alt="CleanEase Logo"
                        className={`${isOpen ? "w-20" : "w-10"} transition-all duration-300`}
                    />
                </div>
                {isOpen && (
                    <h2 className="text-xl font-bold mt-2">CleanEase</h2>
                )}

                {/* Navigation */}
                <nav className="flex-1 mt-8 w-full">
                    <ul className="flex flex-col items-center">
                        <li className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl mb-4 hover:bg-gray-300 cursor-pointer">
                            <FaThLarge className="text-blue-600 text-2xl" />
                        </li>
                        <li className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl mb-4 hover:bg-gray-300 cursor-pointer">
                            <FaUser className="text-blue-600 text-2xl" />
                        </li>
                        <li className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl mb-4 hover:bg-gray-300 cursor-pointer">
                            <FaShoppingCart className="text-blue-600 text-2xl" />
                        </li>
                        <li className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl mb-4 hover:bg-gray-300 cursor-pointer">
                            <FaCog className="text-blue-600 text-2xl" />
                        </li>
                    </ul>
                </nav>

                {/* Logout */}
                <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-xl hover:bg-gray-300 cursor-pointer">
                        <FaSignOutAlt className="text-blue-600 text-2xl mb-1" />
                    </div>
                    {isOpen && <span className="text-sm mt-2">Logout</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
