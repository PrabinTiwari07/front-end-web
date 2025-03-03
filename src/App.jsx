import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

import Dashboard from "./core/private/dashboard";

import ChangePassword from "./core/public/pages/auth/changepassword";
import Profile from "./core/public/pages/auth/profile";
import Signin from "./core/public/pages/auth/signin";
import SignupPage from "./core/public/pages/auth/signup";
import BookingDetailsPage from "./core/public/pages/booking/bookingdetailspage";
import ContactPage from "./core/public/pages/contact/contactpage";
import HomePage from "./core/public/pages/home/homepage";
import NotificationBell from "./core/public/pages/home/notification";
import ServiceDetailsPage from "./core/public/pages/service/servicedetailspage";
import ServicePage from "./core/public/pages/service/servicepage";

import "./index.css";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-all duration-300`}>
                <Router>
                    <ToastContainer 
                        position="bottom-right"  
                        autoClose={3000}         
                        hideProgressBar={false}   
                        newestOnTop={true}       
                        closeOnClick={true}       
                        pauseOnHover={true}       
                        draggable={true}         
                    />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/register" element={<SignupPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/booking" element={<BookingDetailsPage />} />

                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/service/:id" element={<ServiceDetailsPage />} />
                    <Route path="/notification" element={<NotificationBell />} />
                    <Route path="/booking/:id" element={<BookingDetailsPage />} />
                    <Route path="/change-password" element={<ChangePassword />} />

                    <Route path="/dashboard/*" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
