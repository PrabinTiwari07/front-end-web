import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const fetchUserId = async () => {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");

    if (!token) {
      console.warn("❌ No token found in localStorage. Cannot fetch notifications.");
      setLoading(false);
      return;
    }

    try {
      const userResponse = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const userData = await userResponse.json();
      setUserId(userData._id);
    } catch (error) {
      console.error("❌ Error fetching user ID:", error);
    }
  };

  useEffect(() => {
    fetchUserId();
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      console.log(`Fetching notifications for userId: ${userId}`);
      const response = await fetch(`http://localhost:3000/api/notifications/${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(" Fetched Notifications:", data);

      const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
      const mergedNotifications = [...data, ...storedNotifications];

      const uniqueNotifications = Array.from(new Map(mergedNotifications.map((n) => [n._id, n])).values());

      setNotifications(uniqueNotifications);
      localStorage.setItem("notifications", JSON.stringify(uniqueNotifications));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  return (
    <div className="fixed top-10 right-5 w-96 bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Notifications</h3>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
                notification.isRead
                  ? "bg-gray-100 border-l-4 border-gray-400"
                  : notification.type === "success"
                  ? "bg-green-100 border-l-4 border-green-500"
                  : "bg-red-100 border-l-4 border-red-500"
              }`}
            >
              <span>{notification.message}</span>
              <button
                className="ml-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  const updatedNotifications = notifications.filter((n) => n._id !== notification._id);
                  setNotifications(updatedNotifications);
                  localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
