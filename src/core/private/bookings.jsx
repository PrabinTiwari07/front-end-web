import axios from "axios";
import { Calendar, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [editBooking, setEditBooking] = useState(null);
  const [editData, setEditData] = useState({ status: "" });

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:3000/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again.");
      toast.error("❌ Failed to fetch bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSaveEdit = async (bookingId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `http://localhost:3000/api/books/${bookingId}/status`,
        { status: editData.status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: editData.status } : booking
        )
      );
      toast.success(" Booking status updated successfully!");
      setEditBooking(null);

      const updatedBooking = bookings.find((booking) => booking._id === bookingId);
      if (updatedBooking) {
        const socket = io("http://localhost:3000");
        socket.emit("sendNotification", {
          userId: updatedBooking.userId._id,
          message: `Your status for ${updatedBooking.serviceId.title} is ${editData.status}.`,
          isRead: false,
        });
      }
    } catch (error) {
      console.error("Error updating booking status:", error.response?.data || error);
      toast.error("❌ Failed to update booking status!");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "canceled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) return <p className="text-center text-lg">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-5 flex flex-col items-center">
      <div className="card w-full max-w-6xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="card-title">
              <Calendar className="inline-block mr-2" /> Bookings Management
            </h2>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id.slice(-6)}</td>
                    <td>{booking.userId?.fullname || "N/A"}</td>
                    <td>{booking.serviceId?.title || "N/A"}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.time}</td>
                    <td className={`font-bold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </td>
                    <td className="flex space-x-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setEditBooking(booking)}
                      >
                        <Edit className="inline-block" />
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => setDeleteBookingId(booking._id)}
                      >
                        <Trash2 className="inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold">Edit Booking Status</h3>
            <select
              className="input input-bordered w-full mt-4"
              value={editData.status}
              onChange={(e) => setEditData({ status: e.target.value })}
            >
              <option value="">-- Select Status --</option> 
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="btn btn-gray" onClick={() => setEditBooking(null)}>
                Cancel
              </button>
              <button className="btn btn-green" onClick={() => handleSaveEdit(editBooking._id)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
