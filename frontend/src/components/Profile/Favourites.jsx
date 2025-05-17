import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../Bookcard/BookCard';

function Favourites() {
  const [books, setBooks] = useState([]); // Initialize state as an empty array

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (!token || !userId) {
          console.error('User ID or Token is missing!');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/v3/get-favorite-books', {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        });

        if (response.data && response.data.data) {
          setBooks(response.data.data); // Assuming response.data.data contains the books array
        }
      } catch (error) {
        console.error('Error fetching favorite books:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-4">Favourite Books</h2>
      <div className="py-4 grid grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((item) => (
            <BookCard key={item._id} data={item} favourite={true} />
          ))
        ) : (
          <div className="text-5xl font-semibold text-zinc-500 flex items-center justify-center text-center w-full h-[100%]">
            No favourite books yet!
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourites;
