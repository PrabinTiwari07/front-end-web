import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Dashboard from "./core/public/pages/dashboard";
import HomePage from "./core/public/pages/homepage";
import LoginPage from "./core/public/pages/loginpage";
import SignupPage from "./core/public/pages/signup";

import ContactPage from "./core/public/pages/contactpage";
import ServicePage from "./core/public/pages/servicepage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/service" element={<ServicePage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}


      </Routes>
    </Router>
  );
};

export default App;
