import { Bell, CheckCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/notifications/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch notifications.");

      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
      localStorage.setItem("notifications", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const toggleNotificationPopup = () => {
    setShowNotifications(!showNotifications);
    fetchNotifications();
    setUnreadCount(notifications.filter((n) => !n.isRead).length);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification._id === id ? { ...notification, isRead: true } : notification
    );

    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter((n) => !n.isRead).length);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  return (
    <div className="relative">
      <button onClick={toggleNotificationPopup} className="btn btn-ghost btn-circle">
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-black">Notifications</h3>
            <button onClick={toggleNotificationPopup} className="text-gray-600 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-600">No new notifications.</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification._id} className={`flex items-center justify-between p-3 mb-2 ${
                  notification.isRead ? "bg-gray-200 border-l-4 border-gray-400" : "bg-green-100 border-l-4 border-green-500"
                } rounded-lg text-black`}>
                  <span dangerouslySetInnerHTML={{ __html: notification.message }}></span>
                  <button className="ml-2 text-gray-600 hover:text-gray-800" onClick={() => markAsRead(notification._id)}>
                    <CheckCircle className={`w-5 h-5 ${notification.isRead ? "text-gray-500" : "text-blue-500"}`} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
