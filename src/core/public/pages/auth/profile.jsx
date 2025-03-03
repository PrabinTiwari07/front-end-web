import { motion } from "framer-motion";
import { ArrowLeft, Camera, MapPin, Phone, Save, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phone: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:3000/api/users/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const userData = await response.json();
        setUser(userData);
        
        setFormData({
          fullname: userData.fullname || "",
          address: userData.address || "",
          phone: userData.phone || "",
          image: null,
        });

        setImagePreview(userData.image ? `http://localhost:3000${userData.image}` : "");
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Could not load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname || user.fullname); 
      formDataToSend.append("address", formData.address || user.address);
      formDataToSend.append("phone", formData.phone || user.phone);
      
      if (formData.image) {
        formDataToSend.append("file", formData.image);
      }

      const response = await fetch(`http://localhost:3000/api/profile/${user._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to update profile");
      
      const updatedData = await response.json();
      
      localStorage.setItem('profileUpdated', 'true');
      
      if (updatedData.user && updatedData.user.image) {
        const imageUrl = updatedData.user.image.startsWith('http') 
          ? updatedData.user.image 
          : `http://localhost:3000${updatedData.user.image}`;
          
        localStorage.setItem('userProfileImage', imageUrl);
      }
      
      toast.success("Profile updated successfully!");
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 border-opacity-50"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate("/")} 
              className="flex items-center text-white hover:text-teal-200 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-1" /> Back
            </button>
            <h2 className="text-xl font-bold">Profile</h2>
            <div className="w-5"></div> 
          </div>
          
          <div className="flex flex-col items-center pb-4">
            <label htmlFor="imageUpload" className="relative cursor-pointer group">
              <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-md transition transform group-hover:scale-105">
                <img
                  src={imagePreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </label>
            <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="flex items-center border-b-2 border-gray-200 focus-within:border-teal-500 transition-colors py-2">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullname"
                placeholder={user?.fullname || "Full Name"}
                value={formData.fullname}
                onChange={handleChange}
                className="ml-3 w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <div className="flex items-center border-b-2 border-gray-200 focus-within:border-teal-500 transition-colors py-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="address"
                placeholder={user?.address || "Address"}
                value={formData.address}
                onChange={handleChange}
                className="ml-3 w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex items-center border-b-2 border-gray-200 focus-within:border-teal-500 transition-colors py-2">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="phone"
                placeholder={user?.phone || "Phone Number"}
                value={formData.phone}
                onChange={handleChange}
                className="ml-3 w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <motion.button
              type="submit"
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
              whileTap={{ scale: 0.97 }}
              disabled={saving}
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </div>
              )}
            </motion.button>
            
            <motion.button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition"
              whileTap={{ scale: 0.97 }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;