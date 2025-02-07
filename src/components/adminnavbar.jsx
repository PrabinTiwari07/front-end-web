import React, { useEffect } from "react";

const AdminNavbar = ({ darkMode, setDarkMode }) => {
    // Apply dark mode theme globally
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <div className={`fixed top-4 left-72 right-4 p-4 flex justify-between items-center transition-all duration-300 shadow-lg 
                        rounded-2xl z-50 ${darkMode ? "bg-teal-700 text-white" : "bg-teal-500 text-white"}`}>
            {/* Search Bar */}
            <input 
                type="text" 
                placeholder="Search..." 
                className="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-300"
            />

            {/* Profile Section & Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <label className="flex cursor-pointer gap-2">
                    <input 
                        type="checkbox"
                        className="toggle theme-controller"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <span>{darkMode ? "🌙" : "☀️"}</span>
                </label>

                {/* Profile Image */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img src="src/assets/images/cleanEase_1.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
