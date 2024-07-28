import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";


const ResetPassword = () => {

    const navigate = useNavigate();
    const [OTP, setOTP] = useState('');
    const location = useLocation();
    const email = location.state?.email || '';

    return (
        <div className="font-outfit flex min-h-screen">
          <div className="flex flex-col justify-center items-center w-full bg-white p-8">
            <div className="w-full max-w-md">
              <h1 className="text-3xl font-bold text-primary mb-4">Reset Password</h1>
              <p className="text-gray-500 mb-8">We have just sent otp to your email <span>{email}</span></p>
              <form action="" className="flex flex-col gap-6 ">
                
                <input type="text" placeholder="Enter OTP " value={OTP} onChange={(e) => setOTP(e.target.value)} className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700  focus:outline-none focus:ring-2 focus:ring-pink-500"/>
              </form>
    
              <div className="mt-4 flex flex-col gap-4">
                <button
                  className="bg-primary text-white font-bold px-4 py-3 rounded-lg hover:bg-pink-500"
                  onClick={() => navigate('/new-password',  {state: {email, OTP}})} style={{color: '#fff'}}
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

export default ResetPassword;