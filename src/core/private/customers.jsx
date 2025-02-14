import axios from "axios";
import { Plus, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [newUser, setNewUser] = useState(false);
    const [newData, setNewData] = useState({
        fullname: "",
        address: "",
        phone: "",
        email: "",
        role: "user"
    });

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                console.error('No admin token found in localStorage');
                return;
            }
            const response = await axios.get('http://localhost:3000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setUsers(response.data); // Set the fetched users in state
        } catch (error) {
            console.error('Error fetching users:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts
    }, []);

    const handleAddNew = () => {
        setNewUser(true);
        setNewData({ fullname: "", address: "", phone: "", email: "", role: "user" });
    };

    const handleSaveNew = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.post('http://localhost:3000/api/users', newData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers([...users, response.data]); // Add the new user to the state
            setNewUser(false);
        } catch (error) {
            console.error("Error saving new user:", error);
        }
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
    
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (response.status === 200) {
                setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from state
                alert("User deleted successfully.");
            }
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
            alert("Failed to delete the user. Please try again.");
        }
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
                            <Plus className="inline-block mr-1" /> Add New User
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Role</th>
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
                                            <td>{user.role}</td>
                                            <td>
                                                <button className="btn btn-warning btn-sm mr-2" onClick={() => console.log('Edit user', user)}>Edit</button>
                                                <button className="btn btn-error btn-sm" onClick={() => handleDelete(user._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
