import React from "react";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
    const navigate = useNavigate();
    return (
        <div className="font-outfit flex flex-col gap-4 justify-center items-center p-4 min-h-screen">
            <div className="w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-primary mb-2">Create Your Account</h1>
                <p className="text-gray-300 mb-4">Sign up to start learning today</p>
                <form action="" className="flex flex-col gap-4">
                    <input type="email" placeholder="Enter Your Name" className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="password" placeholder="Enter Your Email" className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="email" placeholder="Enter Password" className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="password" placeholder="Confirm Password" className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </form>
                
                
                <div className="mt-8 flex flex-col gap-4">
                    <a href="" className="bg-primary text-white font-bold flex justify-center px-4 py-3 rounded-lg hover:bg-blue-600">Sign Up</a>
                    <a href="" onClick={() => navigate('/login')}  className="bg-primary bg-opacity-20 text-primary flex justify-center font-bold px-4 py-3 rounded-lg hover:bg-gray-600">Log In</a>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;