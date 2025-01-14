// import React from "react";

// const Login = () => {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-300">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">CleanEase</h1>
//                 <h2 className="text-center text-lg font-semibold text-gray-600 mb-4">
//                     Back to your digital life
//                 </h2>
//                 <form>
//                     {/* Phone Number Field */}
//                     <div className="flex items-center border border-gray-300 rounded-md mb-4">
//                         <span className="px-4 py-2 text-gray-500 border-r border-gray-300">+977</span>
//                         <input
//                             type="text"
//                             placeholder="Phone No."
//                             className="flex-grow px-4 py-2 outline-none text-gray-700"
//                         />
//                     </div>

//                     {/* Divider */}
//                     <div className="text-center text-gray-500 text-sm my-2">OR</div>

//                     {/* Email Field */}
//                     <input
//                         type="email"
//                         placeholder="email"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
//                     />

//                     {/* Password Field */}
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
//                     />

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full py-2 bg-teal-400 text-white font-semibold rounded-md hover:bg-teal-500"
//                     >
//                         Log in
//                     </button>
//                 </form>

//                 {/* Sign-up Link */}
//                 <p className="text-center text-sm text-gray-600 mt-4">
//                     Already have an account?{" "}
//                     <a href="#" className="text-red-500 font-semibold hover:underline">
//                         Sign up
//                     </a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">CleanEase</h1>
                <h2 className="text-center text-lg font-semibold text-gray-600 mb-4">
                    Back to your digital life
                </h2>
                <form>

                    {/* Email Field */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                    />

                    {/* Password Field */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 text-gray-700 outline-none focus:ring-2 focus:ring-teal-400"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-teal-400 text-white font-semibold rounded-md hover:bg-teal-500"
                    >
                        Log in
                    </button>
                </form>

                {/* Sign-up Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-teal-500 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

