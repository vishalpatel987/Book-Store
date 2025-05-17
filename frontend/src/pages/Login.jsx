import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../store/auth';
import { useDispatch } from 'react-redux';

function Login() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // ✅ Corrected useNavigate usage
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/log-in', userData);
      console.log('Log-in successful:', response.data);
      alert('Log-in successful!');
      
      // Dispatch authentication actions
      dispatch(authAction.login());
      dispatch(authAction.changeRole(response.data.role));

      // Store authentication data in local storage
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      // Redirect to profile
      navigate('/profile');
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 flex items-center justify-center min-h-screen">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold text-start items-start">Log In</p>

        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
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

          {/* Login Button */}
          <div className="mb-4">
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300">
              Log In
            </button>
          </div>
        </form>

        {/* Separator */}
        <p className="flex items-center justify-center text-zinc-200 font-semibold my-4">or</p>

        {/* Login Redirect */}
        <p className="text-center text-zinc-200 font-semibold">
          New user? <Link to="/sign-up" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
