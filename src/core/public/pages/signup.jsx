import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">CleanEase</h1>
                <h2 className="text-center text-lg font-semibold text-gray-600 mb-4">
                    Create your account
                </h2>
                <form>
                    {/* Full Name Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your fullname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    {/* Address Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    {/* Gender Dropdown */}
                    <div className="mb-4">
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        >
                            <option value="" disabled selected>
                                Select your gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-teal-400 text-white font-semibold rounded-md hover:bg-teal-500"
                    >
                        Sign up
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-500 font-semibold hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
