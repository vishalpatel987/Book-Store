import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import Loder from "../components/Loder/Loder";
import axios from 'axios';

function Profile() {
  const [UserData, setUserData] = useState()
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
        setUserData(response.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      {!UserData &&
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loder />
        </div>}
      {UserData && (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar data = {UserData}/>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
