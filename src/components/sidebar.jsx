import React, { useEffect, useState } from "react";
import { FaChartBar, FaCog, FaServicestack, FaShoppingCart, FaSignOutAlt, FaThLarge, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    // Effect to update the theme
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className={`w-64 h-screen fixed top-4 left-4 rounded-2xl transition-all duration-300 shadow-lg 
            ${darkMode ? "bg-gray-900 text-white" : "bg-teal-500 text-white"}`}>
            
            {/* Logo */}
            <div className="flex items-center justify-center py-6">
                <h2 className="text-2xl font-bold">CleanEase</h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <ul className="space-y-4 p-4">
                    <li>
                        <NavLink 
                            to="/dashboard"
                            end 
                            className={({ isActive }) => 
                                `flex items-center space-x-3 p-3 rounded-lg transition ${
                                    isActive ? "bg-white text-teal-600 font-bold" : "hover:bg-white hover:bg-opacity-20"
                                }`
                            }
                        >
                            <FaThLarge className="text-xl" />
                            <span className="text-lg">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/customers" className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg transition ${
                                isActive ? "bg-white text-teal-600 font-bold" : "hover:bg-white hover:bg-opacity-20"
                            }`}>
                            <FaUser className="text-xl" />
                            <span className="text-lg">Customers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/orders" className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg transition ${
                                isActive ? "bg-white text-teal-600 font-bold" : "hover:bg-white hover:bg-opacity-20"
                            }`}>
                            <FaShoppingCart className="text-xl" />
                            <span className="text-lg">Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/settings" className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg transition ${
                                isActive ? "bg-white text-teal-600 font-bold" : "hover:bg-white hover:bg-opacity-20"
                            }`}>
                            <FaCog className="text-xl" />
                            <span className="text-lg">Settings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/analytics" className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg transition ${
                                isActive ? "bg-white text-teal-600 font-bold" : "hover:bg-white hover:bg-opacity-20"
                            }`}>
                            <FaChartBar className="text-xl" />
                            <span className="text-lg">Analytics</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/services" className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg transition ${
                                isActive ? "bg-white text-teal-600 font-bold" : "hover:bg-white hover:bg-opacity-20"
                            }`}>
                            <FaServicestack className="text-xl" />
                            <span className="text-lg">Services</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Logout */}
            <div className="p-4">
                <div className="flex items-center space-x-3 p-3 bg-red-500 hover:bg-red-600 transition cursor-pointer rounded-lg">
                    <FaSignOutAlt className="text-xl" />
                    <span className="text-lg">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
