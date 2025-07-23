import React from 'react';
import { Link } from 'react-router-dom'
import img from '../../assets/hero.png';

function Hero() {
  return (
    <div className="h-auto lg:h-[75vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 bg-gradient-to-b from-zinc-900 to-zinc-800">
      
      {/* Left Content */}
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 leading-tight">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-lg lg:text-xl text-zinc-300 max-w-lg">
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
        </p>
        <div className="mt-8">
          <Link   to="/all-books" className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-8 py-3 rounded-full transition duration-300 hover:bg-yellow-100 hover:text-zinc-900 shadow-lg">
            Discover Books
          </Link>
        </div>
      </div>

      {/* Right Content (Image Section) */}
      <div className="w-full lg:w-3/6 flex items-center justify-center mt-10 lg:mt-0">
        <img className="h-auto lg:h-[75%] max-w-full object-contain" src={img} alt="Hero" />
      </div>

    </div>
  );
}

export default Hero;
