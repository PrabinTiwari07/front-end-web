import React, { useState } from "react";

const VerifyEmail = ({ email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        onVerificationSuccess(); 
      } else {
        setError(data.error || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setError(data.error || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold text-center mb-4">Verify Your Email</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Enter OTP</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP sent to your email"
        />
      </div>

      <div className="flex space-x-2">
        <button onClick={handleVerifyOTP} className="btn bg-teal-500 text-white flex-1">
          Verify OTP
        </button>
        <button onClick={handleResendOTP} className="btn bg-gray-500 text-white flex-1">
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
