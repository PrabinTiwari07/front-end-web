import { Briefcase, Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

const Services = () => {
    const [services, setServices] = useState([
        { id: "SERV001", name: "Dry Cleaning", price: "$10" },
        { id: "SERV002", name: "Ironing", price: "$5" },
        { id: "SERV003", name: "Wash & Fold", price: "$8" },
    ]);
    const [deleteServiceId, setDeleteServiceId] = useState(null);
    const [editService, setEditService] = useState(null);
    const [editData, setEditData] = useState({ id: "", name: "", price: "" });
    const [newService, setNewService] = useState(null);
    const [newData, setNewData] = useState({ id: "", name: "", price: "" });

    const getNextServiceId = () => {
        const lastService = services[services.length - 1];
        const lastIdNumber = lastService ? parseInt(lastService.id.replace("SERV", "")) : 0;
        return `SERV${String(lastIdNumber + 1).padStart(3, "0")}`;
    };

    const confirmDelete = (serviceId) => {
        setDeleteServiceId(serviceId);
    };

    const handleDelete = () => {
        setServices(services.filter(service => service.id !== deleteServiceId));
        setDeleteServiceId(null);
    };

    const handleEdit = (service) => {
        setEditService(service.id);
        setEditData({ id: service.id, name: service.name, price: service.price });
    };

    const handleSaveEdit = () => {
        setServices(services.map(service => service.id === editData.id ? editData : service));
        setEditService(null);
    };

    const handleAddNew = () => {
        setNewService(true);
        setNewData({ id: getNextServiceId(), name: "", price: "" });
    };

    const handleSaveNew = () => {
        setServices([...services, newData]);
        setNewService(null);
    };

    return (
        <div className="p-5 flex flex-col items-center">
            <div className="card w-full max-w-6xl bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-center">
                        <h2 className="card-title">
                            <Briefcase className="inline-block mr-2" /> Available Services
                        </h2>
                        <button className="btn btn-success btn-sm" onClick={handleAddNew}>
                            <Plus className="inline-block mr-1" /> Add New Service
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Service ID</th>
                                    <th>Service Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => (
                                    <tr key={service.id}>
                                        <td>{service.id}</td>
                                        <td>{service.name}</td>
                                        <td>{service.price}</td>
                                        <td className="flex space-x-2">
                                            <button 
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleEdit(service)}
                                            >
                                                <Edit className="inline-block" />
                                            </button>
                                            <button 
                                                className="btn btn-error btn-sm"
                                                onClick={() => confirmDelete(service.id)}
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
            
            {/* Delete Confirmation Modal */}
            {deleteServiceId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-bold">Are you sure you want to delete this service?</h3>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button className="btn btn-gray" onClick={() => setDeleteServiceId(null)}>No</button>
                            <button className="btn btn-red" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Add New Service Modal */}
            {newService && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h3 className="text-lg font-bold">Add New Service</h3>
                        <div className="mt-4">
                            <label className="block">Service Name</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.name}
                                onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block">Price</label>
                            <input 
                                className="input input-bordered w-full"
                                value={newData.price}
                                onChange={(e) => setNewData({ ...newData, price: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                            <button className="btn btn-gray" onClick={() => setNewService(null)}>Cancel</button>
                            <button className="btn btn-green" onClick={handleSaveNew}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;
