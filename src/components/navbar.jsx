import { Bell, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [logoutPrompt, setLogoutPrompt] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || "http://localhost:3000/uploads/default.jpg"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user details.");

      const userData = await response.json();
      setUserId(userData._id);

      if (userData.image) {
        if (userData.image.startsWith("http")) {
          setUserImage(userData.image);
        } else {
          setUserImage(`http://localhost:3000${userData.image}`);
        }
        localStorage.setItem("userProfileImage", userImage);
      }
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    navigate("/signin");
  };

  return (
    <>
      {logoutPrompt && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg px-6 py-4 rounded-lg text-center z-50">
          <p className="text-gray-800 font-semibold">Are you sure you want to log out?</p>
          <div className="flex justify-center mt-3 gap-3">
            <button onClick={confirmLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Yes, Logout
            </button>
            <button onClick={() => setLogoutPrompt(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      <nav className="bg-teal-600 rounded-b-lg shadow-lg">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center">
            <a className="text-xl font-bold text-white cursor-pointer" onClick={() => navigate("/")}>
              Clean Ease
            </a>
          </div>

          <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
            <Menu className="w-8 h-8" />
          </button>

          <div className="hidden lg:flex items-center space-x-6">
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => navigate("/")}>
              Home
            </a>
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => navigate("/service")}>
              Service
            </a>
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => navigate("/contact")}>
              Contact
            </a>
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => navigate("/booking")}>
              My Bookings
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="text-white">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            <div className="relative">
              {userId ? (
                <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img src={userImage} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                </button>
              ) : (
                <button 
                  onClick={() => navigate("/signin")} 
                  className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                  Sign In
                </button>
              )}

              {dropdownOpen && userId && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg z-50">
                  <ul className="py-2 text-black">
                    <li><a onClick={() => navigate("/profile")} className="cursor-pointer">Profile</a></li>
                    <li><a onClick={() => setLogoutPrompt(true)} className="cursor-pointer text-red-600">Logout</a></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden flex flex-col items-center space-y-4 bg-teal-500 py-4">
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>
              Home
            </a>
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => { navigate("/service"); setMobileMenuOpen(false); }}>
              Service
            </a>
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => { navigate("/contact"); setMobileMenuOpen(false); }}>
              Contact
            </a>
            <a className="hover:bg-black text-white px-4 py-2 rounded-lg cursor-pointer" onClick={() => { navigate("/booking"); setMobileMenuOpen(false); }}>
              My Bookings
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
