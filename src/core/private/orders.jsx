import { Edit, Plus, ShoppingCart, Trash2 } from "lucide-react";
import React, { useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([
        { id: "ORD001", customer: "John Doe", service: "Dry Cleaning", status: "Completed" },
        { id: "ORD002", customer: "Jane Smith", service: "Ironing", status: "Pending" },
    ]);
    
    const [deleteOrderId, setDeleteOrderId] = useState(null);
    const [editOrder, setEditOrder] = useState(null);
    const [editData, setEditData] = useState({ id: "", customer: "", service: "", status: "" });
    const [newOrder, setNewOrder] = useState(false);
    const [newData, setNewData] = useState({ id: "", customer: "", service: "", status: "" });

    const handleAddNew = () => {
        setNewOrder(true);
        setNewData({ id: `ORD${String(orders.length + 1).padStart(3, "0")}`, customer: "", service: "", status: "" });
    };

    const handleEdit = (order) => {
        setEditOrder(order.id);
        setEditData({ id: order.id, customer: order.customer, service: order.service, status: order.status });
    };

    const handleSaveEdit = () => {
        setOrders(orders.map(order => order.id === editData.id ? editData : order));
        setEditOrder(null);
    };

    const handleDelete = () => {
        setOrders(orders.filter(order => order.id !== deleteOrderId));
        setDeleteOrderId(null);
    };

    return (
        <div className="p-5 flex flex-col items-center">
            <div className="card w-full max-w-6xl bg-green-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title">
                            <ShoppingCart className="inline-block mr-2" /> Orders Management
                        </h2>
                        <button className="btn btn-success btn-sm" onClick={handleAddNew}>
                            <Plus className="inline-block mr-1" /> Add New Order
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.service}</td>
                                        <td className={order.status === "Completed" ? "text-green-500" : "text-yellow-500"}>{order.status}</td>
                                        <td className="flex space-x-2">
                                            <button 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleEdit(order)}
                                            >
                                                <Edit className="inline-block" />
                                            </button>
                                            <button 
                                                className="btn btn-error btn-sm"
                                                onClick={() => setDeleteOrderId(order.id)}
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
            
            {/* Add New Order Modal */}
            {newOrder && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-bold">Add New Order</h3>
                        <div className="mt-4">
                            <label className="block">Customer</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.customer}
                                onChange={(e) => setNewData({ ...newData, customer: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Service</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.service}
                                onChange={(e) => setNewData({ ...newData, service: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Status</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.status}
                                onChange={(e) => setNewData({ ...newData, status: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button className="btn btn-gray" onClick={() => setNewOrder(false)}>Cancel</button>
                            <button className="btn btn-green" onClick={() => setNewOrder(false)}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteOrderId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-bold">Are you sure you want to delete this order?</h3>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button className="btn btn-gray" onClick={() => setDeleteOrderId(null)}>No</button>
                            <button className="btn btn-red" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
