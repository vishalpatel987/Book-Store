import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Setting() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            id: localStorage.getItem('id'),
          },
        };

        const response = await axios.get('http://localhost:5000/api/v1/get-user-information', headers);
        setUserData({
          username: response.data.username || '',
          email: response.data.email || '',
          password: '',
          address: response.data.address || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/v1/update-user', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-zinc-900 px-4 md:px-12'>
      <div className='bg-zinc-800 rounded-xl p-8 w-full md:w-2/6 shadow-lg border border-zinc-700'>
        <h2 className='text-zinc-200 text-2xl font-bold mb-6'>Settings</h2>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label htmlFor='username' className='text-zinc-400'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              className='w-full mt-2 bg-zinc-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor='email' className='text-zinc-400'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              className='w-full mt-2 bg-zinc-700 text-white p-3 rounded-lg outline-none cursor-not-allowed'
              value={userData.email}
              disabled
            />
          </div>

          <div>
            <label htmlFor='password' className='text-zinc-400'>New Password</label>
            <input
              type='password'
              name='password'
              id='password'
              className='w-full mt-2 bg-zinc-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'
              value={userData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor='address' className='text-zinc-400'>Address</label>
            <textarea
              className='w-full mt-2 bg-zinc-700 text-white p-3 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500'
              name='address'
              id='address'
              rows='3'
              value={userData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md'
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
