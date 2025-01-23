import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Hook for programmatic navigation

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div
            className="hero min-h-screen flex justify-center items-center"
            style={{ backgroundColor: "rgb(209, 213, 219)" }}
        >
            <div className="bg-white p-8 w-full max-w-md rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-teal-700 mb-4">Welcome Back!</h1>
                <p className="text-center text-gray-800 mb-6">
                    Please sign in to your account to continue.
                </p>

                <form>
                    {/* Email Input */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-gray-800">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-gray-800">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500 w-full pr-10"
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-gray-800"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.225.737-.65 1.916-1.458 3-1.874 2.503-5.013 4-8.084 4s-6.21-1.497-8.084-4c-.808-1.084-1.233-2.263-1.458-3z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8.168-2.686-9.542-6.825a.833.833 0 010-.35C3.732 7.943 7.523 5 12 5c1.042 0 2.05.155 3.025.438m3.905 2.382C20.466 9.445 21.302 10.643 21.542 12a.833.833 0 010 .35c-.334 1.102-1.017 2.503-2.037 3.675m-2.688-2.096a3 3 0 11-4.242-4.243"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3l18 18"
                                        />
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-gray-800">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-teal mr-2"
                            />
                            Remember me
                        </label>
                        <a
                            href="#"
                            className="text-teal-500 font-semibold hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <div className="form-control">
                        <button className="btn bg-teal-500 hover:bg-teal-600 text-white border-0 w-full">
                            Login
                        </button>
                    </div>
                </form>

                {/* Redirect to Signup */}
                <div className="mt-6 text-center">
                    <p className="text-gray-800">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-teal-500 font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
