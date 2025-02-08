import { Edit, Plus, Trash2, Users } from "lucide-react";
import React, { useState } from "react";

const Customers = () => {
    const [customers, setCustomers] = useState([
        { id: "CUST001", name: "John Doe", location: "New York", phone: "123-456-7890", email: "johndoe@gmail.com" },
        { id: "CUST002", name: "Jane Smith", location: "Los Angeles", phone: "987-654-3210", email: "janesmith@gmail.com" },
    ]);
    
    const [deleteCustomerId, setDeleteCustomerId] = useState(null);
    const [newCustomer, setNewCustomer] = useState(false);
    const [newData, setNewData] = useState({ id: "", name: "", location: "", phone: "", email: "" });

    const handleAddNew = () => {
        setNewCustomer(true);
        setNewData({ id: `CUST${String(customers.length + 1).padStart(3, "0")}`, name: "", location: "", phone: "", email: "" });
    };

    const handleSaveNew = () => {
        setCustomers([...customers, newData]);
        setNewCustomer(false);
    };

    const confirmDelete = (customerId) => {
        setDeleteCustomerId(customerId);
    };

    const handleDelete = () => {
        setCustomers(customers.filter(customer => customer.id !== deleteCustomerId));
        setDeleteCustomerId(null);
    };

    return (
        <div className="p-5 flex flex-col items-center">
            <div className="card w-full max-w-6xl bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title">
                            <Users className="inline-block mr-2" /> Customer List
                        </h2>
                        <button className="btn btn-success btn-sm" onClick={handleAddNew}>
                            <Plus className="inline-block mr-1" /> Add New Customer
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Customer Name</th>
                                    <th>Location</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.location}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.email}</td>
                                        <td className="flex space-x-2">
                                            <button className="btn btn-primary btn-sm">
                                                <Edit className="inline-block" />
                                            </button>
                                            <button 
                                                className="btn btn-error btn-sm"
                                                onClick={() => confirmDelete(customer.id)}
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
            
            {/* Add New Customer Modal */}
            {newCustomer && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-bold">Add New Customer</h3>
                        <div className="mt-4">
                            <label className="block">Customer Name</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.name}
                                onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Location</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.location}
                                onChange={(e) => setNewData({ ...newData, location: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Phone Number</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.phone}
                                onChange={(e) => setNewData({ ...newData, phone: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Email</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.email}
                                onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button className="btn btn-gray" onClick={() => setNewCustomer(false)}>Cancel</button>
                            <button className="btn btn-green" onClick={handleSaveNew}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {deleteCustomerId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-bold">Are you sure you want to delete this customer?</h3>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button className="btn btn-gray" onClick={() => setDeleteCustomerId(null)}>No</button>
                            <button className="btn btn-red" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
