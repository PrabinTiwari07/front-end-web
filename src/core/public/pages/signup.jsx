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
        confirm_password: "",
        profilePicture: null,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({ ...prevData, profilePicture: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                body: data,
            });

            const result = await response.json();
            if (response.ok) {
                setEmailVerificationSent(true);
            } else {
                setError(result.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    const handleVerifyEmail = async () => {
        setError("");

        try {
            const response = await fetch("http://localhost:3000/api/users/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    otp: verificationCode,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setEmailVerified(true);
                setSuccess(true);
                setTimeout(() => navigate("/signin"), 2000);
            } else {
                setError(data.message || "Verification failed.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    const handleResendOTP = async () => {
        setError("");
        try {
            const response = await fetch("http://localhost:3000/api/users/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
                setError("A new OTP has been sent to your email.");
            } else {
                setError(data.message || "Unable to resend OTP. Please try again.");
            }
        } catch (err) {
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

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && (
                    <p className="text-green-500 text-center mb-4">
                        {emailVerified ? "Verification successful! Redirecting..." : "OTP sent successfully!"}
                    </p>
                )}

                {!emailVerificationSent ? (
                    <form onSubmit={handleSubmit}>
                        {/* Profile Picture Upload */}
                        <div className="flex justify-center mb-4">
                            <label htmlFor="profilePicture" className="cursor-pointer">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-teal-500">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span className="text-gray-500">Upload</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>

                        {/* Input Fields */}
                        {["fullname", "address", "phone", "email"].map((field) => (
                            <div className="form-control mb-2" key={field}>
                                <label className="label">
                                    <span className="label-text text-gray-800 capitalize">{field}</span>
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    placeholder={`Enter your ${field}`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                            </div>
                        ))}

                        {/* Password Fields */}
                        {[
                            { name: "password", show: showPassword, toggle: togglePasswordVisibility },
                            { name: "confirm_password", show: showConfirmPassword, toggle: toggleConfirmPasswordVisibility },
                        ].map(({ name, show, toggle }) => (
                            <div className="form-control mb-2" key={name}>
                                <label className="label">
                                    <span className="label-text text-gray-800 capitalize">{name.replace("_", " ")}</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={show ? "text" : "password"}
                                        name={name}
                                        placeholder={`Enter your ${name.replace("_", " ")}`}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        className="input input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500 w-full pr-10"
                                        required
                                    />
                                    <span
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-gray-800"
                                        onClick={toggle}
                                    >
                                        {show ? "🙈" : "👁️"}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <button type="submit" className="btn bg-teal-500 hover:bg-teal-600 text-white border-0 w-full">
                            Sign Up
                        </button>
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
                        <button
                            onClick={handleResendOTP}
                            className="btn bg-gray-500 hover:bg-gray-600 text-white border-0 mt-3"
                        >
                            Resend OTP
                        </button>
                    </div>
                )}

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