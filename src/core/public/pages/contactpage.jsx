import React from 'react';

const ContactPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-blue-700">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Contact Us</h1>
                <form className="space-y-6">
                    {/* Full Name and Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Number and Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                placeholder="Location"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Expertise Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Interested In
                        </label>
                        <select className="select select-bordered w-full" required>
                            <option disabled selected>
                                Select
                            </option>
                            <option>Laundry</option>
                            <option>Iron</option>
                            <option>Shoe Cleaning</option>
                        </select>
                    </div>

                    {/* Project Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tell Us About Your View</label>
                        <textarea
                            placeholder="Leave your message here"
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit" className="btn btn-primary w-full hover:scale-105 transition-transform">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
