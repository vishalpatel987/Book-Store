import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../store/auth';

function Sidebar({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authAction.logout());
    dispatch(authAction.changeRole("user"));
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-full w-full md:w-60">
      <div className="flex flex-col items-center">
        {data?.avatar && <img src={data.avatar} className="h-[10vh] w-[10vh] rounded-full" alt="avatar" />}
        <p className="mt-3 text-lg text-zinc-100 font-semibold">{data?.username || 'Guest'}</p>
        <p className="mt-1 text-sm text-zinc-400">{data?.email || 'No email available'}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-600 hidden md:block"></div>
      </div>

      {role === 'user' && (<nav className="w-full flex flex-col items-center mt-6">
        <Link to="/profile" className="text-zinc-200 font-medium w-full py-2 text-center hover:bg-zinc-700 rounded-lg transition duration-300">
          Favourites
        </Link>
        <Link to="/profile/orderHistory" className="text-zinc-200 font-medium w-full py-2 mt-2 text-center hover:bg-zinc-700 rounded-lg transition duration-300">
          Order History
        </Link>
        <Link to="/profile/settings" className="text-zinc-200 font-medium w-full py-2 mt-2 text-center hover:bg-zinc-700 rounded-lg transition duration-300">
          Settings
        </Link>
      </nav>
      )}
      {role === "admin" && (
        <nav className="w-full flex flex-col items-center mt-6">
          <Link to="/profile" className="text-zinc-200 font-medium w-full py-2 text-center hover:bg-zinc-700 rounded-lg transition duration-300">
            All Orders
          </Link>
          <Link to="/profile/add-book" className="text-zinc-200 font-medium w-full py-2 mt-2 text-center hover:bg-zinc-700 rounded-lg transition duration-300">
            Add book
          </Link>

        </nav>

      )}
      <button
        className="bg-zinc-900 w-5/6 text-white font-medium py-2 mt-6 rounded-lg hover:bg-zinc-700 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
