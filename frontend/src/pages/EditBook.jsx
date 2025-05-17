import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBook() {
  const { bookid } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    desc: "",
    price: "",
    language: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/get-book-id/${bookid}`);
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookid]); // Fixed dependency array

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/v2/update-book`,
        { bookId: bookid, ...book }, // Corrected: Pass `bookId` in the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            id: localStorage.getItem("id"),
          },
        }
      );

      alert("Book updated successfully!");
      navigate(`/view-book-details/${bookid}`); // Fixed variable reference
    } catch (error) {
      alert("Error updating book: " + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-center p-6">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <textarea
            name="desc"
            value={book.desc}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="language"
            value={book.language}
            onChange={handleChange}
            placeholder="Language"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
