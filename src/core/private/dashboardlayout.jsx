import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/adminnavbar.jsx"; // ✅ Import Navbar
import Sidebar from "../../components/sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-5">
                {/* ✅ Add Navbar at the top */}
                <AdminNavbar />

                {/* ✅ Page Content */}
                <div className="mt-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
