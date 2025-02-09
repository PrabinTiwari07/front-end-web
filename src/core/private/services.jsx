import { Briefcase, Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState(false);
  const [newData, setNewData] = useState({ title: "", description: "", category: "", price: "", image: null });
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch services from the backend
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole !== "admin") {
      navigate("/");
    } else {
      fetchServices();
    }
  }, [navigate]);

  const handleAddNew = () => {
    setNewService(true);
    setNewData({ title: "", description: "", category: "", price: "", image: null });
    setEditData(null);
  };

  const handleSaveNew = async () => {
    console.log("handleSaveNew called");
  
    // Validate input
    if (!newData.title || !newData.price) {
      setMessage("Title and Price are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", newData.title);
    formData.append("description", newData.description);
    formData.append("category", newData.category);
    formData.append("price", newData.price);
    formData.append("image", newData.image);
  
    try {
      const response = await fetch("http://localhost:3000/api/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        },
        body: formData
      });
  
      const data = await response.json();
      console.log("Response:", response.status, data);
  
      if (response.ok) {
        setMessage("Service added successfully!");
        setNewService(false);
        fetchServices();
      } else {
        setMessage(data.message || "Failed to add service.");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  

  const handleEdit = (service) => {
    setEditData(service);
    setNewService(true);
    setNewData({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price,
      image: null,
    });
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Service deleted successfully!");
        fetchServices();
      } else {
        setMessage(data.message || "Failed to delete service.");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      setMessage("An error occurred. Please try again.");
    }
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td>{service.category}</td>
                    <td>${service.price}</td>
                    <td className="flex space-x-2">
                      <button className="btn btn-primary btn-sm" onClick={() => handleEdit(service)}>
                        <Edit className="inline-block" />
                      </button>
                      <button className="btn btn-error btn-sm" onClick={() => handleDelete(service._id)}>
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

      {/* Modal for Add/Edit Service */}
      {newService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-lg font-bold">{editData ? "Edit Service" : "Add New Service"}</h3>
            <div className="mt-4">
              <label className="block">Title</label>
              <input
                className="input input-bordered w-full"
                value={newData.title}
                onChange={(e) => setNewData({ ...newData, title: e.target.value })}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Description</label>
              <input
                className="input input-bordered w-full"
                value={newData.description}
                onChange={(e) => setNewData({ ...newData, description: e.target.value })}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Category</label>
              <input
                className="input input-bordered w-full"
                value={newData.category}
                onChange={(e) => setNewData({ ...newData, category: e.target.value })}
              />
            </div>
            <div className="mt-4">
              <label className="block">Price</label>
              <input
                className="input input-bordered w-full"
                type="number"
                value={newData.price}
                onChange={(e) => setNewData({ ...newData, price: e.target.value })}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Image</label>
              <input className="input w-full" type="file" onChange={(e) => setNewData({ ...newData, image: e.target.files[0] })} />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="btn btn-gray" onClick={() => setNewService(false)}>
                Cancel
              </button>
              <button className="btn btn-green" onClick={handleSaveNew}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
