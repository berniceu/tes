import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SignupPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async(e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setError('Passwords do not match.');
            toast.error('Passwords do not match');
            return;
        }
        try{
            const res = await axios.post(`${BASE_URL}/auth/signup`, {
                email, password, full_name: fullName
            });
            toast.success('Signup successful');
            navigate('/login');

        } catch(error){
            console.error(error);
            setError('Signup failed. Please try again.');
            toast.error('Signup failed. Please try again.');
        }
    }
    return (
        <div className="font-outfit flex flex-col gap-4 justify-center items-center p-4 min-h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-primary mb-2">Create Your Account</h1>
                <p className="text-gray-300 mb-4">Sign up to start learning today</p>
                <form action="" className="flex flex-col gap-4">
                    <input type="text" placeholder="Enter Your Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700  focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="password" placeholder="Confirm Password" className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </form>

                {error && <div className="error">{error}</div>}
                
                
                <div className="mt-8 flex flex-col gap-4">
                    <a href="" className="bg-primary text-white font-bold flex justify-center px-4 py-3 rounded-lg hover:bg-blue-600" onClick={handleSignup}>Sign Up</a>
                    <a href="" onClick={() => navigate('/login')}  className="bg-primary bg-opacity-20 text-primary flex justify-center font-bold px-4 py-3 rounded-lg hover:bg-gray-600">Log In</a>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;