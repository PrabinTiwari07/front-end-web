import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/navbar.jsx";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingMessage, setBookingMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/services/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch service details");
        }
        const data = await response.json();
        setService(data);
      } catch (error) {
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      showMessage("Please select date and time.", "error");
      return;
    }

    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    if (!token) {
      showMessage("You need to log in first.", "error");
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
      const userId = userData._id;

      if (!userId) {
        throw new Error("User ID not found.");
      }

      const localDate =
        selectedDate.getFullYear() +
        "-" +
        String(selectedDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(selectedDate.getDate()).padStart(2, "0");

      const bookingData = {
        serviceId: id,
        date: localDate,
        time: selectedTime,
      };

      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsBookingOpen(false);
        showMessage("Booking confirmed successfully!", "success");

        const notification = {
          userId,
          message: ` Your booking for ${service.title} is scheduled on **${bookingData.date}** at **${bookingData.time}**.`,
          type: "success",
        };

        await fetch("http://localhost:3000/api/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notification),
        });

        const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
        storedNotifications.push({
          ...notification,
          _id: new Date().getTime().toString(),
          isRead: false,
          createdAt: new Date().toISOString(),
        });

        localStorage.setItem("notifications", JSON.stringify(storedNotifications));

        setTimeout(() => {
          navigate("/booking-details");
        }, 3000);
      } else {
        showMessage(responseData.message || "Failed to book the service. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      showMessage("An unexpected error occurred. Please try again.", "error");
    }
  };

  const showMessage = (message, type) => {
    setBookingMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setBookingMessage(null);
      setMessageType("");
    }, 5000);
  };

  if (loading) return <p className="text-center text-xl py-10">Loading service details...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <>
      <Navbar /> {/* ✅ Navbar added at the top */}

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            {service?.title || "Service Details"}
          </h2>

          {bookingMessage && (
            <div
              className={`fixed top-4 right-4 p-4 rounded-md shadow-lg max-w-sm flex items-start ${
                messageType === "success"
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              <div className="flex-1">
                <strong className="font-bold block mb-1">{messageType === "success" ? "Success!" : "Error!"}</strong>
                <span>{bookingMessage}</span>
              </div>
              <button onClick={() => setBookingMessage(null)} className="ml-4">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <img
              src={service?.image ? `http://localhost:3000${service.image}` : "https://via.placeholder.com/800"}
              alt={service?.title || "Service"}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <p className="text-gray-700 text-lg mb-4">{service?.description || "No description available."}</p>
            <p className="text-teal-600 font-bold text-2xl mb-2">Price: ${service?.price}</p>
            <button
              className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isBookingOpen} onClose={() => setIsBookingOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-2xl font-bold mb-4">Select Date and Time</Dialog.Title>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholderText="Select a date"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select a time</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
                Confirm Booking
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ServiceDetailsPage;
