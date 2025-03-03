

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Analytics = () => {
    const [bookingStats, setBookingStats] = useState({ completed: 0, cancelled: 0, pending: 0 });
    const [ordersData, setOrdersData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        const fetchBookingStats = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const response = await axios.get("http://localhost:3000/api/books", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const bookings = response.data;
                
                const completed = bookings.filter(b => b.status === "confirmed").length;
                const cancelled = bookings.filter(b => b.status === "canceled").length;
                const pending = bookings.filter(b => b.status === "pending").length;
                setBookingStats({ completed, cancelled, pending });

                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthlyData = months.map(month => ({
                    month,
                    bookings: 0,
                    completed: 0,
                    pending: 0,
                    cancelled: 0
                }));
                
                bookings.forEach(b => {
                    const monthIndex = new Date(b.date).getMonth();
                    if (b.status === "confirmed") monthlyData[monthIndex].completed++;
                    if (b.status === "pending") monthlyData[monthIndex].pending++;
                    if (b.status === "canceled") monthlyData[monthIndex].cancelled++;
                    monthlyData[monthIndex].bookings++;
                });
                setOrdersData(monthlyData);

                const revenueData = months.map(month => ({
                    month,
                    revenue: 0
                }));
                bookings.forEach(b => {
                    const monthIndex = new Date(b.date).getMonth();
                    revenueData[monthIndex].revenue += b.serviceId?.price || 0;
                });
                setRevenueData(revenueData);
            } catch (error) {
                console.error("Error fetching bookings data:", error);
            }
        };
        
        fetchBookingStats();
    }, []);

    return (
        <div className="p-5 rounded-lg shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4">Laundry Management Analytics</h2>
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block p-2 bg-green-500 text-white rounded-full border-2 border-black">
                            ✔
                        </div>
                        <h3 className="text-2xl font-bold">{bookingStats.completed}</h3>
                        <p>Booking Completed</p>
                    </div>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block p-2 bg-yellow-500 text-white rounded-full border-2 border-black">
                            ⏳
                        </div>
                        <h3 className="text-2xl font-bold">{bookingStats.pending}</h3>
                        <p>Booking Pending</p>
                    </div>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block p-2 bg-red-500 text-white rounded-full border-2 border-black">
                            ✖
                        </div>
                        <h3 className="text-2xl font-bold">{bookingStats.cancelled}</h3>
                        <p>Booking Cancelled</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Monthly Booking Trends</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={ordersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="bookings" stroke="#FFA500" strokeWidth={2} />
                            <Line type="monotone" dataKey="completed" stroke="#007BFF" strokeWidth={2} />
                            <Line type="monotone" dataKey="pending" stroke="#FFD700" strokeWidth={2} />
                            <Line type="monotone" dataKey="cancelled" stroke="#FF0000" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Monthly Revenue Trends</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#28a745" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
