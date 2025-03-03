import axios from "axios";
import { Edit, Trash2, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editData, setEditData] = useState({
        fullname: "",
        address: "",
        phone: ""
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get("http://localhost:3000/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("❌ Failed to fetch users!");
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditData({
            fullname: user.fullname,
            address: user.address,
            phone: user.phone
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveEdit = async () => {
        setShowConfirmModal(false);
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.put(
                `http://localhost:3000/api/users/${editingUser._id}`,
                editData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUsers(users.map(user => (user._id === editingUser._id ? response.data : user)));
            setEditingUser(null);
            toast.success("✅ User updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error.response?.data || error.message);
            toast.error("❌ Failed to update the user.");
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    return (
        <div className="p-5 flex flex-col items-center">
            <div className="card w-full max-w-6xl bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">
                        <Users className="inline-block mr-2" /> Customer List
                    </h2>
                    <div className="overflow-x-auto mt-4">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.fullname}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td className="flex space-x-2">
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    <Edit className="inline-block" />
                                                </button>

                                                <button
                                                    className="btn btn-error btn-sm"
                                                >
                                                    <Trash2 className="inline-block" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Edit User Details
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={editData.fullname}
                                onChange={handleEditChange}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={editData.address}
                                onChange={handleEditChange}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={editData.phone}
                                onChange={handleEditChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button className="btn btn-gray" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                            <button className="btn btn-green" onClick={() => setShowConfirmModal(true)}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Do you want to update this user?
                        </h3>
                        <div className="flex justify-end space-x-4">
                            <button className="btn bg-gray-500 text-white hover:bg-gray-600" onClick={() => setShowConfirmModal(false)}>
                                Cancel
                            </button>
                            <button className="btn bg-gray-500 text-white hover:bg-gray-600" onClick={handleSaveEdit}>
                                Yes, Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
