import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="font-outfit flex min-h-screen">
            <div className="flex flex-col justify-center items-center w-full bg-white p-8">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-primary mb-4">Welcome back</h1>
                    <p className="text-gray-500 mb-8">Log in to continue learning</p>
                    <form action="" className="flex flex-col gap-6 ">
                        <input type="email" placeholder="Enter Your Email" className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700  focus:outline-none focus:ring-2 focus:ring-pink-500" />
                        <input type="password" placeholder="Enter Password" className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700  focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    </form>
                    <div className="flex justify-end mb-8 mt-2">
                    <a href="" className="text-primary hover:underline ">Forgot Password?</a>
                    </div>
                    
                    <div className="mt-4 flex flex-col gap-4">
                        <button className="bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-pink-500">Log In</button>
                        <button onClick={() => navigate('/signup')} className="bg-pink-100 text-primary font-bold px-4 py-3 rounded-lg hover:bg-pink-200">Sign Up</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default LoginPage;

