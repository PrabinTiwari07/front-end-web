import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/adminnavbar";
import Sidebar from "../../components/sidebar";

const DashboardLayout = ({ darkMode, setDarkMode }) => {
    return (
        <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-all duration-300`}>
            <Sidebar darkMode={darkMode} />

            <div className="flex-1 flex flex-col p-5">
                <AdminNavbar darkMode={darkMode} setDarkMode={setDarkMode} />

                <div className="mt-5 p-5 rounded-lg bg-white dark:bg-gray-800 transition-all duration-300">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
