import React, {useState} from "react";
import axios from "axios";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const res = await axios.post(`${BASE_URL}/api/auth/reset/`, {email});

            if (res.status === 200) {
                navigate('/reset-password', { state: { email }});
            } else {
                setError('Failed to send password reset email. Please try again.');
            }

        }catch(err){
            if (err.response && err.response.status === 404){
                setError('User with that email does not exist. Please check the email and try again.');
            } else {
                setError('Failed to send password reset email. Please try again.');
            }
            
            console.error(err);
        } finally{
            setLoading(false);
        }
        
        
        
    }

    return (
        <div className="font-outfit flex min-h-screen">
          <div className="flex flex-col justify-center items-center w-full bg-white p-8">
            <div className="w-full max-w-md">
              <h1 className="text-3xl font-bold text-primary mb-4">Forgot Password</h1>
              <p className="text-gray-500 mb-8">Enter your email address to reset your password</p>
              <form action="" className="flex flex-col gap-6 ">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700  focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </form>
    
              {error && <div className="error">{error}</div>}
    
              <div className="mt-4 flex flex-col gap-4">
                <button
                  className="bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-pink-500"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  Continue
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-pink-100 text-primary font-bold px-4 py-3 rounded-lg hover:bg-pink-200"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ForgotPassword;