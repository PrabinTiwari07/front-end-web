import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminNavbar from "../../components/adminnavbar";
import Sidebar from "../../components/sidebar";
import Analytics from "./analytics";
import Bookings from "./bookings";
import Customers from "./customers";
import Services from "./services";

const Dashboard = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

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
=            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} className="fixed top-4 left-72 right-4 rounded-2xl shadow-lg z-50" />

            <div className="flex-1 flex flex-col ml-72 p-6 transition-all duration-300">
                <AdminNavbar darkMode={darkMode} setDarkMode={setDarkMode} className="fixed top-4 left-72 right-4 rounded-2xl shadow-lg z-50" />

                <div className={`p-5 mt-20 shadow-md rounded-lg transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                    <Routes>
                        <Route path="/" element={<Analytics />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
