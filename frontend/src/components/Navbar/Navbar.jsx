import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Define navigation links based on authentication status
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  if (isLoggedIn) {
    if (role === 'user') links.push({ title: "Cart", link: "/cart" });
    links.push({
      title: role === 'admin' ? "Admin Profile" : "Profile",
      link: "/profile"
    });
  }
  

  return (
    <>
      {/* Navbar */}
      <div className="z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">book By Vishal</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((item, i) => (
            <Link key={i} to={item.link} className="hover:text-blue-500 transition-all duration-300">
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="px-3 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/sign-up"
                className="px-3 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="bg-zinc-800 h-screen w-full fixed top-0 left-0 z-40 flex flex-col items-center justify-center gap-6">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-white text-lg hover:text-blue-500 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
