import React, { useEffect } from "react";
import {
    FaServicestack, FaShoppingCart,
    FaSignOutAlt, FaThLarge, FaUser
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ darkMode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const handleLogout = () => {
        toast.info(
            <div className="p-4 rounded-md">
                <p className="text-lg font-semibold text-gray-800">Are you sure you want to log out?</p>
                <div className="flex justify-end mt-4 space-x-3">
                    <button 
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                        onClick={() => toast.dismiss()}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                        onClick={confirmLogout}
                    >
                        Yes, Logout
                    </button>
                </div>
            </div>, 
            { autoClose: false, closeOnClick: false }
        );
    };

const confirmLogout = () => {
    localStorage.removeItem("adminToken"); 
    localStorage.setItem("logoutSuccess", "true"); 
    toast.dismiss(); 
    navigate("/signin"); 
};


    return (
        <div className={`absolute top-0 left-0 m-4 w-64 h-[95vh] rounded-3xl transition-all duration-300 shadow-lg z-50
            ${darkMode ? "bg-teal-700 text-white" : "bg-teal-500 text-white"}`}>

            <div className="flex items-center justify-center py-6">
                <h2 className="text-2xl font-bold">CleanEase</h2>
            </div>

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
                        <NavLink to="/dashboard/bookings" className={({ isActive }) => 
                            `flex items-center space-x-3 p-3 rounded-lg transition ${
                                isActive ? "bg-white text-teal-600 font-bold" : "hover:bg-white hover:bg-opacity-20"
                            }` }>
                            <FaShoppingCart className="text-xl" />
                            <span className="text-lg">Bookings</span>
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

            <div className="p-4">
                <div 
                    className="flex items-center space-x-3 p-3 bg-red-500 hover:bg-red-600 transition cursor-pointer rounded-lg"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="text-xl" />
                    <span className="text-lg">Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
