import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotificationClick = () => {
    setUnreadCount(0); // Reset unread count
    navigate("/notification"); // Navigate to the Notification page
  };

  return (
    <nav className="bg-teal-600">
      <div className="navbar bg-teal-400 text-white">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl hover:bg-black">Clean Ease</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a className="hover:bg-black">Home</a></li>
            <li><a className="hover:bg-black">Service</a></li>
            <li><a className="hover:bg-black">Contact</a></li>
          </ul>
        </div>

        <div className="navbar-end flex items-center">
          {/* Notification Icon */}
          <div className="relative">
            <button onClick={handleNotificationClick} className="btn btn-ghost btn-circle">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
