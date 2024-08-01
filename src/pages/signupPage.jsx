import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../config";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/register/`, {
        email,
        password,
        full_name: fullName,
      });

      toast.success("Login successful!", { autoClose: 3000 });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setError("An account with this email already exists.");
        toast.error("An account with this email already exists.");
      } else {
        setError("Signup failed. Please try again.");
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="font-outfit flex flex-col gap-4 justify-center items-center p-4 min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-300 mb-4">Sign up to start learning today</p>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-4 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-primary text-white font-bold flex justify-center px-4 py-3 rounded-lg hover:bg-pink-500"
          >
            Sign Up
          </button>
        </form>

        {error && <div className="error text-red-500 mt-2">{error}</div>}

        <div className="mt-8 flex flex-col gap-4">
          <a
            onClick={() => navigate("/login")}
            className="bg-primary bg-opacity-20 text-primary flex justify-center font-bold px-4 py-3 rounded-lg hover:bg-pink-200 cursor-pointer"
          >
            Log In
          </a>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SignupPage;
