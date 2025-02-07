import React from "react";

const Orders = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                        <th className="border border-gray-300 px-4 py-2">Customer</th>
                        <th className="border border-gray-300 px-4 py-2">Service</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">#101</td>
                        <td className="border border-gray-300 px-4 py-2">John Doe</td>
                        <td className="border border-gray-300 px-4 py-2">Dry Cleaning</td>
                        <td className="border border-gray-300 px-4 py-2 text-green-600">Completed</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
