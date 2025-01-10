const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <button
                        className={`btn ${isLogin ? 'btn-info' : 'btn-outline'} mr-2`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`btn ${!isLogin ? 'btn-info' : 'btn-outline'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>
                {isLogin ? <LoginPage /> : <SignupPage />}
            </div>
        </div>
    );
};

export default Authentication;
