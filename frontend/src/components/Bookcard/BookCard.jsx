import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookCard({ data, favourite }) {
  const handleRemoveBook = async () => {
    if (!window.confirm("Are you sure you want to remove this book from favorites?")) return;
    
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: localStorage.getItem('id'),
          bookId: data._id
        },
      };
      console.log("Removing book with ID:", data._id);

      const response = await axios.delete("http://localhost:5000/api/v3/remove-favorite-book", headers);
      console.log("Book removed:", response.data);
    } catch (error) {
      console.error("An error occurred while removing the book:", error);
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col relative">
      <Link to={`/view-book-details/${data._id}`} className="block">
        <div className="bg-zinc-900 rounded flex items-center justify-center relative">
          <img src={data.url} alt={data.title} className="h-[25vh] object-cover rounded" />
        </div>
        <h2 className="mt-4 text-xl text-zinc-200 font-semibold">{data.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
      </Link>

      {favourite && (
        <button 
          onClick={handleRemoveBook} 
          className='bg-red-500 text-white text-xl px-4 py-2 rounded hover:bg-red-600 transition mt-2'>
          Remove from Favorites
        </button>
      )}
    </div>
  );
}

export default BookCard;
