import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post('http://localhost:5000/api/v1/sign-up', userData);
      console.log("Sign-up successful:", response.data);
      alert("Sign-up successful!");
      navigate("/login")
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 flex items-center justify-center min-h-screen">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold text-start">Sign Up</p>

        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="text-zinc-400">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="Enter your username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="xyz@example.com"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="text-zinc-400">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="address" className="text-zinc-400">Address</label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded resize-none"
              placeholder="Enter your address"
              name="address"
              id="address"
              rows="3"
              value={userData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Sign Up Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Separator */}
        <p className="flex items-center justify-center text-zinc-200 font-semibold my-4">or</p>

        {/* Login Redirect */}
        <p className="text-center text-zinc-200 font-semibold">
          Already registered? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
