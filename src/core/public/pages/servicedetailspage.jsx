import { Dialog } from "@headlessui/react"; // For modal
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Date picker
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles
import { useParams } from "react-router-dom";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingMessage, setBookingMessage] = useState(null);

  // Fetch service details
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

  // Handle Booking Submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: id,
          date: selectedDate.toISOString(),
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book the service. Please try again.");
      }

      const data = await response.json();
      setBookingMessage("Booking confirmed successfully!");
      setIsBookingOpen(false);
      console.log("Booking confirmed:", data);
    } catch (error) {
      console.error("Error booking service:", error);
      alert(error.message);
    }
  };

  if (loading) return <p className="text-center text-xl py-10">Loading service details...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          {service?.title || "Service Details"}
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <img
            src={service?.image ? `http://localhost:3000${service.image}` : "https://via.placeholder.com/800"}
            alt={service?.title || "Service"}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-700 text-lg mb-4">{service?.description || "No description available."}</p>
          <p className="text-teal-600 font-bold text-2xl mb-2">Price: ${service?.price}</p>
          {service?.location && <p className="text-gray-600 text-lg mb-2">Location: {service.location}</p>}
          {service?.duration && <p className="text-gray-600 text-lg mb-6">Duration: {service.duration}</p>}
          <button
            className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
            onClick={() => setIsBookingOpen(true)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Confirmation Message */}
      {bookingMessage && (
        <div className="mt-6 text-center text-green-600 font-semibold">
          {bookingMessage}
        </div>
      )}

      {/* Booking Modal */}
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
                  minDate={new Date()} // Prevent selecting past dates
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
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
              >
                Confirm Booking
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ServiceDetailsPage;