import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminNavbar from "../../components/adminnavbar";
import Sidebar from "../../components/sidebar";
import Analytics from "./analytics";
import Customers from "./customers";
import Employees from "./employees";
import Orders from "./orders";
import Services from "./services";
import Settings from "./settings";

const Dashboard = () => {
    // Dark mode state
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
        <div className={`flex h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {/* Sidebar */}
            <Sidebar darkMode={darkMode} />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col ml-60 p-20 transition-all duration-300">
                {/* Navbar with Dark Mode Toggle */}
                <AdminNavbar darkMode={darkMode} setDarkMode={setDarkMode} />

                {/* Page Content */}
                <div className={`p-5 mt-4 shadow-md rounded-lg transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                    <Routes>
                        <Route path="/" element={<Orders />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/employees" element={<Employees />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
