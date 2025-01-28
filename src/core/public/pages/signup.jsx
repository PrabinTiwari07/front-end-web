import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        // confirm_password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle Register
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError(""); 
        setSuccess(false); 

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: formData.fullname,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    confirm_password:formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailVerificationSent(true); // Show email verification UI
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        }
    };

    // Handle Email Verification
    const handleVerifyEmail = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    code: verificationCode,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailVerified(true);
                setSuccess(true); // Show success message
                setTimeout(() => navigate("/signin"), 2000); // Redirect after success
            } else {
                setError(data.message || "Verification failed.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div
            className="hero min-h-screen flex justify-center items-center"
            style={{ backgroundColor: "rgb(209, 213, 219)" }}
        >
            <div className="bg-white p-8 w-full max-w-md rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-teal-700 mb-4">Join Us!</h1>
                <p className="text-center text-gray-800 mb-6">
                    Please create your account to continue.
                </p>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Success Message */}
                {success && (
                    <p className="text-green-500 text-center mb-4">
                        Verification successful! Redirecting to login...
                    </p>
                )}

                {!emailVerificationSent ? (
                    <form onSubmit={handleSubmit}>
                        {/* Full Name Input */}
                        <div className="form-control mb-2">
                            <label className="label">
                                <span className="label-text text-gray-800">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Enter your full name"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        {/* Address Input */}
                        <div className="form-control mb-2">
                            <label className="label">
                                <span className="label-text text-gray-800">Address</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleChange}
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div className="form-control mb-2">
                            <label className="label">
                                <span className="label-text text-gray-800">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="form-control mb-2">
                            <label className="label">
                                <span className="label-text text-gray-800">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-control mb-2">
                            <label className="label">
                                <span className="label-text text-gray-800">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500 w-full pr-10"
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-gray-800"
                                    onClick={togglePasswordVisibility}
                                >
                                    {/* Eye Icon */}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text text-gray-800">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirm_password"
                                    placeholder="Confirm your password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500 w-full pr-10"
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-gray-800"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {/* Eye Icon */}
                                </span>
                            </div>
                        </div>

                        {/* Signup Button */}
                        <div className="form-control">
                            <button
                                type="submit"
                                className="btn bg-teal-500 hover:bg-teal-600 text-white border-0 w-full"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-800">Verification Code</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the verification code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            onClick={handleVerifyEmail}
                            className="btn bg-teal-500 hover:bg-teal-600 text-white border-0 mt-3"
                        >
                            Verify Email
                        </button>
                    </div>
                )}

                {/* Redirect to Login */}
                <div className="mt-4 text-center">
                    <p className="text-gray-800">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-teal-500 font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
