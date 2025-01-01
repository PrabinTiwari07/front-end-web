import React from 'react';

const SingnUp = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="confirm password"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="confirm password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:outline-none"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SingnUp;
