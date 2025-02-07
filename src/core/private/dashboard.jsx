// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Sidebar from "../../components/sidebar";
// import Analytics from "./analytics";
// import Customers from "./customers";
// import Employees from "./employees";
// import Orders from "./orders";
// import Services from "./services";
// import Settings from "./settings";

// const Dashboard = () => {
//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Sidebar Component */}
//             <Sidebar />

//             {/* Main Content */}
//             <div className="flex-1 p-5">
//                 {/* Topbar */}
//                 <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-5">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="input input-bordered w-1/3"
//                     />
//                     <div className="flex items-center space-x-4">
//                         <span className="text-lg font-semibold">Prabin</span>
//                         <div className="avatar">
//                             <div className="w-10 rounded-full">
//                                 <img
//                                     src="https://via.placeholder.com/40"
//                                     alt="Profile"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="grid grid-cols-4 gap-4 mb-5">
//                     <button className="btn btn-primary">Clothes</button>
//                     <button className="btn btn-primary">Pants</button>
//                     <button className="btn btn-primary">Jackets</button>
//                     <button className="btn btn-primary">See More</button>
//                 </div>

//                 {/* Routes for Dashboard Sub-Pages */}
//                 <Routes>
//                     <Route path="/" element={<Orders />} /> 
//                     <Route path="/orders" element={<Orders />} />
//                     <Route path="/customers" element={<Customers />} />
//                     <Route path="/services" element={<Services />} />
//                     <Route path="/analytics" element={<Analytics />} />
//                     <Route path="/settings" element={<Settings />} />
//                     <Route path="/employees" element={<Employees />} />
//                 </Routes>

//                 {/* Stats */}
//                 <div className="flex justify-between mt-5">
//                     <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
//                         <div className="badge badge-success p-3">100</div>
//                         <span>Orders Completed</span>
//                     </div>
//                     <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
//                         <div className="badge badge-error p-3">10</div>
//                         <span>Orders Cancelled</span>
//                     </div>
//                 </div>

//                 {/* Graphs */}
//                 <div className="grid grid-cols-2 gap-4 mt-5">
//                     <div className="bg-white p-5 rounded-lg shadow">
//                         <h2 className="text-lg font-bold mb-3">Status of Orders</h2>
//                         <p>Graph goes here...</p>
//                     </div>
//                     <div className="bg-white p-5 rounded-lg shadow">
//                         <h2 className="text-lg font-bold mb-3">Rating</h2>
//                         <p>Rating graph here...</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
import React from "react";
import { Route, Routes } from "react-router-dom";
import Analytics from "./analytics";
import Customers from "./customers";
import DashboardLayout from "./dashboardlayout";
import Employees from "./employees";
import Orders from "./orders";
import Settings from "./settings";

const Dashboard = () => {
    return (
        <Routes>
            {/* 🔥 FIXED: Use `/*` for nested routes */}
            <Route path="/*" element={<DashboardLayout />}>
                <Route index element={<Orders />} /> {/* Default Page */}
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="employees" element={<Employees />} />
            </Route>
        </Routes>
    );
};

export default Dashboard;
