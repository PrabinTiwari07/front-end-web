// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const BookingDetailsPage = () => {
//   const { id } = useParams();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/books/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch booking details");

//         const data = await response.json();
//         setBooking(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [id]);

//   if (loading) return <p className="text-center">Loading booking details...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto py-12">
//       <h2 className="text-3xl font-bold mb-6">Booking Details</h2>
//       <p><strong>Service:</strong> {booking.serviceId}</p>
//       <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
//       <p><strong>Time:</strong> {booking.time}</p>
//       <p><strong>Status:</strong> {booking.status}</p>
//     </div>
//   );
// };

// export default BookingDetailsPage;

import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingDetailsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin"); // Redirect to signin if not logged in
          return;
        }

        const response = await fetch("http://localhost:3000/api/books/my-books", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <p className="text-center text-xl py-10">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12 flex justify-center items-center">
          <Calendar className="mr-2" /> My Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800">
                  {booking.serviceId?.title || "Unknown Service"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {booking.serviceId?.description || "No description available."}
                </p>
                <p className="text-teal-600 font-bold mt-2">
                  Price: ${booking.serviceId?.price || "N/A"}
                </p>
                <p className="text-gray-800 mt-2">
                  <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-800">
                  <strong>Time:</strong> {booking.time}
                </p>
                <p
                  className={`mt-3 font-bold ${
                    booking.status === "pending"
                      ? "text-yellow-600"
                      : booking.status === "confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
