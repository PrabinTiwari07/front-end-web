import { Calendar, Clock, DollarSign, FileText, Meh } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/navbar.jsx";

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await fetch("http://localhost:3000/api/books/my-books", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch bookings.");

        const data = await response.json();

        const sortedBookings = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setBookings(sortedBookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <>
      <Navbar /> 

      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12 flex justify-center items-center">
            <Calendar className="mr-2 text-blue-500" /> My Bookings
          </h2>

          {loading ? (
            <p className="text-center text-xl py-10 animate-pulse">Loading bookings...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <Meh className="text-gray-400 w-16 h-16 mb-4" />
              <p className="text-center text-gray-600 text-lg">No bookings found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {bookings.map((booking) => {
                const imageUrl =
                  booking.serviceId?.image && booking.serviceId.image.trim() !== ""
                    ? `http://localhost:3000${booking.serviceId.image.startsWith("/") ? "" : "/"}${booking.serviceId.image}`
                    : "https://via.placeholder.com/400";

                return (
                  <div key={booking._id} className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-105 hover:shadow-xl duration-300">
                    
                    <div className="w-full h-56 bg-gray-100 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={booking.serviceId?.title || "Service Image"}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900">{booking.serviceId?.title || "Unknown Service"}</h3>
                      <p className="text-gray-600">{booking.serviceId?.description || "No description available."}</p>
                      
                      <p className="text-indigo-600 font-semibold text-lg flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-indigo-500" />
                        <span className="text-xl font-bold">{booking.serviceId?.price || "N/A"}</span>
                      </p>

                      <div className="flex justify-between items-center text-sm sm:text-base text-gray-700">
                        <p className="font-semibold flex items-center gap-1">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p className="font-semibold flex items-center gap-1">
                          <Clock className="w-5 h-5 text-green-500" />
                          {booking.time}
                        </p>
                      </div>

                      <div
                        className={`mt-4 w-full text-center px-4 py-2 text-lg font-bold rounded-full text-white ${
                          booking.status === "pending"
                            ? "bg-yellow-500"
                            : booking.status === "confirmed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>

                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <FileText className="w-4 h-4 text-gray-400" />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
