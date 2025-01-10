const LoginPage = () => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Back to your digital life</h2>
            <form className="w-full max-w-sm">
                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 font-medium mb-1 w-full">
                        Phone Number
                    </label>
                    <div className="w-16 mr-2">
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value="+977"
                            readOnly
                        />
                    </div>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="divider">OR</div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-info w-full">Log in</button>
                <p className="text-sm text-center mt-4">
                    Do not have an account? <span className="text-red-500 cursor-pointer">Sign up</span>
                </p>
            </form>
        </div>
    );
};